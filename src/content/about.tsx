import { FC } from 'react'
import { CitylabLogo } from '@components/CitylabLogo'
import { OdisLogo } from '@components/OdisLogo'
import { SenWebLogo } from '@components/SenWebLogo'
import { TsbLogo } from '@components/TsbLogo'
import classNames from 'classnames'
import { Accordion } from '@components/Accordion'

const focusStyles =
  'focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:rounded-sm focus:ring-offset-gray-100'

/*
  This part is the general introduction text that will be rendered as the first section in the About sidebar.
*/
export const ABOUT_INTRODUCTION: FC = () => (
  <p className="text-gray-500 text-sm pb-6">
    <>
      Der Klimawandel sorgt an vielen Orten für immer heißeres, trockeneres
      Wetter. Auch Berlin erlebte in den vergangenen Jahren so viele Hitzetage
      wie nie zuvor. Wo, wann und wie ihr an solchen Tagen Erfrischung findet,
      seht ihr in dieser Karte. Sie zeigt euch für jede Stunde von 10 bis 20
      Uhr, wo es tendenziell eher kühl ist, wo für gewöhnlich eine frische Brise
      weht und wo gerade Schatten ist. Aufgrund der differenzierten Topographie
      kann es zum Teil erhebliche Unterschiede innerhalb des Stadtgebietes
      geben. Entdeckt außerdem erfrischende Orte, wie Badestellen, Trinkbrunnen
      und Parks. Mit einem Klick über die Teilenfunktion könnt ihr euren neuen
      Lieblingsplatz mit anderen teilen.
      <br />
      <br />
      Diese Anwendung basiert komplett auf offenen Daten. Open Data ist heute
      ein wichtiger Bestandteil im Verwaltungshandeln Berlins und schafft nicht
      nur Transparenz und Offenheit, sondern ermöglicht auch Analysen und
      Anwendungen wie diese, um den Alltag ein kleines bisschen angenehmer zu
      machen. Deshalb unterstützt und berät die{' '}
      <a
        target="blank"
        href="https://odis-berlin.de"
        className="text-gray-800 underline"
      >
        Open Data Infor&shy;mations&shy;stelle
      </a>{' '}
      Berliner Behörden bei der Bereit&shy;stellung von Open Data. Mehr offene
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
  </p>
)

/*
  The following ABOUT_HOW_TO, ABOUT_SHADOW_TEXT, ABOUT_COOL_TEXT, ABOUT_WINDY_TEXT, ABOUT_POINTS_TEXT are the content for the ACCORDION_ITEMS further down. Change the texts here if necessary.
*/
const ABOUT_HOW_TO = (
  <>
    Mit dieser Karte ist es möglich verschiedene Bereiche in Berlin im Hinblick
    auf ihre klimatische Funktion (neu) zu entdecken. Die Untersuchung des
    Stadtklimas ist ein wichtiger Aspekt in der Stadtentwicklung und -planung,
    um die Lebensqualität zu erhöhen und uns Stadtbewohner*innen weniger
    gesundheitlichem Risiko auszusetzen. Drei wichtige Faktoren, die ein lokales
    Klima ausmachen sind Beschattung, Lufttemperatur und Kaltluftentstehung.
    Über die Filterfunktion können die drei verschiedenen Faktoren einzeln
    angezeigt oder ausgeblendet werden. Die Karte zeigt anhand der Farbskalen
    wie sich Temperaturen und Menge an kühlem Wind an einem typischen Sommertag
    an verschiedenen Orten der Stadt über den Tagesverlauf unterscheiden.
    Prinzipiell zeigen dunklere Flächen an, dass dies ein erfrischender Ort für
    heiße Sommertage mit einer positiven klimarelevanten Wirkung für die Stadt
    ist. Helle Flächen dagegen sprechen für sich stark aufheizende, wenig
    kaltluftproduzierende Flächen. Es handelt sich bei den zugrundeliegenden
    Werten um Verhältnisse und keine absoluten Zahlen. Die Daten beruhen auf
    Modellierungen für einen typischen Sommertag.
  </>
)

