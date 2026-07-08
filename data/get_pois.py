#!/usr/bin/env python3
"""
Build one cleaned point GeoJSON for Berlin from several public sources:

  - OpenStreetMap / Overpass API:
      * Trinkbrunnen
      * Sitzbank
      * Wasserspielplatz

  - Berlin WFS services:
      * ATKIS: ax_sonstigesbauwerkodersonstigeeinrichtung_p filtered by bezbwf="Brunnen"
      * Öffentliche Toiletten: https://gdi.berlin.de/services/wfs/toiletten

The final GeoJSON is intentionally normalized. Every feature has only:

    "properties": {
      "name": "...",
      "info": "...",
      "category": "..."
    }

Raw provider attributes are used only to derive name/info and are not copied to
output. This keeps the file stable for downstream apps.

Requirements:
  Python 3.10+ only. No external packages are required.

Example:
  python berlin_geojson_builder.py --out berlin_points.geojson
"""

from __future__ import annotations

import argparse
import json
import time
from pathlib import Path
from typing import Any, Iterable, Sequence

import urllib.error
import urllib.parse
import urllib.request

OVERPASS_URL = "https://overpass-api.de/api/interpreter"

OSM_SOURCES: dict[str, dict[str, Any]] = {
    # "trinkbrunnen": {
    #     "category": "trinkbrunnen",
    #     "default_name": "Trinkbrunnen",
    #     "selectors": [
    #         '["amenity"="drinking_water"]',
    #         '["amenity"="fountain"]["drinking_water"="yes"]',
    #         '["fountain"="drinking"]',
    #     ],
    #     "name_fields": ["name", "operator"],
    #     "info_fields": [
    #         "description",
    #         "operator",
    #         "opening_hours",
    #         "access",
    #         "bottle",
    #         "indoor",
    #         "fee",
    #     ],
    # },
    # "sitzbank": {
    #     "category": "sitzbank",
    #     "default_name": "Sitzbank",
    #     "selectors": [
    #         '["amenity"="bench"]',
    #     ],
    #     "name_fields": ["name"],
    #     "info_fields": [
    #         "backrest",
    #         "seats",
    #         "material",
    #         "colour",
    #         "direction",
    #         "operator",
    #         "covered",
    #     ],
    # },
    # "wasserspielplatz": {
    #     "category": "wasserspielplatz",
    #     "default_name": "Wasserspielplatz",
    #     "selectors": [
    #         '["playground"="water"]',
    #         '["playground"="splash_pad"]',
    #         '["fountain"="splash_pad"]',
    #         '["leisure"="playground"]["name"~"Wasserspielplatz",i]',
    #     ],
    #     "name_fields": ["name"],
    #     "info_fields": [
    #         "description",
    #         "playground",
    #         "opening_hours",
    #         "access",
    #         "operator",
    #         "fee",
    #         "website",
    #     ],
    # },
}

