![](https://img.shields.io/badge/Built%20with%20%E2%9D%A4%EF%B8%8F-at%20Technologiestiftung%20Berlin-blue)

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

# To start developing use
npm run dev
```

## Deployment
_Berliner Erfrischungskarte_ is deployed to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/dnsos"><img src="https://avatars.githubusercontent.com/u/15640196?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Dennis Ostendorf</b></sub></a><br /><a href="https://github.com/technologiestiftung/erfrischungskarte-frontend/commits?author=dnsos" title="Code">💻</a> <a href="https://github.com/technologiestiftung/erfrischungskarte-frontend/commits?author=dnsos" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Lisa-Stubert"><img src="https://avatars.githubusercontent.com/u/61182572?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Lisa-Stubert</b></sub></a><br /><a href="https://github.com/technologiestiftung/erfrischungskarte-frontend/commits?author=Lisa-Stubert" title="Code">💻</a> <a href="#data-Lisa-Stubert" title="Data">🔣</a></td>
    <td align="center"><a href="https://vogelino.com/"><img src="https://avatars.githubusercontent.com/u/2759340?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Lucas Vogel</b></sub></a><br /><a href="https://github.com/technologiestiftung/erfrischungskarte-frontend/commits?author=vogelino" title="Code">💻</a> <a href="https://github.com/technologiestiftung/erfrischungskarte-frontend/commits?author=vogelino" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/lucasoeth"><img src="https://avatars.githubusercontent.com/u/43838158?v=4?s=64" width="64px;" alt=""/><br /><sub><b>lucasoeth</b></sub></a><br /><a href="https://github.com/technologiestiftung/erfrischungskarte-frontend/commits?author=lucasoeth" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!


## Content Licencing

Texts and content available as [CC BY](https://creativecommons.org/licenses/by/3.0/de/). 

## Credits

<table>
  <tr>
    <td>
      <a href="https://odis-berlin.de">
        <br />
        <br />
        <img width="200" src="https://logos.citylab-berlin.org/logo-odis-berlin.svg" />
      </a>
    </td>
    <td>
      Together with: <a href="https://citylab-berlin.org/en/start/">
        <br />
        <br />
        <img width="200" src="https://logos.citylab-berlin.org/logo-citylab-berlin.svg" />
      </a>
    </td>
    <td>
      A project by: <a href="https://www.technologiestiftung-berlin.de/en/">
        <br />
        <br />
        <img width="150" src="https://logos.citylab-berlin.org/logo-technologiestiftung-berlin-en.svg" />
      </a>
    </td>
    <td>
      Supported by: <a href="https://www.berlin.de/sen/inneres/">
        <br />
        <br />
        <img width="100" src="https://logos.citylab-berlin.org/logo-berlin-seninnds-en.svg" />
      </a>
    </td>
  </tr>
</table>
