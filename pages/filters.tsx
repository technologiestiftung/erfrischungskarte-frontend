import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { GetServerSideProps } from 'next'
import React, { FC } from 'react'
import { FilterChip } from '@components/FilterChip'
import { PoiLegendItem } from '@components/PoiLegendItem'
import {
  LAYER_LEGEND_ITEMS,
  PoiCategory,
  POI_CATEGORY_COLOR_MAP,
  POI_CATEGORY_ID_MAP,
  SHADE_SUPPORT_NOTE,
} from '@modules/RefreshmentMap/content'
import { useHasMobileSize } from '@lib/hooks/useHasMobileSize'
import { useHasWebPSupport } from '@lib/hooks/useHasWebPSupport'
import classNames from 'classnames'
import { LayerLegendBlock } from '@components/LayerLegendBlock'
import { Warning } from '@components/Warning'
import { useRouter } from 'next/router'

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    title: 'Filter',
    query,
  },
})

const poiCategoryColorArray: [PoiCategory, string][] = Array.from(
  POI_CATEGORY_COLOR_MAP
)

const defaultActivePoiIds = Object.values(POI_CATEGORY_ID_MAP)

export const Filters: FC<{
  query: ReturnType<typeof mapRawQueryToState>
}> = () => {
  const hasMobileSize = useHasMobileSize()
  const hasWebPSupport = useHasWebPSupport()
  const { query, replace: routerReplace } = useRouter()
  const mappedQuery = mapRawQueryToState(query)

  const {
    shade: shadeLegendContent,
    temperature: temperatureLegendContent,
    wind: windLegendContent,
  } = LAYER_LEGEND_ITEMS

  const windAndTemperatureFiltersAreActivated =
    (!Object.keys(mappedQuery).includes('showWind') &&
      !Object.keys(mappedQuery).includes('showTemperature')) ||
    (mappedQuery.showWind === true && mappedQuery.showTemperature === true)

  return (
    <div className="grid grid-cols-1">
      <section
        aria-label="Angezeigte Orte auswählen"
        className={classNames(
          'col-span-1',
          hasMobileSize ? 'row-start-2 mt-4' : 'row-start-1'
        )}
      >
        {!hasMobileSize && (
          <>
            <h2 className="text-lg font-bold">Orte</h2>
            <p className="text-gray-500">
              Wähle aus, welche Orte zum Verweilen du auf der Karte sehen
              möchtest.
            </p>
          </>
        )}
        <div
          className={classNames(
            'flex flex-wrap',
            hasMobileSize ? 'mt-0' : 'mt-4'
          )}
        >
          {poiCategoryColorArray.map(([category, color]) => {
            const poiId = POI_CATEGORY_ID_MAP[category]
            return (
              <div key={category} className="mt-2 mr-2">
                <FilterChip
                  ariaLabel={category}
                  isSelected={mappedQuery.places?.includes(poiId)}
                  handleClick={() => {
                    let newPlacesArray

                    const noPlacesInQuery = !mappedQuery.places

                    if (noPlacesInQuery) {
                      newPlacesArray = defaultActivePoiIds.filter(
                        (defaultPoiId) => defaultPoiId !== poiId
                      )
                    }

                    const clickedPlaceAlreadyInQuery =
                      mappedQuery.places && mappedQuery.places?.includes(poiId)

                    if (clickedPlaceAlreadyInQuery) {
                      newPlacesArray = mappedQuery.places?.filter(
                        (placeId) => placeId !== poiId
                      )
                    }

                    const clickedPlaceNotYetInQuery =
                      !clickedPlaceAlreadyInQuery && !noPlacesInQuery

                    if (clickedPlaceNotYetInQuery) {
                      newPlacesArray = mappedQuery.places?.concat(poiId)
                    }

                    const places = newPlacesArray || defaultActivePoiIds

                    void routerReplace(
                      {
                        query: {
                          ...mappedQuery,
                          places: places.length === 0 ? false : places,
                        },
                      },
                      undefined
                    )
                  }}
                >
                  <PoiLegendItem label={category} color={color} />
                </FilterChip>
              </div>
            )
          })}
        </div>
      </section>
      <section
        aria-label="Angezeigte Flächen auswählen"
        className={classNames(
          'col-span-1',
          hasMobileSize ? 'row-start-1' : 'row-start-2',
          hasMobileSize ? 'pb-6' : 'mt-14',
          hasMobileSize ? 'border-b border-gray-400 border-dotted' : 'border-0'
        )}
      >
        {!hasMobileSize && (
          <>
            <h2 className="text-lg font-bold">Flächen</h2>
            <p className="text-gray-500">
              Wähle aus, welche Art von erfrischenden Bereichen du sehen
              möchtest.
            </p>
          </>
        )}
        {shadeLegendContent && (
          <div className={classNames(hasMobileSize ? 'mt-4' : 'mt-6')}>
            <LayerLegendBlock
              title={shadeLegendContent.title}
              description={shadeLegendContent.description}
              icon={shadeLegendContent.icon}
              legendFigure={
                hasWebPSupport ? (
                  shadeLegendContent.legendFigure
                ) : (
                  <Warning>{SHADE_SUPPORT_NOTE}</Warning>
                )
              }
              layerIsActive={mappedQuery.showShadows !== false}
              layerIsDisabled={!hasWebPSupport}
              handleToggle={() => {
                void routerReplace(
                  {
                    query: {
                      ...mappedQuery,
                      showShadows: Object.keys(mappedQuery).includes(
                        'showShadows'
                      )
                        ? !mappedQuery.showShadows
                        : false,
                    },
                  },
                  undefined
                )
              }}
            />
          </div>
        )}
        {temperatureLegendContent && (
          <div className={classNames(hasMobileSize ? 'mt-4' : 'mt-6')}>
            <LayerLegendBlock
              title={temperatureLegendContent.title}
              description={temperatureLegendContent.description}
              icon={temperatureLegendContent.icon}
              legendFigure={temperatureLegendContent.legendFigure}
              layerIsActive={mappedQuery.showTemperature !== false}
              handleToggle={() => {
                void routerReplace(
                  {
                    query: {
                      ...mappedQuery,
                      showTemperature: Object.keys(mappedQuery).includes(
                        'showTemperature'
                      )
                        ? !mappedQuery.showTemperature
                        : false,
                    },
                  },
                  undefined
                )
              }}
            />
          </div>
        )}
        {windLegendContent && (
          <div className={classNames(hasMobileSize ? 'mt-4' : 'mt-6')}>
            <LayerLegendBlock
              title={windLegendContent.title}
              description={windLegendContent.description}
              icon={windLegendContent.icon}
              legendFigure={windLegendContent.legendFigure}
              layerIsActive={mappedQuery.showWind !== false}
              handleToggle={() => {
                void routerReplace(
                  {
                    query: {
                      ...mappedQuery,
                      showWind: Object.keys(mappedQuery).includes('showWind')
                        ? !mappedQuery.showWind
                        : false,
                    },
                  },
                  undefined
                )
              }}
            />
          </div>
        )}
        {windAndTemperatureFiltersAreActivated && (
          <p
            className={classNames(
              'text-xs',
              'mt-4',
              hasMobileSize ? 'ml-10' : null
            )}
          >
            <strong className="italic text-layer-turquoise-300">
              Aufgepasst:
            </strong>
            {` `}
            {`Gleichzeitig kühle und windige Flächen werden ${
              !hasMobileSize ? 'durch die Überlagerung von Blau und Grün' : ''
            } Türkis dargestellt.`}
          </p>
        )}
      </section>
    </div>
  )
}

export default Filters
