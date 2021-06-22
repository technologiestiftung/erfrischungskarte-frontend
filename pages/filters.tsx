import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { GetServerSideProps } from 'next'
import React, { FC } from 'react'
import { FilterChip } from '@components/FilterChip'
import { PoiLegendItem } from '@components/PoiLegendItem'
import { PoiCategory, POI_CATEGORIES } from '@modules/RefreshmentMap/content'
import { useHasMobileSize } from '@lib/hooks/useHasMobileSize'
import classNames from 'classnames'

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

  return (
    <div className="grid grid-rows-2 grid-cols-1">
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
          hasMobileSize ? 'row-start-1' : 'row-start-2 mt-8'
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
        <p>Layer filter</p>
      </section>
    </div>
  )
}

export default Filters