WFS_SOURCES: list[dict[str, Any]] = [
    {
        "source_id": "Badestelle",
        "url": "https://gdi.berlin.de/services/wfs/badegewaesser",
        "layer":  "badegewaesser:aa_badestellen",
        "category": "Badestelle",
        "default_name": "",
        "name_fields": [
            "badegewaes"
        ]
    },
    {
        "source_id": "Strandbad",
        "url": "https://gdi.berlin.de/services/wfs/schwimmbaeder_berlin",
        "layer":  "schwimmbaeder_berlin:schwimmbaeder",
        "category": "Strandbad",
        "default_name": "",
        "name_fields": [
            "name_des_schwimmbads"
        ],
        "filters": [
            {"property": "badkategorie", "value": "Strandbad", "case_sensitive": False},
        ],
    },
    {
        "source_id": "Freibad",
        "url": "https://gdi.berlin.de/services/wfs/schwimmbaeder_berlin",
        "layer":  "schwimmbaeder_berlin:schwimmbaeder",
        "category": "Freibad",
        "default_name": "",
        "name_fields": [
            "name_des_schwimmbads"
        ],
        "filters": [
            {"property": "badkategorie", "value": "Freibad", "case_sensitive": False},
        ],
    },
    {
        "source_id": "Schwimmhalle",
        "url": "https://gdi.berlin.de/services/wfs/schwimmbaeder_berlin",
        "layer":  "schwimmbaeder_berlin:schwimmbaeder",
        "category": "Schwimmhalle",
        "default_name": "",
        "name_fields": [
            "name_des_schwimmbads"
        ],
        "filters": [
            {"property": "badkategorie", "value": "Hallenbad", "case_sensitive": False},
            {"property": "badkategorie", "value": "Hallenbad, Schul- und Vereinsbad", "case_sensitive": False},
            {"property": "badkategorie", "value": "Hallenbad, Freizeit- und Familienbad", "case_sensitive": False},
        ],
    },
    {
        "source_id": "Trinkbrunnen",
        "url": "https://gdi.berlin.de/services/wfs/atkis",
        "layer":  "atkis:a11_ax_sonstigesbauwerkodersonstigeeinrichtung_p",
        "category": "Trinkbrunnen",
        "default_name": "Trinkbrunnen",
        "filters": [
            {"property": "bezbwf", "value": "Brunnen (Trinkwasserversorgung)", "case_sensitive": True},
        ],
    },
    {
        "source_id": "Straßenbrunnen",
        "url": "https://gdi.berlin.de/services/wfs/atkis",
        "layer":  "atkis:a11_ax_sonstigesbauwerkodersonstigeeinrichtung_p",
        "category": "Straßenbrunnen",
        "default_name": "Straßenbrunnen",
        "filters": [
            {"property": "bezbwf", "value": "Brunnen", "case_sensitive": True},
        ],
    },
    # {
    #     "source_id": "toiletten",
    #     "url": "https://gdi.berlin.de/services/wfs/toiletten",
    #     "layer": "toiletten:toiletten",
    #     "category": "toilette",
    #     "default_name": "Öffentliche Toilette",
    #     "version": "2.0.0",
    #     "srs_name": "EPSG:4326",
    #     "output_format": "application/json",
    #     "filters": [],
    #     "name_fields": [
    #         "name",
    #         "bezeichnung",
    #         "standort",
    #         "adresse",
    #         "strasse",
    #         "straße",
    #     ],
    #     "info_fields": [
    #         "adresse",
    #         "strasse",
    #         "straße",
    #         "hausnummer",
    #         "hausnr",
    #         "plz",
    #         "bezirk",
    #         "ortsteil",
    #         "typ",
    #         "art",
    #         "betreiber",
    #         "barrierefrei",
    #         "rollstuhlgerecht",
    #         "wheelchair",
    #         "wickeltisch",
    #         "gebuehr",
    #         "gebühr",
    #         "kosten",
    #         "opening_hours",
    #         "oeffnungszeiten",
    #         "öffnungszeiten",
    #         "bemerkung",
    #     ],
    # },
]

INFO_FALLBACK_MAX_ITEMS = 8


class HttpClient:
    """Small JSON HTTP client using only Python's standard library."""

    def __init__(self, headers: dict[str, str] | None = None) -> None:
        self.headers = headers or {}

    def request_json(
        self,
        method: str,
        url: str,
        *,
        timeout: int = 180,
        params: dict[str, Any] | None = None,
        data: dict[str, Any] | str | bytes | None = None,
    ) -> dict[str, Any]:
        full_url = add_query_params(url, params)
        body, headers = encode_request_body(data, self.headers)

        request = urllib.request.Request(
            full_url,
            data=body,
            headers=headers,
            method=method.upper(),
        )

        with urllib.request.urlopen(request, timeout=timeout) as response:
            raw = response.read()
            charset = response.headers.get_content_charset() or "utf-8"
            return json.loads(raw.decode(charset))


def add_query_params(url: str, params: dict[str, Any] | None) -> str:
    """Append URL query parameters."""
    if not params:
        return url

    separator = "&" if "?" in url else "?"
    return f"{url}{separator}{urllib.parse.urlencode(params)}"


def encode_request_body(
    data: dict[str, Any] | str | bytes | None,
    base_headers: dict[str, str],
) -> tuple[bytes | None, dict[str, str]]:
    """Encode request body data for urllib."""
    headers = dict(base_headers)

    if data is None:
        return None, headers

    if isinstance(data, bytes):
        return data, headers

    if isinstance(data, str):
        return data.encode("utf-8"), headers

    if isinstance(data, dict):
        headers.setdefault("Content-Type", "application/x-www-form-urlencoded; charset=utf-8")
        return urllib.parse.urlencode(data).encode("utf-8"), headers

    raise TypeError(f"Unsupported request body type: {type(data)!r}")


