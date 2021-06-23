import { MapPointLayerType } from '@components/MapPointLayer'
import { MapExtrusionLayerType } from '../../components/MapExtrusionLayer'
import { MapFilledPolygonLayerType } from '../../components/MapFilledPolygonLayer'
import colors from '../../style/colors'

export type HourType =
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'

export type HourDataType = {
  [key in HourType]: {
    displayName: string
    vectorTilesetKey: string
    shadeTilesetId: string
  }
}

// Note: Hours are mapped. In mapbox the tiles are labeled with solar time not local time, that is 66 minutes behind. For example the shadow layer '2 am' in mapbox actually shows the shadows for 3 am.
export const HOURS: HourDataType = {
  '10': {
    displayName: '10 Uhr',
    vectorTilesetKey: '10Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.6pkd1c22',
  },
  '11': {
    // incomplete, needs to be replaced!
    displayName: '11 Uhr',
    vectorTilesetKey: '11Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.cgvhefjx',
  },
  '12': {
    displayName: '12 Uhr',
    vectorTilesetKey: '12Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.czmr5c6o',
  },
  '13': {
    displayName: '13 Uhr',
    vectorTilesetKey: '13Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.6i6vo02j',
  },
  '14': {
    displayName: '14 Uhr',
    vectorTilesetKey: '14Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.79eus56w',
  },
  '15': {
    displayName: '15 Uhr',
    vectorTilesetKey: '15Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.0gpw7ll3',
  },
  '16': {
    displayName: '16 Uhr',
    vectorTilesetKey: '16Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.b7kilqew',
  },
  '17': {
    //missing, this is just a placeholder!
    displayName: '17 Uhr',
    vectorTilesetKey: '17Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.atdnvldm',
  },
  '18': {
    //missing, this is just a placeholder!
    displayName: '18 Uhr',
    vectorTilesetKey: '18Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.4tg8dy6l',
  },
  '19': {
    //missing, this is just a placeholder!
    displayName: '19 Uhr',
    vectorTilesetKey: '19Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.atdnvldm',
  },
  '20': {
    displayName: '20 Uhr',
    vectorTilesetKey: '20Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.atdnvldm',
  },
  '21': {
    //missing, this is just a placeholder!
    displayName: '21 Uhr',
    vectorTilesetKey: '21Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.atdnvldm',
  },
}

export type QuantileValues = 1 | 2 | 3 | 4 | 5

export const WIND_DATA: Pick<
  MapFilledPolygonLayerType,
  'id' | 'tileset' | 'fillColorMap'
> = {
  id: 'wind-data',
  tileset: {
    url: 'mapbox://technologiestiftung.9s5puknr',
    layerName: 'wind_data-221dgh',
  },
  fillColorMap: new Map([
    // Note: the mapping here is different than the one for the temperature data.
    [5, colors['layer-green'][400]],
    [4, colors['layer-green'][300]],
    [3, colors['layer-green'][200]],
    [2, colors['layer-green'][100]],
    [1, 'rgba(255,255,255,0)'],
  ]),
}

export const TEMPERATURE_DATA: Pick<
  MapFilledPolygonLayerType,
  'id' | 'tileset' | 'fillColorMap'
> = {
  id: 'temperature-data',
  tileset: {
    url: 'mapbox://technologiestiftung.1ejpa7pd',
    layerName: 'temperature_data-11wkut',
  },
  fillColorMap: new Map([
    [1, colors['layer-blue'][400]],
    [2, colors['layer-blue'][300]],
    [3, colors['layer-blue'][200]],
    [4, colors['layer-blue'][100]],
    [5, 'rgba(255,255,255,0)'],
  ]),
}

export const EXTRUDED_BUILDINGS_DATA: MapExtrusionLayerType = {
  id: '3d-buildings',
  url: 'mapbox://mapbox.mapbox-streets-v8',
  source: 'composite',
  sourceLayer: 'building',
  minzoom: 15.5,
  extrusionProperties: {
    base: 'min_height',
    height: 'height',
  },
  extrusionColor: '#ddd',
}

