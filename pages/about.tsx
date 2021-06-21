import { Accordion } from '@components/Accordion'
import { OdisLogo } from '@components/OdisLogo'
import { SenWebLogo } from '@components/SenWebLogo'
import { TsbLogo } from '@components/TsbLogo'
import {
  ABOUT_ACCORDION_ITEMS,
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
    <section className="mt-16 flex gap-6 flex-wrap">
      <div className="flex flex-col gap-3">
        <span className="text-sm">Ein Projekt der</span>
        <TsbLogo className={focusStyles} />
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm">Durchgeführt von</span>
        <OdisLogo className={focusStyles} />
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm">Gefördert von</span>
        <SenWebLogo className={focusStyles} />
      </div>
    </section>
    <footer
      className={classNames(
        'mt-8 bg-gray-100 p-8 -ml-6 -mb-6 sm:-ml-8 sm:-mb-8',
        'flex flex-wrap gap-4'
      )}
      style={{
        width: 'var(--sidebarWidth, 320px)',
      }}
    >
      <span className="text-xs w-full">© 2021 Technologiestiftung Berlin</span>
      <a
        href="https://www.technologiestiftung-berlin.de/de/impressum/"
        className={`text-xs hover:underline ${focusStyles}`}
      >
        Impressum
      </a>
      <a
        href="https://www.technologiestiftung-berlin.de/de/datenschutz/"
        className={`text-xs hover:underline ${focusStyles}`}
      >
        Datenschutzerklärung
      </a>
    </footer>
  </div>
)

export default About