def request_json(
    client: HttpClient,
    method: str,
    url: str,
    *,
    retries: int = 3,
    backoff_seconds: float = 5.0,
    timeout: int = 180,
    **kwargs: Any,
) -> dict[str, Any]:
    """Request JSON with small retry handling for transient API failures."""
    last_error: Exception | None = None

    for attempt in range(1, retries + 1):
        try:
            return client.request_json(method, url, timeout=timeout, **kwargs)
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as exc:
            last_error = exc
            if attempt == retries:
                break
            time.sleep(backoff_seconds * attempt)

    raise RuntimeError(f"Could not fetch JSON from {url}: {last_error}")


def build_overpass_query(
    selectors: Iterable[str],
    *,
    area_name: str = "Berlin",
    admin_level: str = "4",
    overpass_timeout: int = 180,
) -> str:
    """Build an Overpass QL query for nodes/ways/relations in Berlin."""
    selectors = list(selectors)

    if not selectors:
        raise ValueError("At least one Overpass selector is required.")

    union_lines: list[str] = []

    for selector in selectors:
        for osm_type in ("node", "way", "relation"):
            union_lines.append(f"  {osm_type}{selector}(area.searchArea);")

    return f"""
[out:json][timeout:{overpass_timeout}];
area["name"="{area_name}"]["boundary"="administrative"]["admin_level"="{admin_level}"]->.searchArea;
(
{chr(10).join(union_lines)}
);
out body center qt;
""".strip()


def overpass_element_to_raw_feature(element: dict[str, Any]) -> dict[str, Any] | None:
    """Convert an Overpass node/way/relation to a raw GeoJSON point feature."""
    element_type = element.get("type")

    if element_type == "node" and "lon" in element and "lat" in element:
        lon = element["lon"]
        lat = element["lat"]
    elif "center" in element:
        lon = element["center"]["lon"]
        lat = element["center"]["lat"]
    else:
        return None

    return {
        "type": "Feature",
        "geometry": {"type": "Point", "coordinates": [lon, lat]},
        "properties": element.get("tags") or {},
    }


def query_overpass_source(
    client: HttpClient,
    source_config: dict[str, Any],
    *,
    overpass_url: str = OVERPASS_URL,
    area_name: str = "Berlin",
    admin_level: str = "4",
    overpass_timeout: int = 180,
) -> dict[str, Any]:
    """Query one OSM source from Overpass and return a cleaned FeatureCollection."""
    query = build_overpass_query(
        source_config["selectors"],
        area_name=area_name,
        admin_level=admin_level,
        overpass_timeout=overpass_timeout,
    )

    data = request_json(
        client,
        "POST",
        overpass_url,
        data={"data": query},
        timeout=overpass_timeout + 30,
    )

    features = []
    seen: set[tuple[str, int]] = set()

    for element in data.get("elements", []):
        key = (str(element.get("type")), int(element.get("id")))

        if key in seen:
            continue

        seen.add(key)

        raw_feature = overpass_element_to_raw_feature(element)

        if raw_feature:
            cleaned = clean_feature(
                raw_feature,
                category=source_config["category"],
                default_name=source_config["default_name"],
                name_fields=source_config.get("name_fields", []),
                info_fields=source_config.get("info_fields", []),
            )

            if cleaned:
                features.append(cleaned)

    return {"type": "FeatureCollection", "features": features}


