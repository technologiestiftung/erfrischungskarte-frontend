import { TemperatureIcon, WindIcon, ShadeIcon } from '@components/Icons'
import { LayerLegendBlockType } from '@components/LayerLegendBlock'
import { MapPointLayerType } from '@components/MapPointLayer'
import classNames from 'classnames'
import { MapExtrusionLayerType } from '../../components/MapExtrusionLayer'
import { MapFilledPolygonLayerType } from '../../components/MapFilledPolygonLayer'
import colors from '../../style/colors'
import { LayerLegendFigure } from '@components/LayerLegendFigure'
import Image from 'next/image'
import shadeImage from '../../../public/images/shade-legend.png'

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
    displayName: '11 Uhr',
    vectorTilesetKey: '11Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.a7c0dvqi',
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
    displayName: '17 Uhr',
    vectorTilesetKey: '17Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.77hu0gps',
  },
  '18': {
    displayName: '18 Uhr',
    vectorTilesetKey: '18Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.5w67kmqm',
  },
  '19': {
    displayName: '19 Uhr',
    vectorTilesetKey: '19Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.6291ii6g',
  },
  '20': {
    displayName: '20 Uhr',
    vectorTilesetKey: '20Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.9gfkjbpe',
  },
}

export type QuantileValues = 1 | 2 | 3 | 4 | 5

export const WIND_DATA: Pick<
  MapFilledPolygonLayerType,
  'id' | 'tileset' | 'fillColorMap'
