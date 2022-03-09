# _Berliner Erfrischungskarte_
> The [_Berliner Erfrischungskarte_](https://erfrischungskarte.odis-berlin.de) (Berlin refreshment map) is an interactive map of Berlin that shows shadows, cold wind areas and temperature intensities across a typical summer day.

## Context
Climate change is causing increasingly hot, dry weather in many places. In recent years, Berlin has also experienced more hot days than ever before.
This map shows you where, when and how you can find refreshment on such days, because due to the differentiated topography there can be considerable differences within the city. For each hour from 10 a.m. to 9 p.m., it shows you where it tends to be cool, where a fresh breeze usually blows and where there is shade. Also discover refreshing places like swimming spots, drinking fountains and parks. With one click via the share function, you can share your new favorite place with others.

This application is completely based on open data, much of which is administrative data. Open data is now an important part of Berlin's administrative activities and not only creates transparency and openness, but also enables analysis and applications like this to make everyday life a little bit more pleasant. You can find more open data at the [Berlin Open Data Portal](https://daten.berlin.de/).

## Tech stack
This website is a NextJS app configured with:

- [Typescript](https://www.typescriptlang.org/)
- Linting with [ESLint](https://eslint.org/)
- Formatting with [Prettier](https://prettier.io/)
- Linting, typechecking and formatting on by default using [`husky`](https://github.com/typicode/husky) for commit hooks
- Testing with [Jest](https://jestjs.io/) and [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro)

## Data
This repository contains the **frontend** code of the _Berliner Erfrischungskarte_ app. The **data** and the data processing scripts are contained in another repository: [erfrischungskarte-daten](https://github.com/technologiestiftung/erfrischungskarte-daten). There you can also find further information about the original data sources.

## Install and contribute

### Requirements

#### [Node.js](https://nodejs.org)
A recent version of Node.js is required. See `.nvmrc` for the version we currently use.

#### [Mapbox](https://www.mapbox.com/)
You will need a [Mapbox](https://www.mapbox.com/) account to render the map locally. You will need to put your [Mapbox](https://www.mapbox.com/) access token into the `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` environment variable. Make also sure to add whatever URL the app is run on to the list of allowed URLs in your [Mapbox](https://www.mapbox.com/) configuration.

#### [Matomo](https://matomo.org/)
We use the Google Analytics alternative [Matomo](https://matomo.org/), which is more respectful of the users' privacy, in order to track the page-visits on the page.

You will need a [Matomo](https://matomo.org/) account if you wish to use page analytics as well and configure the environment variables `NEXT_PUBLIC_MATOMO_URL` and `NEXT_PUBLIC_MATOMO_SITE_ID` for this purpose.

### Installation

```bash
# Clone the repo
git clone git@github.com:technologiestiftung/erfrischungskarte-frontend.git

# Move into the repo
cd erfrischungskarte-frontend

# Install the npm dependencies
npm install

# Create your own .env file
cp .env.example .env

# Edit the .env file with your own values
vim .env # Use your favourite editor here
```

## Deployment
_Berliner Erfrischungskarte_ is deployed to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).
