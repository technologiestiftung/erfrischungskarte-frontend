import { Accordion } from '@components/Accordion'
import { OdisLogo } from '@components/OdisLogo'
import { SenWebLogo } from '@components/SenWebLogo'
import { TsbLogo } from '@components/TsbLogo'
import {
  ABOUT_ACCORDION_ITEMS,
  ABOUT_INTRODUCTION_TEXT,
} from '@modules/RefreshmentMap/content'
import { GetServerSideProps } from 'next'
import React, { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    title: 'Über das Projekt',
    query,
  },
})

export const About: FC = () => (
  <div>
    <p className="text-gray-500 text-sm pb-6">{ABOUT_INTRODUCTION_TEXT}</p>
    <Accordion items={ABOUT_ACCORDION_ITEMS} />
    <footer className="mt-16 flex gap-x-2 gap-y-6 flex-wrap">
      <div className="flex flex-col flex-grow gap-3">
        <span className="text-sm">Ein Projekt der</span>
        <TsbLogo />
      </div>
      <div className="flex flex-col flex-grow gap-3">
        <span className="text-sm">Durchgeführt von</span>
        <OdisLogo />
      </div>
      <div className="flex flex-col flex-grow gap-3">
        <span className="text-sm">Gefördert von</span>
        <SenWebLogo />
      </div>
    </footer>
  </div>
)

export default About