> = {
  id: 'wind-data',
  tileset: {
    url: 'mapbox://technologiestiftung.1hrk87mv',
    layerName: 'wind_data-dgvmuc',
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
    url: 'mapbox://technologiestiftung.4e9mfohk',
    layerName: 'temperature_data-5k7yue',
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
  extrusionProperties: {
    base: 'min_height',
    height: 'height',
  },
  extrusionColor: '#ddd',
}

export type PoiCategory =
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

export const POI_CATEGORY_COLOR_MAP: Map<PoiCategory, string> = new Map([
  ['Badestelle', colors['poi-darkblue']],
  ['Strandbad', colors['poi-darkblue']],
  ['Freibad', colors['poi-darkblue']],
  ['Schwimmhalle', colors['poi-darkblue']],
  ['Wasserspielplatz', colors['poi-pink']],
  ['Trinkbrunnen', colors['poi-lightblue']],
  ['Brunnen', colors['poi-turquoise']],
  ['Gruenanlage', colors['poi-green']],
  ['Sitzbank', colors['poi-yellow']],
  ['Picknicktisch', colors['poi-red']],
])

type PoiCategoryId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export const POI_CATEGORY_ID_MAP: { [key in PoiCategory]: PoiCategoryId } = {
  Badestelle: 1,
  Strandbad: 2,
  Freibad: 3,
  Schwimmhalle: 4,
  Wasserspielplatz: 5,
  Trinkbrunnen: 6,
  Brunnen: 7,
  Gruenanlage: 8,
  Sitzbank: 9,
  Picknicktisch: 10,
}

export interface PoiDataType extends MapPointLayerType {
  id: string
  fillColorMap: Map<PoiCategory, string>
  activePropertyKeys: Partial<PoiCategory>[]
}

export const POI_DATA: PoiDataType = {
  id: 'poi-data',
  tileset: {
    url: 'mapbox://technologiestiftung.a9f6qix2',
    layerName: 'erfrischungskarte_poi-0mftmq',
  },
  fillColorProperty: 'category',
  fillColorMap: POI_CATEGORY_COLOR_MAP,
  activePropertyKeys: [
    'Badestelle',
    'Strandbad',
    'Freibad',
    'Schwimmhalle',
    'Wasserspielplatz',
    'Trinkbrunnen',
    'Brunnen',
    'Gruenanlage',
    'Sitzbank',
    'Picknicktisch',
  ],
}

export const ABOUT_INTRODUCTION_TEXT = (
  <>
    Der Klimawandel sorgt an vielen Orten f??r immer hei??eres, trockeneres
    Wetter. Auch Berlin erlebte in den vergangenen Jahren so viele Hitzetage wie
    nie zuvor. Wo, wann und wie ihr an solchen Tagen Erfrischung findet, seht
    ihr in dieser Karte. Sie zeigt euch f??r jede Stunde von 10 bis 20 Uhr, wo es
    tendenziell eher k??hl ist, wo f??r gew??hnlich eine frische Brise weht und wo
    gerade Schatten ist. Aufgrund der differenzierten Topographie kann es zum
    Teil erhebliche Unterschiede innerhalb des Stadtgebietes geben. Entdeckt
    au??erdem erfrischende Orte, wie Badestellen, Trinkbrunnen und Parks. Mit
    einem Klick ??ber die Teilenfunktion k??nnt ihr euren neuen Lieblingsplatz mit
    anderen teilen.
    <br />
    <br />
    Diese Anwendung basiert komplett auf offenen Daten. Open Data ist heute ein
    wichtiger Bestandteil im Verwaltungshandeln Berlins und schafft nicht nur
    Transparenz und Offenheit, sondern erm??glicht auch Analysen und Anwendungen
    wie diese, um den Alltag ein kleines bisschen angenehmer zu machen. Deshalb
    unterst??tzt und ber??t die{' '}
    <a
      target="blank"
      href="https://odis-berlin.de"
      className="text-gray-800 underline"
    >
      Open Data Infor&shy;mations&shy;stelle
    </a>{' '}
    Berliner Beh??rden bei der Bereit&shy;stellung von Open Data. Mehr offene
    Daten findet ihr im{' '}
    <a
      target="blank"
      href="https://daten.berlin.de"
      className="text-gray-800 underline"
    >
      Berliner Datenportal
    </a>
    .
  </>
)

export const ABOUT_CONTACT_TEXT = (
  <>
    <p>
      Auf GitHub findest du den{' '}
      <a
        href="https://github.com/technologiestiftung/erfrischungskarte-frontend/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-800 underline"
      >
        Quellcode des Projekts
      </a>
      .
    </p>
    <p className="mt-3">
      Eine Frage oder Feedback? Schreib uns an{' '}
      <a
        href="mailto:odis@technologiestiftung-berlin.de"
        target="_blank"
        rel="noreferrer"
        className="text-gray-800 underline"
      >
        odis@technologiestiftung-berlin.de
      </a>
    </p>
  </>
)

export const ABOUT_HOW_TO = (
  <>
    Mit dieser Karte ist es m??glich verschiedene Bereiche in Berlin im Hinblick
    auf ihre klimatische Funktion (neu) zu entdecken. Die Untersuchung des
    Stadtklimas ist ein wichtiger Aspekt in der Stadtentwicklung und -planung,
    um die Lebensqualit??t zu erh??hen und uns Stadtbewohner*innen weniger
    gesundheitlichem Risiko auszusetzen. Drei wichtige Faktoren, die ein lokales
    Klima ausmachen sind Beschattung, Lufttemperatur und Kaltluftentstehung.
    ??ber die Filterfunktion k??nnen die drei verschiedenen Faktoren einzeln
    angezeigt oder ausgeblendet werden. Die Karte zeigt anhand der Farbskalen
    wie sich Temperaturen und Menge an k??hlem Wind an einem typischen Sommertag
    an verschiedenen Orten der Stadt ??ber den Tagesverlauf unterscheiden.
    Prinzipiell zeigen dunklere Fl??chen an, dass dies ein erfrischender Ort f??r
    hei??e Sommertage mit einer positiven klimarelevanten Wirkung f??r die Stadt
    ist. Helle Fl??chen dagegen sprechen f??r sich stark aufheizende, wenig
    kaltluftproduzierende Fl??chen. Es handelt sich bei den zugrundeliegenden
    Werten um Verh??ltnisse und keine absoluten Zahlen. Die Daten beruhen auf
    Modellierungen f??r einen typischen Sommertag.
  </>
)

export const ABOUT_SHADOW_TEXT = (
  <>
    Ein wichtiger Faktor f??r das lokale Aufheizen und die Entstehung von
    Hitzeinseln an hei??en Tagen ist, wie lange ein Bereich der Sonne ausgesetzt
    oder beschattet ist. Klimatisch und f??r das Wohlbefinden von Vorteil sind
    Parks und Stra??enz??ge mit vielen B??umen, die Schatten spenden. Die Schatten
    wurden auf Grundlage der Topographie, n??mlich mittels eines{' '}
    <a
      target="blank"
      href="https://fbinter.stadt-berlin.de/fb/index.jsp?loginkey=zoomStart&mapId=k_dom@senstadt&bbox=387046,5818588,391547,5821400"
      className="text-gray-800 underline"
    >
      bildbasierten Digitalen Oberfl??chenmodells (bDOM)
    </a>{' '}
    von Berlin in Kombination mit Informationen zum Stand der Sonne zu jeder
    Uhrzeit f??r den 1.Juli berechnet. Daf??r wurde das r.sun-Tool des{' '}
    <a
      target="blank"
      href="https://grass.osgeo.org"
      className="text-gray-800 underline"
    >
      Geographic Resources Analysis Support System (GRASS)
    </a>{' '}
    , einem Open-Source-GIS, verwendet. Das bDOM enth??lt die H??hen der
    Erdoberfl??che mit allen nat??rlichen (wie z.B. Vegetation) und k??nstlichen
    Objekten (Bauwerken) f??r das gesamte Stadtgebiet und hat eine Aufl??sung von
    2 Metern. Die Schatten variieren im Laufe des Jahres, unsere Darstellung
    kann also je nach Zeitpunkt der Betrachtung von der Realit??t abweichen.
  </>
)

export const ABOUT_COOL_TEXT = (
  <>
    Die Klassifizierung der k??hlen Bereiche beruht auf Daten aus einem
    numerischen{' '}
    <a
      target="blank"
      href="https://www.berlin.de/umweltatlas/klima/klimaanalyse/2014/karten/"
      className="text-gray-800 underline"
    >
      Klimamodell
    </a>{' '}
    der Senatsverwaltung f??r Stadtentwicklung und Wohnen von 2014. Die
    Temperaturen wurden in 2 Metern H??he ??ber dem Boden bestimmt. Der Datensatz
    enth??lt Temperaturdaten f??r 4 Uhr, 14 Uhr und 22 Uhr, modelliert f??r einen
    typischen Sommertag, mit einer Aufl??sung von 10 Metern. Die Werte f??r
    weitere in unserer Anwendung dargestellte Stunden wurden zwischen diesen
    Beobachtungszeitpunkten interpoliert. Alle Datenwerte wurden dann in
    Quintile unterteilt und anschlie??end f??nf Klassen von k??hl bis weniger k??hl
    zugeordnet. Die Farbskalen geben also eine relative Einstufung der
    jeweiligen Stadtbereiche im Vergleich zu den anderen Beobachtungen wieder
    und keine absoluten Werte. Das Script und die verarbeiteten Daten sind{' '}
    <a
      target="blank"
      href="https://github.com/technologiestiftung/erfrischungskarte-daten/tree/main/Wind_Temperature"
      className="text-gray-800 underline"
    >
      hier
    </a>{' '}
    zu finden. <br></br>
    F??r die Temperaturverteilung ausschlaggebend sind u.a. die Boden- und
    Oberfl??cheneigenschaften. Waldfl??chen und gr????ere Gr??nanlagen wie der Gro??e
    Tiergarten weisen deutlich niedrigere Temperaturen auf, als baulich gepr??gte
    Gebiete, bei denen sich jedoch auch kleinr??umige Unterschiede erkennen
    lassen. Wasserfl??chen verhalten sich aufgrund ihrer spezifischen
    W??rmekapazit??t sehr homogen und wirken tags??ber klimatisch ausgleichend.
  </>
)
export const ABOUT_WINDY_TEXT = (
  <>
    Genau wie bei den k??hlen Bereichen beruht die Klassifizierung der
    sogenannten kaltluftproduzierenden Bereiche ebenfalls auf Daten aus einem{' '}
    <a
      target="blank"
      href="https://www.berlin.de/umweltatlas/klima/klimaanalyse/2014/karten/"
      className="text-gray-800 underline"
    >
      Klimamodell
    </a>{' '}
    der Senatsverwaltung f??r Stadtentwicklung und Wohnen von 2014. Der
    Kaltluftvolumenstrom wird definiert durch die Anzahl der Kubikmeter des
    kalten Windes, der pro Sekunde durch eine 10x10-Meter-Fl??che str??mt. Der
    Datensatz enth??lt Kaltluftvolumendaten f??r 4 Uhr und 22 Uhr, modelliert f??r
    einen typischen Sommertag, mit einer Aufl??sung von 10 Metern. Die Werte f??r
    weitere in unserer Anwendung dargestellte Stunden wurden zwischen diesen
    Beobachtungszeitpunkten interpoliert. Alle Datenwerte wurden dann in
    Quintile unterteilt und anschlie??end f??nf Klassen von viel Kaltluft bis
    weniger Kaltluft zugeordnet. Die Farbskalen geben also eine relative
    Einstufung der jeweilgen Stadtbereiche im Vergleich zu den anderen
    Beobachtungen wieder und keine absoluten Werte. Das Script und die
    verarbeiteten Daten sind{' '}
    <a
      target="blank"
      href="https://github.com/technologiestiftung/erfrischungskarte-daten/tree/main/Wind_Temperature"
      className="text-gray-800 underline"
    >
      hier
    </a>{' '}
    zu finden. <br></br>Es ist zu erkennen, dass die kaltluftproduzierenden
    Bereiche h??ufig Freifl??chen wie W??lder, Parkanlagen und Kleingartenfl??chen
    sind. Die dadurch entstehende gute Durchl??ftung kann die Hitzebelastung an
    Sommertagen reduzieren und wirkt sich auch auf die umliegenden Bereiche aus.
  </>
)

export const ABOUT_POINTS_TEXT = (
  <>
    Die Erfrischungsorte stammen aus verschiedenen Quellen: Die Koordinaten der{' '}
    <a
      target="blank"
      href="https://daten.berlin.de/datensaetze/gr??nanlagenbestand-berlin-einschl-der-??ffentlichen-spielpl??tze-gr??nanlagen-wfs"
      className="text-gray-800 underline"
    >
      Gr??nanlagen
    </a>{' '}
    wurden aus einem Datensatz zum ??ffentlichen Gr??nanlagenbestand erstellt.
    Dieser wird durch die bezirklichen Stra??en- und Gr??nfl??chen??mter gepflegt
    und im Berliner Geodatenportal zur Verf??gung gestellt. Die Standorte der{' '}
    <a
      target="blank"
      href="https://daten.berlin.de/datensaetze/atkis-sonstiges-bauwerk-oder-sonstige-einrichtung-punkte-wfs"
      className="text-gray-800 underline"
    >
      Zierbrunnen
    </a>{' '}
    finden sich ebenfalls im Geodatenportal, und sind Bestandteil des
    umfangreichen ATKIS-Datensatzes, der regelm????ig durch die bezirklichen
    Vermessungs??mter aktualisiert wird. Die Standorte der{' '}
    <a
      target="blank"
      href="https://daten.berlin.de/datensaetze/liste-der-badestellen"
      className="text-gray-800 underline"
    >
      Badestellen und Strandb??der
    </a>{' '}
    stammen vom Landesamt f??r Gesundheit und Soziales (LaGeSo). Die
    Informationen zu{' '}
    <a
      target="blank"
      href="https://www.berlin.de/special/sport-und-fitness/schwimmen/schwimmbad/a-z/"
      className="text-gray-800 underline"
    >
      Freib??dern und Schwimmhallen
    </a>{' '}
    stehen derzeit nur als Liste ??ber Berlin.de bereit. Sie wurden mittels
    Webscraping in einen Geodatensatz ??berf??hrt.{' '}
    <a
      target="blank"
      href="https://overpass-turbo.eu/"
      className="text-gray-800 underline"
    >
      B??nke, Picknicktische und Trinkbrunnen
    </a>{' '}
    wurden aus Open Street Map exportiert, einer frei zug??nglichen Sammlung von
    Geodaten. Den kompletten, f??r diese Anwendung aufbereiteten Datensatz findet
    ihr{' '}
    <a
      target="blank"
      href="https://github.com/technologiestiftung/erfrischungskarte-daten/blob/main/POI's/erfrischungskarte_poi.geojson"
      className="text-gray-800 underline"
    >
      hier
    </a>
    .
  </>
)

export const ABOUT_ACCORDION_ITEMS = [
  {
    id: 'howto',
    title: 'Wie liest man die Erfrischungskarte?',
    content: ABOUT_HOW_TO,
  },
  {
    id: 'shadows',
    title: 'Schatten',
    content: ABOUT_SHADOW_TEXT,
  },
  {
    id: 'cool-areas',
    title: 'K??hle Bereiche',
    content: ABOUT_COOL_TEXT,
  },
  {
    id: 'windy-areas',
    title: 'Kalt-windige Bereiche',
    content: ABOUT_WINDY_TEXT,
  },
  {
    id: 'places',
    title: 'Orte',
    content: ABOUT_POINTS_TEXT,
  },
]

export const SEARCH_SUGGESTIONS: SearchSuggestionItemType[] = [
  {
    type: 'Feature',
    properties: {
      name: 'Volkspark Prenzlauer Berg',
      conditions: 'k??hl, viel Schatten',
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
      conditions: 'vergleichsweise k??hl, Schattenplatz',
      category: 'Picknicktisch',
      bezirk: 'Treptow-K??penick',
      bezirksreg: 'Obersch??neweide',
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
      conditions: 'abends k??hl, frische Brise, Schattenplatz',
      category: 'Sitzbank',
      bezirk: 'Treptow-K??penick',
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
      conditions: 'k??hl, frische Brise, Schattenplatz',
      category: 'Sitzbank',
      bezirk: 'Mitte',
      bezirksreg: 'Tiergarten S??d',
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
      conditions: 'sonnig, abends k??hl',
      category: 'Gruenanlage',
      bezirk: 'Tempelhof-Sch??neberg',
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
      bezirksreg: 'Zehlendorf S??dwest',
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
      conditions: 'frische Brise, abends k??hl',
      category: 'Gruenanlage',
      bezirk: 'Tempelhof-Sch??neberg',
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
      conditions: 'vergleichsweise k??hl',
      category: 'Gruenanlage',
      bezirk: 'Neuk??lln',
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
      name: 'Kinderbad im B??rgerpark Marzahn',
      conditions: 'vormittags k??hl, Ort zum Planschen',
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
      conditions: 'k??hl, frische Brise',
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
      bezirksreg: 'Freidrichsfelde S??d',
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
      conditions: 'vergleichsweise k??hl, frische Brise',
      category: 'Brunnen',
      bezirk: 'Charlottenburg-Wilmersdorf',
      bezirksreg: 'Neue Kantstra??e',
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
      conditions: 'k??hl, frische Brise, Ort zum Planschen',
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

const maxShadeLabel = (
  <div className="flex items-center">
    <div className="w-2 h-2 bg-[#808080] rounded-full"></div>
    <span className="ml-1">Schattig</span>
  </div>
)

const minShadeLabel = (
  <div className="flex items-center">
    <div className="w-2 h-2 bg-[#F4F4F2] rounded-full"></div>
    <span className="ml-1">Sonnig</span>
  </div>
)

export const LAYER_LEGEND_ITEMS: {
  shade: Pick<
    LayerLegendBlockType,
    'title' | 'description' | 'icon' | 'legendFigure'
  >
  temperature: Pick<
    LayerLegendBlockType,
    'title' | 'description' | 'icon' | 'legendFigure'
  >
  wind: Pick<
    LayerLegendBlockType,
    'title' | 'description' | 'icon' | 'legendFigure'
  >
} = {
  shade: {
    title: 'Schatten',
    description: 'Zeigt, wohin die Schatten fallen.',
    icon: <ShadeIcon />,
    legendFigure: (
      <LayerLegendFigure maxLabel={maxShadeLabel} minLabel={minShadeLabel}>
        <Image
          src={shadeImage}
          alt="Beispiel von Schatten auf der Karte"
          width={400}
          height={30}
        />
      </LayerLegendFigure>
    ),
  },
  temperature: {
    title: 'K??hle Bereiche',
    description: 'Zeigt die vergleichsweise k??hlsten Bereiche in der Stadt.',
    icon: <TemperatureIcon />,
    legendFigure: (
      <LayerLegendFigure maxLabel="K??hl" minLabel="Weniger k??hl">
        <div className={classNames('h-[10px]', 'grid grid-cols-5')}>
          <div className={classNames('bg-layer-blue-400 opacity-50')}></div>
          <div className={classNames('bg-layer-blue-300 opacity-50')}></div>
          <div className={classNames('bg-layer-blue-200 opacity-50')}></div>
          <div className={classNames('bg-layer-blue-100 opacity-50')}></div>
          <div className={classNames('bg-white opacity-50')}></div>
        </div>
      </LayerLegendFigure>
    ),
  },
  wind: {
    title: 'Frischer Wind',
    description: 'Zeigt, wo vergleichsweise viel kalter Wind weht.',
    icon: <WindIcon />,
    legendFigure: (
      <LayerLegendFigure maxLabel="Windig" minLabel="Weniger windig">
        <div className={classNames('h-[10px]', 'grid grid-cols-5')}>
          <div className={classNames('bg-layer-green-400 opacity-50')}></div>
          <div className={classNames('bg-layer-green-300 opacity-50')}></div>
          <div className={classNames('bg-layer-green-200 opacity-50')}></div>
          <div className={classNames('bg-layer-green-100 opacity-50')}></div>
          <div className={classNames('bg-white opacity-50')}></div>
        </div>
      </LayerLegendFigure>
    ),
  },
}

export const SHADE_SUPPORT_NOTE = (
  <p className="text-xs">
    Leider k??nnen die Schatten auf diesem Endger??t oder in diesem Browser nicht
    dargestellt werden. Bitte versuche ein anderes Endger??t oder einen anderen
    Browser, um die Karte zu ??ffnen.
  </p>
)