type PoiCategory =
  | 'Sitzbank'
  | 'Picknicktisch'
  | 'Gruenanlage'
  | 'Trinkbrunnen'
  | 'Brunnen'
  | 'Wasserspielplatz'
  | 'Badestelle'
  | 'Strandbad'
  | 'Freibad'
  | 'Schwimmhalle'

export interface PoiDataType extends MapPointLayerType {
  fillColorMap: Map<PoiCategory, string>
  activePropertyKeys: Partial<PoiCategory>[]
}

export const POI_DATA: PoiDataType = {
  id: 'poi-data',
  tileset: {
    url: 'mapbox://technologiestiftung.a9f6qix2',
    layerName: 'erfrischungskarte_poi-0mftmq',
  },
  minzoom: 11.5,
  fillColorProperty: 'category',
  fillColorMap: new Map([
    ['Gruenanlage', colors['poi-green']],
    ['Badestelle', colors['poi-darkblue']],
    ['Strandbad', colors['poi-darkblue']],
    ['Badestelle', colors['poi-darkblue']],
    ['Freibad', colors['poi-darkblue']],
    ['Schwimmhalle', colors['poi-darkblue']],
    ['Wasserspielplatz', colors['poi-pink']],
    ['Brunnen', colors['poi-turquoise']],
    ['Trinkbrunnen', colors['poi-lightblue']],
    ['Sitzbank', colors['poi-yellow']],
    ['Picknicktisch', colors['poi-red']],
  ]),
  activePropertyKeys: [
    'Picknicktisch',
    'Gruenanlage',
    'Trinkbrunnen',
    'Brunnen',
    'Wasserspielplatz',
    'Badestelle',
    'Strandbad',
    'Freibad',
    'Schwimmhalle',
  ],
}

export const ABOUT_INTRODUCTION_TEXT = (
  <>
    Der Klimawandel sorgt an vielen Orten für immer heißeres, trockenes Wetter.
    Auch Berlin erlebte in den vergangenen Jahren so viele Hitzetage wie nie
    zuvor.<br></br>
    Wo, wann und wie ihr an solchen Tagen Erfrischung findet, seht ihr in dieser
    Karte, denn aufgrund der differenzierten Topographie kann es zum Teil
    erhebliche Unterschiede innerhalb des Stadtgebietes geben. Sie zeigt euch
    für jede Stunde von 10 bis 21 Uhr, wo es tendeziell eher kühl ist, wo für
    gewöhnlich eine frische Brise weht und wo gerade Schatten ist. Entdeckt
    außerdem erfrischende Orte, wie Badestellen, Trinkbrunnen und Parks. Mit
    einem Klick über die Teilenfunktion könnt ihr euren neuen Lieblingsplatz mit
    anderen teilen.<br></br>
    <br></br>
    Diese Anwendung basiert komplett auf offenen Daten, ein Großteil davon sind
    Verwaltungsdaten. Open Data ist heute ein wichtige Bestandteil im
    Verwaltungshandeln Berlins und schafft nicht nur Transparenz und Offenheit,
    sondern ermöglicht auch Analysen und Anwendungen wie diese, um den Alltag
    ein kleines bisschen angenehmer zu machen. Mehr offene Daten findet ihr im{' '}
    <a
      target="blank"
      href="https://daten.berlin.de"
      className="text-gray-800 underline"
    >
      Berliner Datenportal
    </a>{' '}
  </>
)

