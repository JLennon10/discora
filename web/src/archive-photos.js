const bedInSource = 'https://commons.wikimedia.org/wiki/File:John_Lennon_en_zijn_echtgenote_Yoko_Ono_op_huwelijksreis_in_Amsterdam._John_Lenn,_Bestanddeelnr_'

export const albumGalleries = {
  'abbey-road': {
    title: 'Zebra crossing Abbey Road',
    photos: [
      {
        file: 'archive-abbey-road-2007',
        alt: 'Zebra crossing di jalan Abbey Road yang dinaungi pepohonan',
        caption: 'Zebra crossing Abbey Road, London, 2007.',
        credit: 'Misterweiss',
        license: 'Domain publik',
        source: 'https://commons.wikimedia.org/wiki/File:Abbey_Road_Zebra.jpg',
      },
      {
        file: 'archive-abbey-road-2009',
        alt: 'Orang menyeberang di depan bus merah dan gedung Abbey Road Studios',
        caption: 'Zebra crossing dan gedung Abbey Road Studios, London, 2009.',
        credit: 'Josephenus P. Riley',
        license: 'CC BY 2.0',
        licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
        source: 'https://commons.wikimedia.org/wiki/File:Abbey_Road_zebra_crossing_%26_Abbey_Road_Studios.jpg',
      },
    ],
  },
  imagine: {
    title: 'Bed-In for Peace di Amsterdam',
    photos: [
      {
        file: 'archive-bed-in-2307',
        alt: 'John Lennon dan Yoko Ono duduk di ranjang dengan gitar dan seorang fotografer di sampingnya',
        caption: 'John dan Yoko saat Bed-In for Peace, Amsterdam, 25 Maret 1969.',
        credit: 'Eric Koch / Anefo',
        license: 'CC0',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        source: bedInSource + '922-2307.jpg',
      },
      {
        file: 'archive-bed-in-2302',
        alt: 'John Lennon dan Yoko Ono di ranjang dengan tulisan Hair Peace dan Bed Peace di jendela',
        caption: 'Sudut lain dari Bed-In for Peace, Amsterdam, 25 Maret 1969.',
        credit: 'Eric Koch / Anefo',
        license: 'CC0',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        source: bedInSource + '922-2302.jpg',
      },
    ],
  },
}

export const trackGalleries = {
  'imagine-imagine': albumGalleries.imagine,
}