def fetch_wfs_geojson(
    client: HttpClient,
    wfs_url: str,
    layer_name: str,
    *,
    version: str = "2.0.0",
    srs_name: str = "EPSG:4326",
    output_format: str = "application/json",
    timeout: int = 180,
) -> dict[str, Any]:
    """
    Load a WFS layer as GeoJSON.

    The function tries a few common GeoJSON outputFormat spellings because WFS
    servers are not perfectly consistent. The first successful JSON response wins.
    """
    type_param = "typenames" if version.startswith("2") else "typename"

    output_formats = unique_preserve_order(
        [
            output_format,
            "application/json",
            "json",
            "application/json; subtype=geojson",
        ]
    )

    last_error: Exception | None = None

    for fmt in output_formats:
        params = {
            "service": "WFS",
            "version": version,
            "request": "GetFeature",
            type_param: layer_name,
            "srsName": srs_name,
            "outputFormat": fmt,
        }

        try:
            return request_json(
                client,
                "GET",
                wfs_url,
                params=params,
                timeout=timeout,
            )
        except RuntimeError as exc:
            last_error = exc

    raise RuntimeError(
        f"Could not fetch WFS layer {layer_name!r} from {wfs_url}: {last_error}"
    )


def apply_property_filters(
    feature_collection: dict[str, Any],
    filters: Sequence[dict[str, Any]],
) -> dict[str, Any]:
    """
    Apply exact property filters to a FeatureCollection using OR logic.

    A feature is kept if it matches at least one of the filters in the list.
    If no filters are provided, all features are returned.
    """
    if not filters:
        return feature_collection

    def matches_filter(feature: dict[str, Any], filter_config: dict[str, Any]) -> bool:
        property_name = filter_config["property"]
        property_value = filter_config["value"]
        case_sensitive = filter_config.get("case_sensitive", True)

        feature_value = (feature.get("properties") or {}).get(property_name)
        if feature_value is None:
            return False

        if case_sensitive:
            return feature_value == property_value

        return str(feature_value).casefold() == str(property_value).casefold()

    filtered_features = [
        feature
        for feature in feature_collection.get("features", [])
        if any(matches_filter(feature, f_config) for f_config in filters)
    ]

    return {"type": "FeatureCollection", "features": filtered_features}


def query_wfs_source(
    client: HttpClient,
    source_config: dict[str, Any],
    *,
    timeout: int = 180,
) -> dict[str, Any]:
    """Query one WFS source, optionally filter it, and return a cleaned FeatureCollection."""
    raw = fetch_wfs_geojson(
        client,
        source_config["url"],
        source_config["layer"],
        version=source_config.get("version", "2.0.0"),
        srs_name=source_config.get("srs_name", "EPSG:4326"),
        output_format=source_config.get("output_format", "application/json"),
        timeout=timeout,
    )

    filtered = apply_property_filters(raw, source_config.get("filters", []))

    features: list[dict[str, Any]] = []

    for raw_feature in filtered.get("features", []):
        point_feature = ensure_point_feature(raw_feature)

        if not point_feature:
            continue

        cleaned = clean_feature(
            point_feature,
            category=source_config["category"],
            default_name=source_config["default_name"],
            name_fields=source_config.get("name_fields", []),
            info_fields=source_config.get("info_fields", []),
        )

        if cleaned:
            features.append(cleaned)

    return {"type": "FeatureCollection", "features": features}


def clean_feature(
    feature: dict[str, Any],
    *,
    category: str,
    default_name: str,
    name_fields: Sequence[str],
    info_fields: Sequence[str],
) -> dict[str, Any] | None:
    """
    Normalize a raw GeoJSON feature to the stable output schema.

    Output properties are exactly: name, info, category.
    """
    geometry = feature.get("geometry")

    if not geometry:
        return None

    point_feature = ensure_point_feature(feature)

    if not point_feature:
        return None

    raw_properties = feature.get("properties") or {}

    name = derive_name(
        raw_properties,
        name_fields=name_fields,
        default_name=default_name,
    )

    info = derive_info(
        raw_properties,
        info_fields=info_fields,
    )

    return {
        "type": "Feature",
        "geometry": point_feature["geometry"],
        "properties": {
            "name": name,
            "info": info,
            "category": category,
        },
    }


def derive_name(
    properties: dict[str, Any],
    *,
    name_fields: Sequence[str],
    default_name: str,
) -> str:
    """Pick a readable name from configured fields, falling back to a scripted default."""
    for field in name_fields:
        value = get_property_case_insensitive(properties, field)

        if is_useful_value(value):
            return str(value).strip()

    return default_name