const ABOUT_SHADOW_TEXT = (
  <>
    Ein wichtiger Faktor für das lokale Aufheizen und die Entstehung von
    Hitzeinseln an heißen Tagen ist, wie lange ein Bereich der Sonne ausgesetzt
    oder beschattet ist. Klimatisch und für das Wohlbefinden von Vorteil sind
    Parks und Straßenzüge mit vielen Bäumen, die Schatten spenden. Die Schatten
    wurden auf Grundlage der Topographie, nämlich mittels eines{' '}
    <a
      target="blank"
      href="https://fbinter.stadt-berlin.de/fb/index.jsp?loginkey=zoomStart&mapId=k_dom@senstadt&bbox=387046,5818588,391547,5821400"
      className="text-gray-800 underline"
    >
      bildbasierten Digitalen Oberflächenmodells (bDOM)
    </a>{' '}
    von Berlin in Kombination mit Informationen zum Stand der Sonne zu jeder
    Uhrzeit für den 1.Juli berechnet. Dafür wurde das r.sun-Tool des{' '}
    <a
      target="blank"
      href="https://grass.osgeo.org"
      className="text-gray-800 underline"
    >
      Geographic Resources Analysis Support System (GRASS)
    </a>{' '}
    , einem Open-Source-GIS, verwendet. Das bDOM enthält die Höhen der
    Erdoberfläche mit allen natürlichen (wie z.B. Vegetation) und künstlichen
    Objekten (Bauwerken) für das gesamte Stadtgebiet und hat eine Auflösung von
    2 Metern. Die Schatten variieren im Laufe des Jahres, unsere Darstellung
    kann also je nach Zeitpunkt der Betrachtung von der Realität abweichen.
  </>
)

const ABOUT_COOL_TEXT = (
  <>
    Die Klassifizierung der kühlen Bereiche beruht auf Daten aus einem
    numerischen{' '}
    <a
      target="blank"
      href="https://www.berlin.de/umweltatlas/klima/klimaanalyse/2014/karten/"
      className="text-gray-800 underline"
    >
      Klimamodell
    </a>{' '}
    der Senatsverwaltung für Stadtentwicklung und Wohnen von 2014. Die
    Temperaturen wurden in 2 Metern Höhe über dem Boden bestimmt. Der Datensatz
    enthält Temperaturdaten für 4 Uhr, 14 Uhr und 22 Uhr, modelliert für einen
    typischen Sommertag, mit einer Auflösung von 10 Metern. Die Werte für
    weitere in unserer Anwendung dargestellte Stunden wurden zwischen diesen
    Beobachtungszeitpunkten interpoliert. Alle Datenwerte wurden dann in
    Quintile unterteilt und anschließend fünf Klassen von kühl bis weniger kühl
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
    Für die Temperaturverteilung ausschlaggebend sind u.a. die Boden- und
    Oberflächeneigenschaften. Waldflächen und größere Grünanlagen wie der Große
    Tiergarten weisen deutlich niedrigere Temperaturen auf, als baulich geprägte
    Gebiete, bei denen sich jedoch auch kleinräumige Unterschiede erkennen
    lassen. Wasserflächen verhalten sich aufgrund ihrer spezifischen
    Wärmekapazität sehr homogen und wirken tagsüber klimatisch ausgleichend.
  </>
)
const ABOUT_WINDY_TEXT = (
  <>
    Genau wie bei den kühlen Bereichen beruht die Klassifizierung der
    sogenannten kaltluftproduzierenden Bereiche ebenfalls auf Daten aus einem{' '}
    <a
      target="blank"
      href="https://www.berlin.de/umweltatlas/klima/klimaanalyse/2014/karten/"
      className="text-gray-800 underline"
    >
      Klimamodell
    </a>{' '}
    der Senatsverwaltung für Stadtentwicklung und Wohnen von 2014. Der
    Kaltluftvolumenstrom wird definiert durch die Anzahl der Kubikmeter des
    kalten Windes, der pro Sekunde durch eine 10x10-Meter-Fläche strömt. Der
    Datensatz enthält Kaltluftvolumendaten für 4 Uhr und 22 Uhr, modelliert für
    einen typischen Sommertag, mit einer Auflösung von 10 Metern. Die Werte für
    weitere in unserer Anwendung dargestellte Stunden wurden zwischen diesen
    Beobachtungszeitpunkten interpoliert. Alle Datenwerte wurden dann in
    Quintile unterteilt und anschließend fünf Klassen von viel Kaltluft bis
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
    Bereiche häufig Freiflächen wie Wälder, Parkanlagen und Kleingartenflächen
    sind. Die dadurch entstehende gute Durchlüftung kann die Hitzebelastung an
    Sommertagen reduzieren und wirkt sich auch auf die umliegenden Bereiche aus.
  </>
)

