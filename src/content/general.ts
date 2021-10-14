/*
  If there is no data for a specific hour, it should first be excluded in AvailableHoursType and HOURS below, then in SHADE_TILESETS in ./shade.tsx and in WIND_HOUR_KEYS and TEMPERATURE_HOUR_KEYS in ./vectorLayers.ts. The HourSelector component respects this and doesn't render the hour if it is excluded here.

  Note that currently it is not possible to add additional hours due to space limitations in the HourSelector.
*/
export type AvailableHoursType =
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'

export type HourType =
  | {
      [key in AvailableHoursType]: string
    }

export const HOURS: HourType = {
  '10': '10 Uhr',
  '11': '11 Uhr',
  '12': '12 Uhr',
  '13': '13 Uhr',
  '14': '14 Uhr',
  '15': '15 Uhr',
  '16': '16 Uhr',
  '17': '17 Uhr',
  '18': '18 Uhr',
  '19': '19 Uhr',
  '20': '20 Uhr',
}

export type TilesetIdType = string
export type TilesetPropertyKeyType = string

/*
  Define the basic map configuration below.
*/
export const MAP_CONFIG = {
  minZoom: 11.5,
  maxZoom: 19,
  defaultZoom: 14,
  defaultLatitude: 52.520952,
  defaultLongitude: 13.400033,
}

/*
  If you wish to rename the project, insert the desired name here. This change will be propagated to most parts of the codebase. However, there is one place where you will have to manually update the name: src/components/AppTitle. This is because the project title is styled in a specific way there.
*/
export const PROJECT_TITLE = 'Berliner Erfrischungskarte'