export const ABOUT_SHADOW_TEXT = (
  <>
    Die Schatten wurden mit dem r.sun-Tool des{' '}
    <a
      target="blank"
      href="https://grass.osgeo.org"
      className="text-gray-800 underline"
    >
      Geographic Resources Analysis Support System (GRASS)
    </a>{' '}
    geschätzt, einem Open-Source-GIS. Unsere Karte zeigt alle Gebiete ohne
    direkte Sonneneinstrahlung, berechnet für den 1. Juli. Die Schatten
    variieren im Laufe des Jahres, unsere Darstellung kann also je nach
    Zeitpunkt der Betrachtung von der Realität abweichen. Die Berechnungen
    wurden auf Grundlage der Topographie, nämlich des{' '}
    <a
      target="blank"
      href="https://fbinter.stadt-berlin.de/fb/index.jsp?loginkey=zoomStart&mapId=k_dom@senstadt&bbox=387046,5818588,391547,5821400"
      className="text-gray-800 underline"
    >
      bildbasierten Digitalen Oberflächenmodells (bDOM)
    </a>{' '}
    von Berlin erstellt. Dieser enthält die Höhen der Erdoberfläche mit allen
    natürlichen (z.B. Vegetation) und künstlichen Objekten (z.B. Bauwerken) für
    das gesamte Stadtgebiet und hat eine Auflösung von 2 Metern.
  </>
)

export const ABOUT_COOL_WINDY_TEXT = (
  <>
    Die Klassifizierung der kühlen und kaltluftproduzierenden Bereiche beruht
    auf dem{' '}
    <a
      target="blank"
      href="https://www.berlin.de/umweltatlas/klima/klimaanalyse/2014/zusammenfassung/"
      className="text-gray-800 underline"
    >
      Datensatz zum Klimamodell Berlin
    </a>
    . Die Temperaturen des originalen Datensatzes wurden in 2 Metern Höhe über
    dem Boden gemessen. Der Kaltluftvolumenstrom wurde in der Anzahl der
    Kubikmeter des kalten Windes gemessen, der pro Sekunde einer 10-Meter-Zelle
    zuströmt. Gebiete mit mehr Vegetation – wie Wälder und Parks – weisen
    durchschnittlich mehr Wind auf. Der Datensatz enthält Kaltluftvolumen- und
    Temperaturdaten für 4:00 Uhr, 14:00 Uhr (nur für Temperaturdaten) und 22:00
    Uhr. Die Werte für weitere in unserer Anwendung dargestellten Stunden wurden
    zwischen den Beobachtungszeitpunkten interpoliert. Alle Datenwerte wurden in
    Quantile unterteilt und dadurch neu klassifiziert: Die Werte sind also
    relative Einstufungen im Vergleich zu den anderen Beobachtungen (1-20%,
    21-40%, 41-60%, 61-80% oder 81-100%).
  </>
)

export const ABOUT_POINTS_TEXT = (
  <>
    Die Daten der Erfrischungsorte stammen aus einer Vielzahl verschiedener
    Quellen für offene Daten. Die Daten zu Grünanlagen und Brunnen werden über
    den FIS-Broker, dem Berliner Geodatenportal
    (https://www.stadtentwicklung.berlin.de/geoinformation/fis-broker/)
    heruntergeladen. Die Badestelle und Strandbäder stammen vom LaGeSo und
    können aus dem Berliner Datenportal heruntergeladen werden, der zentralen
    Plattform für offene Daten (https://www.govdata.de/). Bänke, Picknicktische
    und Trinkbrunnen wurden aus Open Street Map exportiert, einer frei
    zugänglichen Sammlung von Geodaten (https://www.openstreetmap.org/). Die
    Daten zu Freibädern und Schwimmhallen liegen nicht als maschinenlesbarer
    Datensatz vor. Sie wurden direkt von der Berlin.de-Website
    (https://www.berlin.de/special/sport-und-fitness/schwimmen/schwimmbad/a-z/)
    gescrapt.
    <ul className="bullet-list">
      <li> Test</li>
    </ul>
  </>
)

export const ABOUT_ACCORDION_ITEMS = [
  {
    id: 'shadows',
    title: 'Schatten',
    content: ABOUT_SHADOW_TEXT,
  },
  {
    id: 'cool-windy-areas',
    title: 'Kühle und kaltluftproduzierende Bereiche',
    content: ABOUT_COOL_WINDY_TEXT,
  },
  {
    id: 'places',
    title: 'Orte',
    content: 'this part is coming soon...',
  },
]
