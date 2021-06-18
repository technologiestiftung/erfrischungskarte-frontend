import { Accordion } from '@components/Accordion'
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
  </div>
)

export default About
