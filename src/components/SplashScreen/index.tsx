import React, { FC } from 'react'
import { InternalLink } from '@components/InternalLink'
import { CrossIcon, OpenDataIcon, SunIcon } from '@components/Icons'

export const SplashScreen: FC = () => {
  return (
    <div className="fixed grid z-10 inset-0 items-center">
      <div className="bg-white p-6 max-w-xs md:max-w-none filter drop-shadow-lg rounded-lg md:min-w-xl md:w-1/2 mx-auto">
        <InternalLink href="/map">
          <CrossIcon className="hidden md:block absolute right-8 top-8 cursor-pointer text-gray-700 hover:text-gray-500 transform active:scale-90" />
        </InternalLink>
        <div className="flex flex-row-reverse justify-between items-center md:flex-row md:justify-start">
          <SunIcon className="mr-4" />
          <div>
            <h1 className="font-bold text-2xl flex flex-col">
              <span>30°C und kein Schatten?</span>
              <span className="text-layer-turquoise-300">
                So findest du Erfrischung!
              </span>
            </h1>
          </div>
        </div>
        <p className="mt-4 md:mr-12 text-gray-500">
          Die Berliner Erfrischungskarte zeigt
          <b className="text-layer-blue-300"> kühle</b>,
          <b className="text-layer-green-300"> windige</b> und
          <b className="text-black"> schattige</b> Flächen in der Stadt, und
          führt zu Orten zum Erfrischen und Verweilen im Sommer.
        </p>
        <div className="mt-16 gap-2 text-center grid grid-cols-2 grid-rows-2 md:flex">
          <InternalLink
            href="/map"
            className="md:px-4 col-start-1 col-end-3 cursor-pointer p-1.5 rounded-lg border-2 bg-layer-turquoise-300 border-layer-turquoise-300 hover:bg-layer-turquoise-400 hover:border-layer-turquoise-400 text-white transition transition-colors"
          >
            Erkunden
          </InternalLink>
          <InternalLink
            href="/search"
            className='className="md:px-4 cursor-pointer bg-white p-1.5 rounded-lg border-2 border-layer-turquoise-300 text-layer-turquoise-300 hover:border-layer-turquoise-400 hover:text-layer-turquoise-400 transition transition-colors"'
          >
            Standortsuche
          </InternalLink>
          <InternalLink
            href="/about"
            className="md:px-4 cursor-pointer bg-white p-1.5 rounded-lg border-2 border-gray-400 text-gray-400 hover:border-gray-500 hover:text-gray-500 transition transition-colors"
          >
            Mehr Infos
          </InternalLink>
        </div>
        <div className="flex flex-col md:items-center justify-between md:flex-row mt-6">
          <p className="text-xs mb-2 md:mb-0 mr-2 text-gray-700">
            <i>
              Eine prototypische Datenvisualisierung der Open Data
              Informationsstelle Berlin
            </i>
          </p>
          <OpenDataIcon />
        </div>
      </div>
    </div>
  )
}
