#!/usr/bin/env python3
"""
Configuration and entry point for building Berlin POIs GeoJSON.
This file contains the data sources and user toggles. The core processing logic
resides in `data/poi_builder.py`.

Requirements:
  Python 3.10+ only. No external packages are required.

Usage:
  python data/get_pois.py --out berlin_points.geojson
"""

from __future__ import annotations

import argparse
from pathlib import Path
from typing import Any

# Import the core logic engine from the other file
from poi_builder import run_pipeline, write_geojson

# ==============================================================================
# USER SCAPER & MERGER TOGGLES
# ==============================================================================
# Easily toggle on/off entire data pipelines here:
SCRAPE_OSM = True         # Set to True to scrape OpenStreetMap (OSM_SOURCES)
SCRAPE_WFS = True         # Set to True to scrape Berlin WFS (WFS_SOURCES)
SCRAPE_REFILL = True      # Set to True to scrape api.ofdb.io Refill Stations
MERGE_LOCAL = True        # Set to True to merge existing datasets (EXISTING_DATASETS)

# ==============================================================================
# LOCAL DATASETS TO MERGE
# ==============================================================================
# Add relative filenames under the workspace root or "data/" folder to merge them directly
# into the final output GeoJSON file.
EXISTING_DATASETS: list[str] = [
    # E.g. "data/data/user.geojson"
    "data/data/user.geojson",
    "data/data/gruenanlagen.geojson"
]

# ==============================================================================
# REFILL STATIONS ALT-TEXT CONFIGURATION
# ==============================================================================
ALT_TEXT_REFILL: dict[str, str] = {
    "NaturFreunde Berlin e. V.": "Bürozeiten: montags bis freitags, je von 10.00 Uhr bis 16.00 Uhr",
    "Ormado Kaffeehaus": "",
    "Atelier cocon coloré": "",
    "Original Unverpackt": "",
    "Supermarché - Fair Trade Streetwear": "",
    "Kollateralschaden": "",
    "Nachbarschaftstreff Lützowstraße 27": "Mo-Fr von 11-18 Uhr geöffnet",
    "Erica Naturkosmetik": "Öffnungszeiten\nMo-Fr  11-18 Uhr\nSa 11-16 Uhr",
    "martas Gästehäuser Hauptbahnhof Berlin": "Es gibt die Möglichkeit seine Wasserflasche nachzufüllen, da wir einen Wasserspender haben.",
    "soulbottles": "",
    "Der Sache wegen": "Mo-Fr. 12:00-20:00 Sa. 10:00-20:00",
    "Caf' Dritter Raum": "Bio Café (vegan) mit Hofgarten. Öffnungszeiten: \nDi - Fr: 09:00h - 20:00h\nSa + So: 10:00h - 20:00h",
    "Nachbarschaftsladen Berlinickestraße, Mittelhof e. V.": "Unsere Refill-Station ist für alle Menschen da, wenn wir da sind.",
    "Morgenstern - Antiquariat und Café": "",
    "Fruitbox": "",
    "Kühn Keramik": "",
}

