"use strict";

// this sripts get the refill sations from api.ofdb.io API and parses the data so it can be added to the POI data.
// Descriptions from the API that are not relevant for refilling water are removed.
// If the descrition only says "Refill Station", the description is replaced by an emty string

const fs = require("fs");
const altText = {
  "NaturFreunde Berlin e. V.":
    "Bürozeiten: montags bis freitags, je von 10.00 Uhr bis 16.00 Uhr",
  "Ormado Kaffeehaus": "",
  "Atelier cocon coloré": "",
  "Original Unverpackt": "",
  "Supermarché - Fair Trade Streetwear": "",
  Kollateralschaden: "",
  "Nachbarschaftstreff Lützowstraße 27": "Mo-Fr von 11-18 Uhr geöffnet",
  "Erica Naturkosmetik": "Öffnungszeiten\nMo-Fr  11-18 Uhr\nSa 11-16 Uhr",
  "martas Gästehäuser Hauptbahnhof Berlin":
    "Es gibt die Möglichkeit seine Wasserflasche nachzufüllen, da wir einen Wasserspender haben.",
  soulbottles: "",
  "Der Sache wegen": "Mo-Fr. 12:00-20:00 Sa. 10:00-20:00",
  "Caf' Dritter Raum":
    "Bio Café (vegan) mit Hofgarten. Öffnungszeiten: \nDi - Fr: 09:00h - 20:00h\nSa + So: 10:00h - 20:00h",
  "Nachbarschaftsladen Berlinickestraße, Mittelhof e. V.":
    "Unsere Refill-Station ist für alle Menschen da, wenn wir da sind.",
  "Morgenstern - Antiquariat und Café": "",
  Fruitbox: "",
  "Kühn Keramik": "",
};

const getData = async () => {
  const url =
    "https://api.ofdb.io/v0/search?bbox=52.33826%2C13.08835%2C52.67550%2C13.76116&text=refill-station";
  const response = await fetch(url);
  return await response.json();
};

const toGeoJSON = (data) => {
  const geoJSONs = [];
  data.visible.forEach((d) => {
    if (
      d.description === "Refil Station" ||
      d.description === "Refill Station"
    ) {
      d.description = "";
    }
    const feature = {
      type: "Feature",
      properties: {
        name: d.title,
        info: altText[d.title] === undefined ? d.description : altText[d.title],
        category: "Refill Station",
      },
      geometry: {
        type: "Point",
        coordinates: [d.lng, d.lat],
      },
    };
    geoJSONs.push(feature);
  });
  return geoJSONs;
};

getData().then((data) => {
  const geoJSONs = toGeoJSON(data);

  fs.writeFile(
    "./refill-stations.json",
    JSON.stringify(geoJSONs),
    {
      encoding: "utf8",
    },
    (err) => {}
  );
});
