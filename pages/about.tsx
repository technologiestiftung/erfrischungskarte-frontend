import {
  ABOUT_ACCORDION,
  ABOUT_CONTACT,
  ABOUT_FOOTER,
  ABOUT_INTRODUCTION,
  ABOUT_LOGOS,
} from '@content/about'
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
    <ABOUT_INTRODUCTION />
    <ABOUT_ACCORDION />
    <ABOUT_CONTACT />
    <ABOUT_LOGOS />
    <ABOUT_FOOTER />
  </div>
)

export default About
