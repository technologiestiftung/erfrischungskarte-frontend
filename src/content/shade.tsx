import { AvailableHoursType, TilesetIdType } from './general'

type ShadeTilesetsType =
  | {
      [key in AvailableHoursType]: TilesetIdType
    }

/*
  Below you find the raster tilesets for the shade data of each hour. Should you lack data for one of the hours you can remove it here (don't forget to update ShadeTilesetsType). Note that this doesn't stop the hour from being available in the frontend. To completely exclude a specific hour, remove it in ./general.ts. If you don't have shade data at all, you can set SHADE_TILESETS to null.
*/
/*
  Internal note: Hours are mapped. In Mapbox the tiles are labeled with solar time not local time, that is 66 minutes behind. For example the shadow layer '2 am' in Mapbox actually shows the shadows for 3 am.
*/
export const SHADE_TILESETS: ShadeTilesetsType | null = {
  '10': 'mapbox://technologiestiftung.6pkd1c22',
  '11': 'mapbox://technologiestiftung.a7c0dvqi',
  '12': 'mapbox://technologiestiftung.czmr5c6o',
  '13': 'mapbox://technologiestiftung.6i6vo02j',
  '14': 'mapbox://technologiestiftung.79eus56w',
  '15': 'mapbox://technologiestiftung.0gpw7ll3',
  '16': 'mapbox://technologiestiftung.b7kilqew',
  '17': 'mapbox://technologiestiftung.77hu0gps',
  '18': 'mapbox://technologiestiftung.5w67kmqm',
  '19': 'mapbox://technologiestiftung.6291ii6g',
  '20': 'mapbox://technologiestiftung.9gfkjbpe',
}