def derive_info(properties: dict[str, Any], *, info_fields: Sequence[str]) -> str:
    """
    Build a compact info string from configured fields.

    If none of the configured fields exist or are useful, returns an empty string.
    """
    parts: list[str] = []

    for field in info_fields:
        actual_key, value = get_property_with_actual_key(properties, field)

        if is_useful_value(value):
            parts.append(f"{humanize_key(actual_key)}: {format_property_value(value)}")

    if parts:
        return "; ".join(unique_preserve_order(parts))

    return ""


def get_property_case_insensitive(properties: dict[str, Any], key: str) -> Any:
    """Get a property by key, ignoring case if needed."""
    _, value = get_property_with_actual_key(properties, key)
    return value


def get_property_with_actual_key(properties: dict[str, Any], key: str) -> tuple[str, Any]:
    """Return the actual property key and value for a requested key, case-insensitively."""
    if key in properties:
        return key, properties[key]

    wanted = key.casefold()

    for actual_key, value in properties.items():
        if str(actual_key).casefold() == wanted:
            return str(actual_key), value

    return key, None


def is_useful_value(value: Any) -> bool:
    """Return True for non-empty values worth showing."""
    if value is None:
        return False

    if isinstance(value, str):
        return bool(value.strip()) and value.strip().lower() not in {
            "null",
            "none",
            "nan",
        }

    if isinstance(value, (list, dict, tuple, set)):
        return bool(value)

    return True


def format_property_value(value: Any) -> str:
    """Format a property value for the compact info string."""
    if isinstance(value, bool):
        return "yes" if value else "no"

    if isinstance(value, (list, tuple, set)):
        return ", ".join(str(item) for item in value if is_useful_value(item))

    if isinstance(value, dict):
        return json.dumps(value, ensure_ascii=False, sort_keys=True)

    return str(value).strip()


def humanize_key(key: str) -> str:
    """Make provider field names slightly more readable."""
    return str(key).replace("_", " ").strip()


def ensure_point_feature(feature: dict[str, Any]) -> dict[str, Any] | None:
    """
    Return a point feature.

    If a provider returns lines/polygons, a simple centroid of all coordinates is
    used. For the configured sources this is mostly a safety net: they should be
    point layers already.
    """
    geometry = feature.get("geometry")

    if not geometry:
        return None

    point = geometry_to_point(geometry)

    if not point:
        return None

    return {
        "type": "Feature",
        "geometry": {"type": "Point", "coordinates": point},
        "properties": feature.get("properties") or {},
    }


def geometry_to_point(geometry: dict[str, Any]) -> list[float] | None:
    """Convert any simple GeoJSON geometry to one [lon, lat] point."""
    geom_type = geometry.get("type")
    coordinates = geometry.get("coordinates")

    if geom_type == "Point" and is_coordinate_pair(coordinates):
        return [float(coordinates[0]), float(coordinates[1])]

    flattened = list(iter_coordinate_pairs(coordinates))

    if not flattened:
        return None

    lon = sum(coord[0] for coord in flattened) / len(flattened)
    lat = sum(coord[1] for coord in flattened) / len(flattened)

    return [lon, lat]


def iter_coordinate_pairs(value: Any) -> Iterable[list[float]]:
    """Yield [lon, lat] coordinate pairs from nested GeoJSON coordinates."""
    if is_coordinate_pair(value):
        yield [float(value[0]), float(value[1])]
        return

    if isinstance(value, list):
        for item in value:
            yield from iter_coordinate_pairs(item)


def is_coordinate_pair(value: Any) -> bool:
    """Return True when value looks like a lon/lat coordinate pair."""
    return (
        isinstance(value, list)
        and len(value) >= 2
        and isinstance(value[0], (int, float))
        and isinstance(value[1], (int, float))
    )


def unique_preserve_order(values: Iterable[Any]) -> list[Any]:
    """Return unique values while keeping the first occurrence order."""
    result: list[Any] = []
    seen: set[str] = set()

    for value in values:
        if isinstance(value, (dict, list)):
            key = json.dumps(value, ensure_ascii=False, sort_keys=True)
        else:
            key = str(value)

        if key not in seen:
            seen.add(key)
            result.append(value)

    return result


