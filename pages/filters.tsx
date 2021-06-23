import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { GetServerSideProps } from 'next'
import React, { FC } from 'react'
import { FilterChip } from '@components/FilterChip'
import { PoiLegendItem } from '@components/PoiLegendItem'
import {
  LAYER_LEGEND_ITEMS,
  PoiCategory,
  POI_CATEGORIES,
  SHADE_SUPPORT_NOTE,
} from '@modules/RefreshmentMap/content'
import { useHasMobileSize } from '@lib/hooks/useHasMobileSize'
import { useHasWebPSupport } from '@lib/hooks/useHasWebPSupport'
import classNames from 'classnames'
import { LayerLegendBlock } from '@components/LayerLegendBlock'
import { Warning } from '@components/Warning'

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    title: 'Filter',
    query,
  },
})

const poiCategoriesArray: [PoiCategory, string][] = Array.from(POI_CATEGORIES)

export const Filters: FC<{
  query: ReturnType<typeof mapRawQueryToState>
}> = () => {
  const hasMobileSize = useHasMobileSize()
  const hasWebPSupport = useHasWebPSupport()

  const {
    shade: shadeLegendContent,
    temperature: temperatureLegendContent,
    wind: windLegendContent,
  } = LAYER_LEGEND_ITEMS

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
          {poiCategoriesArray.map(([category, color]) => {
            return (
              <div key={category} className="mt-2 mr-2">
                <FilterChip ariaLabel={category}>
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
              handleToggle={() => console.log('clicked')}
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
              handleToggle={() => console.log('clicked')}
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
              handleToggle={() => console.log('clicked')}
            />
          </div>
        )}
      </section>
    </div>
  )
}

export default Filters