# ==============================================================================
# OPENSTREETMAP (OVERPASS) SOURCES
# ==============================================================================
# Comment or uncomment sources to enable/disable them individually
OSM_SOURCES: dict[str, dict[str, Any]] = {
    # "trinkbrunnen_osm": {
    #     "category": "Trinkbrunnen OSM",
    #     "default_name": "Trinkbrunnen",
    #     "name_fields": ["name"],
    #     "info_fields": [
    #         "description",
    #     ],
    #     "source": "osm",
    #     "query": """
    #         [out:json][timeout:60];
    #         area["wikidata"="Q64"]->.a;
    #         (
    #         nwr(area.a)["amenity"="drinking_water"];
    #         nwr(area.a)["amenity"="fountain"]["drinking_water"~"^(yes|true|drinkable)$",i];
    #         nwr(area.a)["amenity"="fountain"]["fountain"="drinking"];
    #         )->.drinks;
    #         .drinks out tags center;
    #     """.strip(),
    # },
    # "sitzbank": {
    #     "category": "Sitzbank",
    #     "default_name": "Sitzbank",
    #     "source": "osm",
    #     "query": """
    #         [out:json][timeout:120];
    #         area["wikidata"="Q64"]->.a;
    #         nwr(area.a)["amenity"="bench"]["indoor"!="yes"][access!~"^(no|private|customers|members|permit|destination|restricted)$",i][!"disused:amenity"][!"abandoned:amenity"][!"removed:amenity"][!"demolished:amenity"][!"construction:amenity"]["disused"!="yes"]["abandoned"!="yes"]["removed"!="yes"]["demolished"!="yes"]["destroyed"!="yes"]["condition"!~"^(broken|bad|damaged|ruined|dilapidated)$",i]["broken"!="yes"]["damaged"!="yes"]->.benches_ok;
    #         .benches_ok out tags center;
    #     """.strip(),
    # },
    # "wasserspielplatz": {
    #     "category": "Wasserspielplatz",
    #     "default_name": "Wasserspielplatz",
    #     "name_fields": ["name"],
    #     "info_fields": [
    #         "description"
    #     ],
    #     "source": "osm",
    #     "query": """
    #         [out:json][timeout:250];
    #         area["ISO3166-2"="DE-BE"][admin_level=4]->.searchArea;
    #         (
    #         nwr(area.searchArea)["playground"="splash_pad"];
    #         nwr(area.searchArea)["name"~"wasserspielplatz",i];
    #         nwr(area.searchArea)["description"~"wasserspielplatz",i];
    #         )->.splash;
    #         .splash out center;
    #     """.strip(),
    # },
    # "picknicktisch": {
    #     "category": "Picknicktisch",
    #     "default_name": "Picknicktisch",
    #     "source": "OSM",
    #     "query": """
    #         [out:json][timeout:120];
    #         area["wikidata"="Q64"]->.a;
    #         (
    #         nwr(area.a)["leisure"="picnic_table"]["indoor"!="yes"][access!~"^(no|private|customers|members|permit|destination|restricted)$",i][!"disused:leisure"][!"abandoned:leisure"][!"removed:leisure"][!"demolished:leisure"][!"construction:leisure"]["disused"!="yes"]["abandoned"!="yes"]["removed"!="yes"]["demolished"!="yes"]["destroyed"!="yes"]["condition"!~"^(broken|bad|damaged|ruined|dilapidated)$",i]["broken"!="yes"]["damaged"!="yes"];
    #         nwr(area.a)["tourism"="picnic_site"]["indoor"!="yes"][access!~"^(no|private|customers|members|permit|destination|restricted)$",i][!"disused:tourism"][!"abandoned:tourism"][!"removed:tourism"][!"demolished:tourism"][!"construction:tourism"]["disused"!="yes"]["abandoned"!="yes"]["removed"!="yes"]["demolished"!="yes"]["destroyed"!="yes"]["condition"!~"^(broken|bad|damaged|ruined|dilapidated)$",i]["broken"!="yes"]["damaged"!="yes"];
    #         )->.picnic_ok;
    #         .picnic_ok out tags center;
    #     """.strip(),
    # },
}

