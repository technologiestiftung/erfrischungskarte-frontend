import React, { FC } from 'react'
import Link from 'next/link'

export const SplashScreen: FC = () => {
  return (
    <div className="flex flex-col justify-center h-full w-full">
      <div className="bg-white p-6 max-w-xs md:max-w-none filter drop-shadow-lg rounded-lg md:min-w-xl md:w-1/2 mx-auto">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hidden md:block absolute right-8 top-8 cursor-pointer text-gray-700 hover:text-gray-500 transform active:scale-90"
        >
          <path
            className="stroke-current"
            d="M1 1L13 13M1 13L13 1L1 13Z"
            stroke="#333333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex flex-row-reverse justify-between items-center md:flex-row md:justify-start">
          <svg
            width="67"
            height="67"
            viewBox="0 0 67 67"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-4"
          >
            <path
              d="M33.5 3.125V6.5V3.125ZM33.5 60.5V63.875V60.5ZM63.875 33.5H60.5H63.875ZM6.5 33.5H3.125H6.5ZM54.9785 54.9785L52.5924 52.5924L54.9785 54.9785ZM14.4076 14.4076L12.0215 12.0215L14.4076 14.4076ZM54.9785 12.0215L52.5924 14.4076L54.9785 12.0215ZM14.4076 52.5924L12.0215 54.9785L14.4076 52.5924ZM47 33.5C47 37.0804 45.5777 40.5142 43.0459 43.0459C40.5142 45.5777 37.0804 47 33.5 47C29.9196 47 26.4858 45.5777 23.9541 43.0459C21.4223 40.5142 20 37.0804 20 33.5C20 29.9196 21.4223 26.4858 23.9541 23.9541C26.4858 21.4223 29.9196 20 33.5 20C37.0804 20 40.5142 21.4223 43.0459 23.9541C45.5777 26.4858 47 29.9196 47 33.5V33.5Z"
              stroke="#333333"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
          <Link href="/">
            <a className="md:px-4 col-start-1 col-end-3 cursor-pointer p-1.5 rounded-lg border-2 bg-layer-turquoise-300 border-layer-turquoise-300 hover:bg-layer-turquoise-400 hover:border-layer-turquoise-400 text-white transition transition-colors">
              Erkunden
            </a>
          </Link>
          <Link href="/">
            <a className="md:px-4 cursor-pointer bg-white p-1.5 rounded-lg border-2 border-layer-turquoise-300 text-layer-turquoise-300 hover:border-layer-turquoise-400 hover:text-layer-turquoise-400 transition transition-colors">
              Standortsuche
            </a>
          </Link>
          <Link href="/">
            <a className="md:px-4 cursor-pointer bg-white p-1.5 rounded-lg border-2 border-gray-400 text-gray-400 hover:border-gray-500 hover:text-gray-500 transition transition-colors">
              Mehr Infos
            </a>
          </Link>
        </div>
        <div className="flex flex-col md:items-center justify-between md:flex-row mt-6">
          <p className="text-xs mb-2 md:mb-0 mr-2 text-gray-700">
            <i>
              Eine prototypische Datenvisualisierung der Open Data
              Informationsstelle Berlin
            </i>
          </p>
          <svg
            width="144"
            height="37"
            viewBox="0 0 144 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M51.8033 7.24477C51.8033 9.34344 51.0746 10.2462 49.2721 10.2462C47.5002 10.2462 46.7332 9.30487 46.7332 7.24477C46.7332 5.18467 47.4772 4.25879 49.2721 4.25879C51.0746 4.25879 51.8033 5.18467 51.8033 7.24477ZM50.4533 7.24477C50.4533 5.77878 50.1542 5.42386 49.2721 5.42386C48.3976 5.42386 48.0908 5.77878 48.0908 7.24477C48.0908 8.71076 48.4053 9.08111 49.2797 9.08111C50.1465 9.08111 50.4533 8.70304 50.4533 7.24477ZM57.678 6.33432C57.678 7.5534 57.0337 8.25553 55.4306 8.25553H54.6636V10.1382H53.3672V4.35138H55.4306C57.0261 4.35138 57.678 4.98407 57.678 6.33432ZM56.3434 6.3266C56.3434 5.63219 56.0979 5.43929 55.4306 5.43929H54.6636V7.21391H55.4306C56.0672 7.21391 56.3434 7.05188 56.3434 6.3266ZM60.4386 9.00395H63.0849L63.0542 10.1382H59.1422V4.35138H62.9391L62.9621 5.50102H60.4386V6.65066H62.5633V7.68457H60.4386V9.00395ZM69.2127 10.1382H68.3076L66.0755 6.98244L65.7303 6.46548L65.715 6.4732L65.7226 7.09817V10.1382H64.5721V4.35138H65.6766L67.7246 7.33736L68.0698 7.85431L68.0851 7.8466L68.0698 7.22934V4.35138H69.2127V10.1382ZM80.2411 7.22162C80.2411 9.31258 79.3744 10.1382 77.6715 10.1382H75.5008V4.35138H77.6562C79.4817 4.35138 80.2411 5.22325 80.2411 7.22162ZM78.8834 7.21391C78.8834 5.84051 78.5536 5.51645 77.6408 5.51645H76.7971V8.9808H77.6485C78.5306 8.9808 78.8834 8.69532 78.8834 7.21391ZM85.203 10.1382L84.8809 9.01167H82.7945L82.4724 10.1382H81.107L83.0937 4.35138H84.6354L86.6451 10.1382H85.203ZM83.8454 5.33127L83.6843 5.94081L83.109 7.92375H84.5741L84.0218 5.94081L83.8684 5.33127H83.8454ZM91.3462 5.52417H89.7968V10.1382H88.4928V5.52417H86.9511L86.9817 4.35138H91.3155L91.3462 5.52417ZM95.7482 10.1382L95.4261 9.01167H93.3397L93.0175 10.1382H91.6522L93.6388 4.35138H95.1806L97.1903 10.1382H95.7482ZM94.3905 5.33127L94.2295 5.94081L93.6542 7.92375H95.1192L94.567 5.94081L94.4136 5.33127H94.3905ZM47.0323 20.8544V15.0676H48.3516V20.8544H47.0323ZM54.8476 20.8544H53.9425L51.7104 17.6987L51.3653 17.1818L51.3499 17.1895L51.3576 17.8144V20.8544H50.207V15.0676H51.3116L53.3596 18.0536L53.7047 18.5706L53.7201 18.5629L53.7047 17.9456V15.0676H54.8476V20.8544ZM60.4386 16.2404H57.915V17.4904H60.0167L60.0013 18.6014H57.915V20.8544H56.6263V15.0676H60.4155L60.4386 16.2404ZM66.6278 17.961C66.6278 20.0597 65.8991 20.9625 64.0965 20.9625C62.3246 20.9625 61.5576 20.0211 61.5576 17.961C61.5576 15.9009 62.3016 14.9751 64.0965 14.9751C65.8991 14.9751 66.6278 15.9009 66.6278 17.961ZM65.2778 17.961C65.2778 16.4951 64.9786 16.1401 64.0965 16.1401C63.2221 16.1401 62.9153 16.4951 62.9153 17.961C62.9153 19.427 63.2297 19.7974 64.1042 19.7974C64.9709 19.7974 65.2778 19.4193 65.2778 17.961ZM72.4411 16.8654C72.4411 17.6756 72.0959 18.2465 71.4746 18.4394L72.817 20.8544H71.3059L70.3011 18.694H69.488V20.8544H68.1917V15.0676H70.3011C71.7278 15.0676 72.4411 15.6309 72.4411 16.8654ZM71.0911 16.9194C71.0911 16.333 70.8763 16.1478 70.3087 16.1478H69.488V17.7219H70.2857C70.861 17.7219 71.0911 17.5444 71.0911 16.9194ZM74.0894 15.0676H75.5161L76.8508 18.4471L77.0655 19.0258H77.0886L77.3033 18.4471L78.6457 15.0676H80.0724V20.8544H78.8911V17.907L78.9065 17.2821L78.8834 17.2743L78.6687 17.8607L77.4874 20.8544H76.6283L75.4548 17.8684L75.24 17.2821L75.2246 17.2898L75.2323 17.9147V20.8544H74.0894V15.0676ZM85.4408 20.8544L85.1187 19.7279H83.0323L82.7101 20.8544H81.3448L83.3315 15.0676H84.8732L86.8829 20.8544H85.4408ZM84.0832 16.0475L83.9221 16.6571L83.3468 18.64H84.8118L84.2596 16.6571L84.1062 16.0475H84.0832ZM91.584 16.2404H90.0346V20.8544H88.7306V16.2404H87.1888L87.2195 15.0676H91.5533L91.584 16.2404ZM92.9868 20.8544V15.0676H94.3062V20.8544H92.9868ZM101.017 17.961C101.017 20.0597 100.288 20.9625 98.4857 20.9625C96.7138 20.9625 95.9468 20.0211 95.9468 17.961C95.9468 15.9009 96.6908 14.9751 98.4857 14.9751C100.288 14.9751 101.017 15.9009 101.017 17.961ZM99.667 17.961C99.667 16.4951 99.3678 16.1401 98.4857 16.1401C97.6113 16.1401 97.3045 16.4951 97.3045 17.961C97.3045 19.427 97.619 19.7974 98.4934 19.7974C99.3602 19.7974 99.667 19.4193 99.667 17.961ZM107.222 20.8544H106.316L104.084 17.6987L103.739 17.1818L103.724 17.1895L103.731 17.8144V20.8544H102.581V15.0676H103.685L105.733 18.0536L106.079 18.5706L106.094 18.5629L106.079 17.9456V15.0676H107.222V20.8544ZM112.659 19.1184C112.659 20.2603 111.869 20.9625 110.527 20.9625C109.859 20.9625 109.246 20.8004 108.747 20.5304L108.916 19.4116C109.422 19.6816 109.944 19.836 110.511 19.836C111.14 19.836 111.416 19.6045 111.416 19.2033C111.416 18.2928 108.77 18.6786 108.77 16.742C108.77 15.7621 109.399 14.9673 110.856 14.9673C111.416 14.9673 112.022 15.0831 112.467 15.2683L112.306 16.3639C111.831 16.2096 111.355 16.117 110.918 16.117C110.204 16.117 110.013 16.3639 110.013 16.6725C110.013 17.5753 112.659 17.1586 112.659 19.1184ZM117.774 19.1184C117.774 20.2603 116.984 20.9625 115.642 20.9625C114.975 20.9625 114.361 20.8004 113.862 20.5304L114.031 19.4116C114.537 19.6816 115.059 19.836 115.627 19.836C116.256 19.836 116.532 19.6045 116.532 19.2033C116.532 18.2928 113.885 18.6786 113.885 16.742C113.885 15.7621 114.514 14.9673 115.972 14.9673C116.532 14.9673 117.138 15.0831 117.583 15.2683L117.422 16.3639C116.946 16.2096 116.47 16.117 116.033 16.117C115.32 16.117 115.128 16.3639 115.128 16.6725C115.128 17.5753 117.774 17.1586 117.774 19.1184ZM123.227 16.2404H121.678V20.8544H120.374V16.2404H118.832L118.863 15.0676H123.197L123.227 16.2404ZM125.842 19.7202H128.488L128.458 20.8544H124.546V15.0676H128.343L128.366 16.2173H125.842V17.3669H127.967V18.4008H125.842V19.7202ZM131.279 19.6816H133.65L133.619 20.8544H129.975V15.0676H131.279V19.6816ZM136.318 19.6816H138.688L138.658 20.8544H135.014V15.0676H136.318V19.6816ZM141.349 19.7202H143.995L143.965 20.8544H140.053V15.0676H143.85L143.873 16.2173H141.349V17.3669H143.474V18.4008H141.349V19.7202ZM51.0976 29.9504C51.0976 30.9766 50.6221 31.5707 49.3641 31.5707H47.2547V25.7839H49.2491C50.3153 25.7839 50.8522 26.2391 50.8522 27.2036C50.8522 27.9597 50.4917 28.361 50.0084 28.4998V28.5153C50.6834 28.6542 51.0976 29.094 51.0976 29.9504ZM50.5991 29.9118C50.5991 29.1248 50.1849 28.7622 49.3411 28.7622H47.738V31.1232H49.3718C50.1388 31.1232 50.5991 30.8068 50.5991 29.9118ZM50.369 27.2885C50.369 26.5401 50.0084 26.2391 49.2337 26.2391H47.7457V28.3455H49.2951C50.0161 28.3455 50.369 27.9906 50.369 27.2885ZM53.6817 31.0923H56.7346L56.7116 31.5707H53.1832V25.7839H56.5735L56.5965 26.2623H53.6817V28.3224H56.2053V28.7545H53.6817V31.0923ZM62.2181 27.3502C62.2181 28.2915 61.7886 28.7853 60.9908 28.8779L62.594 31.5707H61.9803L60.5076 28.9705H59.1729V31.5707H58.6667V25.7839H60.5306C61.6888 25.7839 62.2181 26.2931 62.2181 27.3502ZM61.6965 27.3734C61.6965 26.5632 61.336 26.2391 60.5306 26.2391H59.1729V28.5539H60.4846C61.3207 28.5539 61.6965 28.2144 61.6965 27.3734ZM64.8559 31.0769H67.7093L67.6863 31.5707H64.3496V25.7839H64.8559V31.0769ZM69.557 31.5707V25.7839H70.0633V31.5707H69.557ZM76.7127 31.5707H76.3368L73.3607 27.0956L73.0232 26.5709L73.0079 26.5786L73.0155 27.2036V31.5707H72.5553V25.7839H73.0539L75.9303 30.151L76.2678 30.6757L76.2832 30.668L76.2678 30.0507L76.2601 25.7839H76.7127V31.5707Z"
              fill="#333333"
            />
            <path
              d="M29.9891 21.0957C29.9891 13.0119 23.4205 6.45858 15.3178 6.45858C7.21506 6.45858 0.646484 13.0119 0.646484 21.0957C0.646484 29.1796 7.21506 35.7329 15.3178 35.7329C23.4205 35.7329 29.9891 29.1796 29.9891 21.0957Z"
              stroke="#333333"
              strokeWidth="1.74242"
            />
            <path
              d="M35.3705 4.95019C35.3705 2.91956 33.7205 1.27342 31.6851 1.27342C29.6497 1.27342 27.9998 2.91956 27.9998 4.95019C27.9998 6.98081 29.6497 8.62695 31.6851 8.62695C33.7205 8.62695 35.3705 6.98081 35.3705 4.95019Z"
              stroke="#333333"
              strokeWidth="1.74242"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
