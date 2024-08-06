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
              Wähle aus, welche Orte du auf der Karte sehen möchtest.
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
                    let activePlaces

                    const noPlacesInQuery = !mappedQuery.places

                    const placesValueIsZero =
                      mappedQuery.places && mappedQuery.places[0] === 0

                    const onlyOnePlaceInQuery =
                      mappedQuery.places && mappedQuery.places.length === 1

                    const clickedPlaceAlreadyInQuery =
                      mappedQuery.places && mappedQuery.places?.includes(poiId)

                    const clickedPlaceNotYetInQuery =
                      mappedQuery.places && !mappedQuery.places.includes(poiId)

                    if (noPlacesInQuery) {
                      activePlaces = defaultActivePoiIds.filter(
                        (defaultPoiId) => defaultPoiId !== poiId
                      )
                    }

                    if (clickedPlaceNotYetInQuery) {
                      if (placesValueIsZero) {
                        activePlaces = [poiId] // activates clicked place after all places were deactivated before
                      } else {
                        activePlaces = mappedQuery.places?.concat(poiId) // activates clicked place
                      }
                    }

                    if (clickedPlaceAlreadyInQuery) {
                      if (onlyOnePlaceInQuery && !placesValueIsZero) {
                        activePlaces = [0] // deactivates all places
                      } else {
                        activePlaces = mappedQuery.places?.filter(
                          (placeId) => placeId !== poiId // deactivates clicked place
                        )
                      }
                    }

                    void routerReplace(
                      {
                        query: {
                          ...mappedQuery,
                          places: activePlaces,
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
        <div className="mt-6">
          <button
            className="px-2 py-1 border rounded-md focus:rounded focus:ring-2 focus:ring-gray-800 focus:outline-none focus:ring-offset-2 focus:ring-offset-white border-gray-200 transition-opacity duration-75 ease-in-out mr-2"
            onClick={() => {
              void routerReplace(
                {
                  query: {
                    ...mappedQuery,
                    places: [0],
                  },
                },
                undefined
              )
            }}
          >
            <span className="ml-1 text-gray-700 text-sm">alle ausbleden</span>
          </button>
          <button
            className="px-2 py-1 border rounded-md focus:rounded focus:ring-2 focus:ring-gray-800 focus:outline-none focus:ring-offset-2 focus:ring-offset-white border-gray-200 transition-opacity duration-75 ease-in-out mr-2"
            onClick={() => {
              delete mappedQuery.places

              void routerReplace(
                {
                  query: {
                    ...mappedQuery,
                  },
                },
                undefined
              )
            }}
          >
            <span className="ml-1 text-gray-700 text-sm">alle anzeigen</span>
          </button>
        </div>
      </section>
      <section
        aria-label="Angezeigte Flächen auswählen"
        className={classNames(
          'col-span-1',
          hasMobileSize ? 'row-start-1' : 'row-start-2',
          hasMobileSize ? 'pb-6' : 'mt-12',
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
          <div className={classNames(hasMobileSize ? 'mt-1' : 'mt-6')}>
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
