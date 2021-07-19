import { Accordion } from '@components/Accordion'
import { CitylabLogo } from '@components/CitylabLogo'
import { OdisLogo } from '@components/OdisLogo'
import { SenWebLogo } from '@components/SenWebLogo'
import { TsbLogo } from '@components/TsbLogo'
import {
  ABOUT_ACCORDION_ITEMS,
  ABOUT_CONTACT_TEXT,
  ABOUT_INTRODUCTION_TEXT,
} from '@modules/RefreshmentMap/content'
import classNames from 'classnames'
import { GetServerSideProps } from 'next'
import React, { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    title: 'Über das Projekt',
    query,
  },
})

const focusStyles =
  'focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:rounded-sm focus:ring-offset-gray-100'
export const About: FC = () => (
  <div>
    <p className="text-gray-500 text-sm pb-6">{ABOUT_INTRODUCTION_TEXT}</p>
    <Accordion items={ABOUT_ACCORDION_ITEMS} />
    <p className="text-gray-500 text-sm pt-6">{ABOUT_CONTACT_TEXT}</p>
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
  </div>
)

export default About
