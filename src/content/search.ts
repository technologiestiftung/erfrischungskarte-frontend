import { PoiCategory } from './pois'

/*
  Defines which places can show up in the search results
*/
export const GEOCODING_BBOX = {
  latitude: {
    from: 52.3281202651866,
    to: 52.681600197973,
  },
  longitude: {
    from: 13.0824446341071,
    to: 13.7682544186827,
  },
}

export interface SearchSuggestionItemType {
  type: string
  properties: {
    name: string
    conditions: string
    category: PoiCategory
    bezirk: string
    bezirksreg: string
  }
  geometry: {
    type: 'Point'
    coordinates: [latitude: number, longitude: number]
  }
}

/*
  GeoJSON-styled list of places that are shown by default in the search bar
*/
export const SEARCH_SUGGESTIONS: SearchSuggestionItemType[] = [
  {
    type: 'Feature',
    properties: {
      name: 'Volkspark Prenzlauer Berg',
      conditions: 'kühl, viel Schatten',
      category: 'Gruenanlage',
      bezirk: 'Pankow',
      bezirksreg: 'Prenzlauer Berg Ost',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.462956678190112, 52.535800958365236],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Wasserfall am Viktoriapark',
      conditions: 'frische Brise, Ort zum Planschen',
      category: 'Brunnen',
      bezirk: 'Friedrichshain-Kreuz',
      bezirksreg: 'Tempelhofer Vorstadt',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.381775748438727, 52.4883004788636],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Picknickplatz in der Wuhlheide',
      conditions: 'vergleichsweise kühl, Schattenplatz',
      category: 'Picknicktisch',
      bezirk: 'Treptow-Köpenick',
      bezirksreg: 'Oberschöneweide',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.543032625454064, 52.464473456034675],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Bank auf der Insel der Jugend',
      conditions: 'abends kühl, frische Brise, Schattenplatz',
      category: 'Sitzbank',
      bezirk: 'Treptow-Köpenick',
      bezirksreg: 'Alt-Treptow',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.48055717115424, 52.48742303929486],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Bank am Neuen See im Tiergarten',
      conditions: 'kühl, frische Brise, Schattenplatz',
      category: 'Sitzbank',
      bezirk: 'Mitte',
      bezirksreg: 'Tiergarten Süd',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.342557083117965, 52.510747963501423],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Tempelhofer Feld',
      conditions: 'sonnig, abends kühl',
      category: 'Gruenanlage',
      bezirk: 'Tempelhof-Schöneberg',
      bezirksreg: 'Tempelhof',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.401905451388535, 52.473382804163165],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Pfaueninsel',
      conditions: 'frische Brise, viel Schatten',
      category: 'Gruenanlage',
      bezirk: 'Steglitz-Zehlendorf',
      bezirksreg: 'Zehlendorf Südwest',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.128466445631712, 52.434577434433052],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Freizeitpark Marienfelde',
      conditions: 'frische Brise, abends kühl',
      category: 'Gruenanlage',
      bezirk: 'Tempelhof-Schöneberg',
      bezirksreg: 'Mariendorf',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.368104919794263, 52.401917820204453],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Britzer Garten',
      conditions: 'vergleichsweise kühl',
      category: 'Gruenanlage',
      bezirk: 'Neukölln',
      bezirksreg: 'Britz',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.420545479131675, 52.43107805049096],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Kinderbad im Bürgerpark Marzahn',
      conditions: 'vormittags kühl, Ort zum Planschen',
      category: 'Freibad',
      bezirk: 'Marzahn-Hellersdorf',
      bezirksreg: 'Marzahn Mitte',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.562293000384942, 52.55217541391356],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Badestelle am Tegler See',
      conditions: 'kühl, frische Brise',
      category: 'Badestelle',
      bezirk: 'Reinickendorf',
      bezirksreg: 'Tegler Forst',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.25521056824976, 52.58564476407809],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Wasserspielplatz im Mellenseepark',
      conditions: 'Ort zum Planschen',
      category: 'Wasserspielplatz',
      bezirk: 'Lichtenberg',
      bezirksreg: 'Freidrichsfelde Süd',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.510822751366355, 52.494042504944467],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Kaskade am Lietzensee',
      conditions: 'vergleichsweise kühl, frische Brise',
      category: 'Brunnen',
      bezirk: 'Charlottenburg-Wilmersdorf',
      bezirksreg: 'Neue Kantstraße',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.289194301350708, 52.503192234053408],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Badestelle an der Unterhavel',
      conditions: 'kühl, frische Brise, Ort zum Planschen',
      category: 'Badestelle',
      bezirk: 'Spandau',
      bezirksreg: 'Gatow/Kladow',
    },
    geometry: {
      type: 'Point',
      coordinates: [13.17983109345109, 52.465733635320788],
    },
  },
]
