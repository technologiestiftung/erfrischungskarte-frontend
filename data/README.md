# 🌍 Berlin POI Data Scraping & Customization Guide

This guide explains how you can easily manage, customize, and adjust the data-scraping pipelines in your project using **`data/get_pois.py`**. 

The script is designed to consolidate all refreshing and cooling locations in Berlin (like drinking fountains, swimming baths, "cool rooms", public toilets, and refill stations) into a single, clean map file (`berlin_points.geojson`).

You do not need to understand any complex programming or technical details to customize the data—everything is managed through clean settings and configurations at the top of `data/get_pois.py`.

---

## 🚦 1. Quick Scraper Toggles
At the very top of `data/get_pois.py`, you will find four simple switches. You can turn entire scraping pipelines **on** (`True`) or **off** (`False`) with a single click:

```python
SCRAPE_OSM = True         # Set to True to fetch locations from OpenStreetMap
SCRAPE_WFS = True         # Set to True to fetch locations from Berlin's official Geoportal
SCRAPE_REFILL = True      # Set to True to fetch Refill Stations (from api.ofdb.io)
MERGE_LOCAL = True        # Set to True to merge existing data files from your machine
```

---

## 📁 2. Merging Your Own Data Files
If you have local GeoJSON or JSON files (for example, specific parks or user-submitted spots) that you want to bake directly into your final map output, you can list them in the `EXISTING_DATASETS` list:

```python
EXISTING_DATASETS: list[str] = [
    "data/data/user.geojson",
    "data/data/gruenanlagen.geojson"
]
```
Simply place your files under the project's folder and add their filenames to this list. The script will automatically load and merge them when run.

---

## 🥤 3. Customizing Refill Station Information
Refill stations are shops, cafes, or organizations where people can fill up water bottles for free. Sometimes the raw description returned by their API is messy or redundant.

You can customize the text shown for specific locations in the `ALT_TEXT_REFILL` dictionary:
```python
ALT_TEXT_REFILL: dict[str, str] = {
    "NaturFreunde Berlin e. V.": "Bürozeiten: montags bis freitags, je von 10.00 Uhr bis 16.00 Uhr",
    "Ormado Kaffeehaus": "",  # Leaves the description completely blank/empty
}
```
* If a station name is listed here, the script will show your custom text.
* If you set it to `""`, it will show nothing (blank description).
* If a station is not listed here, it will default to showing their raw description.

---

## 📍 4. Adding or Removing Data Sources (OSM / WFS)
Under `OSM_SOURCES` and `WFS_SOURCES`, you have lists of individual databases that the script queries. 

To **disable** a specific source (like public toilets or benches), simply add a hashtag `#` in front of its lines to comment them out. To **enable** a source, remove the `#` symbols.

---

## 💬 5. Beautiful Info Customizations (Templates)
When displaying properties (like opening hours, price, or addresses) on the map, you can define exactly how they should look using **`info_templates`**.

The script is extremely smart and allows you to build custom labels and sentences:

### A. Custom Sentences with Values
Use a `{}` placeholder to automatically inject the data value into a custom sentence:
```python
"info_templates": {
    "oeffnungszeiten": "Open at {}",         # Generates: "Open at Mo-Fr 08:00-18:00"
    "nutzungsentgelt": "Preis: {} €"         # Generates: "Preis: 0.50 €"
}
```

### B. Putting Multiple Columns in One Sentence (Grouping)
If you want to combine multiple database fields into a single, clean sentence (like combining a street address and its postcode), you can group them into a **tuple**:
```python
"info_fields": [
    ("adresse", "postleitzahl")
],
"info_templates": {
    ("adresse", "postleitzahl"): "In place {} {}"  # Generates: "In place Gartenstraße 5 10115"
}
```

### C. Automatically Hiding Empty Properties
If a property is missing, empty, or blank in the raw database:
* The script is smart enough to **never** show its label or prefix.
* For example, if a fountain does not have any restrictions listed, `"Einschraenkungen: "` will **not** appear on the map at all, keeping your popups perfectly clean!

### D. Advanced Text Replacements (For Power Users)
If you need to make specific text corrections on the fly (for example, stripping a redundant link out of the descriptions), you can write a tiny modification directly inside your template using a `lambda`:
```python
"info_templates": {
    "informationen": lambda value: value.replace(", Link: https://www.bwb.de/de/trinkbrunnen.php", ""),
}
```
This will automatically find and remove that exact text from any description before showing it!