# ==============================================================================
# BERLIN WFS (GEOPORTAL) SOURCES
# ==============================================================================
# Comment or uncomment WFS sources to enable/disable them individually
WFS_SOURCES: list[dict[str, Any]] = [
    # {
    #     "source_id": "Badestelle",
    #     "url": "https://gdi.berlin.de/services/wfs/badegewaesser",
    #     "layer":  "badegewaesser:aa_badestellen",
    #     "category": "Badestelle",
    #     "source": "Berlin",
    #     "default_name": "",
    #     "name_fields": [
    #         "badegewaes"
    #     ],
    #     "info_fields": [
    #         "hinweis_zu_oeffnungszeiten"
    #     ],
    #     "source":"berlin"
    # },
    # # hinweis_zu_oeffnungszeiten
    # {
    #     "source_id": "Strandbad",
    #     "url": "https://gdi.berlin.de/services/wfs/schwimmbaeder_berlin",
    #     "layer":  "schwimmbaeder_berlin:schwimmbaeder",
    #     "category": "Strandbad",
    #     "source": "Berlin",
    #     "default_name": "",
    #     "name_fields": [
    #         "name_des_schwimmbads"
    #     ],
    #     "filters": [
    #         {"property": "badkategorie", "value": "Strandbad", "case_sensitive": False},
    #     ],
    # },
    # {
    #     "source_id": "Freibad",
    #     "url": "https://gdi.berlin.de/services/wfs/schwimmbaeder_berlin",
    #     "layer":  "schwimmbaeder_berlin:schwimmbaeder",
    #     "category": "Freibad",
    #     "source": "Berlin",
    #     "default_name": "",
    #     "name_fields": [
    #         "name_des_schwimmbads"
    #     ],
    #     "filters": [
    #         {"property": "badkategorie", "value": "Freibad", "case_sensitive": False},
    #     ],
    # },
    # {
    #     "source_id": "Schwimmhalle",
    #     "url": "https://gdi.berlin.de/services/wfs/schwimmbaeder_berlin",
    #     "layer":  "schwimmbaeder_berlin:schwimmbaeder",
    #     "category": "Schwimmhalle",
    #     "source": "Berlin",
    #     "default_name": "",
    #     "name_fields": [
    #         "name_des_schwimmbads"
    #     ],
    #     "filters": [
    #         {"property": "badkategorie", "value": "Hallenbad", "case_sensitive": False},
    #         {"property": "badkategorie", "value": "Hallenbad, Schul- und Vereinsbad", "case_sensitive": False},
    #         {"property": "badkategorie", "value": "Hallenbad, Freizeit- und Familienbad", "case_sensitive": False},
    #     ],
    # },
    # {
    #     "source_id": "Trinkbrunnen",
    #     "url": "https://gdi.berlin.de/services/wfs/trinkwasserbrunnen",
    #     "layer":  "trinkwasserbrunnen:trinkwasserbrunnen",
    #     "category": "Trinkbrunnen",
    #     "source": "Berlin",
    #     "default_name": "Trinkbrunnen",
    #     "info_templates": {
    #         "einschraenkungen": "Einschraenkungen: {}",
    #         "informationen": "{}",
    #     }
    # },
    # {
    #     "source_id": "Straßenbrunnen",
    #     "url": "https://gdi.berlin.de/services/wfs/atkis",
    #     "layer":  "atkis:a11_ax_sonstigesbauwerkodersonstigeeinrichtung_p",
    #     "category": "Straßenbrunnen",
    #     "source": "Berlin",
    #     "default_name": "Straßenbrunnen",
    #     "filters": [
    #         {"property": "bezbwf", "value": "Brunnen", "case_sensitive": True},
    #     ],
    # },
    # {
    #     "source_id": "Kühler Raum",
    #     "url": "https://gdi.berlin.de/services/wfs/kuehle_raeume",
    #     "layer":  "kuehle_raeume:kuehle_raeume",
    #     "category": "Öffentlicher \"Kühler Raum\"",
    #     "source": "Berlin",
    #     "default_name": "Öffentlicher \"Kühler Raum\"",
    #     "name_fields": ["kuehle_raeume"],
    #     "info_templates": {
    #         ("adresse", "postleitzahl"): "Adresse: {} {} ",
    #         "rollstuhlgerechter_zugang": "Rollstuhlgerecht: {}",
    #         "hinweis": "Hinweis: {}",
    #         "oeffnungszeiten": "Öffnungszeiten: {}"
    #     }
    # },
    {
        "source_id": "Toiletten",
        "url": "https://gdi.berlin.de/services/wfs/toiletten",
        "layer": "toiletten:toiletten",
        "category": "Toilette",
        "source": "Berlin",
        "default_name": "Öffentliche Toilette",
        "info_templates": {
            "barrierefrei": "Barrierefrei: {}",
            "nutzungsentgelt": "Preis: {} €"
        }
    }
]


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
        default="https://overpass-api.de/api/interpreter",
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

    # Run core build pipeline with configuration parameters
    merged = run_pipeline(
        scrape_osm=SCRAPE_OSM,
        scrape_wfs=SCRAPE_WFS,
        scrape_refill=SCRAPE_REFILL,
        merge_local=MERGE_LOCAL,
        osm_sources=OSM_SOURCES,
        wfs_sources=WFS_SOURCES,
        alt_text_refill=ALT_TEXT_REFILL,
        existing_datasets=EXISTING_DATASETS,
        args=args,
    )

    write_geojson(merged, args.out)
    print(f"Wrote {len(merged['features'])} features to {args.out}")


if __name__ == "__main__":
    main()