const ABOUT_POINTS_TEXT = (
  <>
    Die Erfrischungsorte stammen aus verschiedenen Quellen: Die Koordinaten der{' '}
    <a
      target="blank"
      href="https://daten.berlin.de/datensaetze/grünanlagenbestand-berlin-einschl-der-öffentlichen-spielplätze-grünanlagen-wfs"
      className="text-gray-800 underline"
    >
      Grünanlagen
    </a>{' '}
    wurden aus einem Datensatz zum öffentlichen Grünanlagenbestand erstellt.
    Dieser wird durch die bezirklichen Straßen- und Grünflächenämter gepflegt
    und im Berliner Geodatenportal zur Verfügung gestellt. Die Standorte der{' '}
    <a
      target="blank"
      href="https://daten.berlin.de/datensaetze/atkis-sonstiges-bauwerk-oder-sonstige-einrichtung-punkte-wfs"
      className="text-gray-800 underline"
    >
      Zierbrunnen
    </a>{' '}
    finden sich ebenfalls im Geodatenportal, und sind Bestandteil des
    umfangreichen ATKIS-Datensatzes, der regelmäßig durch die bezirklichen
    Vermessungsämter aktualisiert wird. Die Standorte der{' '}
    <a
      target="blank"
      href="https://daten.berlin.de/datensaetze/liste-der-badestellen"
      className="text-gray-800 underline"
    >
      Badestellen und Strandbäder
    </a>{' '}
    stammen vom Landesamt für Gesundheit und Soziales (LaGeSo). Die
    Informationen zu{' '}
    <a
      target="blank"
      href="https://www.berlin.de/special/sport-und-fitness/schwimmen/schwimmbad/a-z/"
      className="text-gray-800 underline"
    >
      Freibädern und Schwimmhallen
    </a>{' '}
    stehen derzeit nur als Liste über Berlin.de bereit. Sie wurden mittels
    Webscraping in einen Geodatensatz überführt.{' '}
    <a
      target="blank"
      href="https://overpass-turbo.eu/"
      className="text-gray-800 underline"
    >
      Bänke, Picknicktische und Trinkbrunnen
    </a>{' '}
    wurden aus Open Street Map exportiert, einer frei zugänglichen Sammlung von
    Geodaten. Den kompletten, für diese Anwendung aufbereiteten Datensatz findet
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

/*
  Remove items here if necessary. For example, if your not able to provide shade layers, simply remove the object here. Remember to remove other related sections, e.g. in the filter sidebar.
*/
export const ACCORDION_ITEMS = [
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
    title: 'Kühle Bereiche',
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

export const ABOUT_ACCORDION: FC = () => <Accordion items={ACCORDION_ITEMS} />

/*
  Update your contact details here.
*/
export const ABOUT_CONTACT: FC = () => (
  <p className="text-gray-500 text-sm pt-6">
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
  </p>
)

/*
  Insert your logo(s) here. If desired, change the order/layout.
*/
export const ABOUT_LOGOS: FC = () => (
  <section className="mt-16 flex flex-wrap">
    <div className="flex flex-col mr-6 mb-6">
      <span className="text-sm mb-2">Ein Projekt der</span>
      <TsbLogo className={focusStyles} />
    </div>
    <div className="flex flex-col mb-6">
      <span className="text-sm mb-2">Durchgeführt von der</span>
      <a
        href="https://odis-berlin.de/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Data Informationsstelle Berlin"
        className={focusStyles}
      >
        <OdisLogo className={`w-40`} />
      </a>
    </div>
    <div className="flex flex-col mb-6">
      <span className="text-sm mb-2">In Zusammenarbeit mit dem</span>
      <a
        href="https://www.citylab-berlin.org"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="CityLAB Berlin"
        className={focusStyles}
      >
        <CitylabLogo className={`w-36`} />
      </a>
    </div>
    <div className="flex flex-col">
      <span className="text-sm mb-2">Gefördert von</span>
      <SenWebLogo className={focusStyles} />
    </div>
  </section>
)

/*
  This part is the footer. Insert things such as your imprint and data privacy statement here.
*/
export const ABOUT_FOOTER: FC = () => (
  <footer
    className={classNames(
      'mt-8 bg-gray-100 p-8 -ml-6 -mb-6 sm:-ml-8 sm:-mb-8',
      'flex flex-wrap'
    )}
    style={{
      width: 'var(--sidebarWidth, 320px)',
    }}
  >
    <span className="text-xs w-full mb-4">
      © 2021 Technologiestiftung Berlin
    </span>
    <a
      href="https://www.technologiestiftung-berlin.de/de/impressum/"
      className={`text-xs hover:underline ${focusStyles} mr-4`}
      target="_blank"
      rel="noreferrer"
    >
      Impressum
    </a>
    <a
      href="https://www.technologiestiftung-berlin.de/de/datenschutz/"
      className={`text-xs hover:underline ${focusStyles}`}
      target="_blank"
      rel="noreferrer"
    >
      Datenschutzerklärung
    </a>
  </footer>
)