def merge_feature_collections(collections: Iterable[dict[str, Any]]) -> dict[str, Any]:
    """Merge multiple GeoJSON FeatureCollections."""
    features: list[dict[str, Any]] = []

    for collection in collections:
        features.extend(collection.get("features", []))

    return {"type": "FeatureCollection", "features": features}


def write_geojson(feature_collection: dict[str, Any], output_path: str | Path) -> None:
    """Write pretty UTF-8 GeoJSON."""
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with output_path.open("w", encoding="utf-8") as file:
        json.dump(feature_collection, file, ensure_ascii=False, indent=2)
        file.write("\n")


def load_extra_wfs_sources(path: str | None) -> list[dict[str, Any]]:
    """Load additional WFS source configs from JSON."""
    if not path:
        return []

    config_path = Path(path)

    with config_path.open("r", encoding="utf-8") as file:
        data = json.load(file)

    if not isinstance(data, list):
        raise ValueError("Extra WFS config must be a JSON array of source objects.")

    required_fields = {"source_id", "url", "layer", "category", "default_name"}

    for index, item in enumerate(data):
        if not isinstance(item, dict):
            raise ValueError(f"Extra WFS config item {index} is not an object.")

        missing = required_fields - set(item)

        if missing:
            raise ValueError(
                f"Extra WFS config item {index} is missing fields: {sorted(missing)}"
            )

    return data


def build_berlin_geojson(args: argparse.Namespace) -> dict[str, Any]:
    client = HttpClient(
        headers={
            "User-Agent": args.user_agent,
        }
    )

    collections: list[dict[str, Any]] = []

    if not args.skip_overpass:
        for source_id, source_config in OSM_SOURCES.items():
            print(f"Querying Overpass: {source_id}")

            collection = query_overpass_source(
                client,
                source_config,
                overpass_url=args.overpass_url,
                area_name=args.area_name,
                admin_level=args.admin_level,
                overpass_timeout=args.overpass_timeout,
            )

            print(f"  {len(collection['features'])} cleaned features")
            collections.append(collection)
            time.sleep(args.pause_between_requests)

    if not args.skip_wfs:
        wfs_sources = [
            *WFS_SOURCES,
            *load_extra_wfs_sources(args.extra_wfs_config),
        ]

        for source_config in wfs_sources:
            source_id = source_config.get("source_id", source_config["layer"])

            print(f"Querying WFS: {source_id}")

            collection = query_wfs_source(
                client,
                source_config,
                timeout=args.wfs_timeout,
            )

            print(f"  {len(collection['features'])} cleaned features")
            collections.append(collection)
            time.sleep(args.pause_between_requests)

    return merge_feature_collections(collections)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Build one cleaned Berlin point GeoJSON from Overpass and Berlin WFS."
    )

    parser.add_argument(
        "--out",
        default="berlin_points.geojson",
        help="Output GeoJSON path.",
    )

    parser.add_argument(
        "--skip-overpass",
        action="store_true",
        help="Do not query Overpass.",
    )

    parser.add_argument(
        "--overpass-url",
        default=OVERPASS_URL,
    )

    parser.add_argument(
        "--area-name",
        default="Berlin",
    )

    parser.add_argument(
        "--admin-level",
        default="4",
        help="Berlin is usually admin_level=4 in OSM as a city-state.",
    )

    parser.add_argument(
        "--overpass-timeout",
        type=int,
        default=180,
    )

    parser.add_argument(
        "--pause-between-requests",
        type=float,
        default=2.0,
    )

    parser.add_argument(
        "--skip-wfs",
        action="store_true",
        help="Do not query WFS sources.",
    )

    parser.add_argument(
        "--wfs-timeout",
        type=int,
        default=180,
    )

    parser.add_argument(
        "--extra-wfs-config",
        default=None,
        help="Optional path to a JSON array with additional WFS source configs.",
    )

    parser.add_argument(
        "--user-agent",
        default="berlin-geojson-builder/1.0 (+https://github.com/your-org/your-repo)",
        help="HTTP User-Agent. Replace the default with your GitHub repo URL.",
    )

    return parser.parse_args()


def main() -> None:
    args = parse_args()
    merged = build_berlin_geojson(args)
    write_geojson(merged, args.out)
    print(f"Wrote {len(merged['features'])} features to {args.out}")


if __name__ == "__main__":
    main()