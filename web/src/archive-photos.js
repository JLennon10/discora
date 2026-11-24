const bedInSource = 'https://commons.wikimedia.org/wiki/File:John_Lennon_en_zijn_echtgenote_Yoko_Ono_op_huwelijksreis_in_Amsterdam._John_Lenn,_Bestanddeelnr_'

function archivePhoto(file, filename, { alt, caption, credit, license = 'Domain publik (AS)', licenseUrl }) {
  return {
    file: 'archive-' + file,
    alt,
    caption,
    credit,
    license,
    licenseUrl,
    converted: true,
    source: 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(filename.replaceAll(' ', '_')),
  }
}

const shareAlike = {
  license: 'CC BY-SA 2.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
}

const johnSolo = {
  title: 'John Lennon dan Yoko Ono, 1971',
  photos: [
    archivePhoto('john-lennon-imagine', 'John Lennon Imagine 1971.jpg', {
      alt: 'John Lennon duduk di depan piano putih di ruangan terang',
      caption: 'Foto John Lennon di depan piano dari iklan album Imagine di Billboard, 18 September 1971.',
      credit: 'Peter Fordham',
    }),
    archivePhoto('john-lennon-sinclair', 'Yoko Ono and John Lennon at John Sinclair Freedom Rally.jpg', {
      alt: 'Yoko Ono dan John Lennon di depan mikrofon',
      caption: 'Yoko Ono dan John Lennon di John Sinclair Freedom Rally, Ann Arbor, 10 Desember 1971.',
      credit: 'Fotografer tidak tercatat / Michiganensian, University of Michigan',
    }),
  ],
}

export const albumGalleries = {
  revolver: {
    title: 'Arsip The Beatles, 1966',
    photos: [
      {
        file: 'archive-beatles-wcfl',
        alt: 'Anggota The Beatles bersama penyiar radio Jim Stagg',
        caption: 'The Beatles bersama penyiar Jim Stagg, Agustus 1966. Dimuat WCFL dalam Sound 10 Survey edisi Oktober.',
        credit: 'WCFL / Chicago Federation of Labor',
        license: 'Domain publik (AS)',
        source: 'https://commons.wikimedia.org/wiki/File:WCFL_Sound_10_survey_October_1966_Beatles_Jim_Stagg_(cropped).jpg',
      },
      {
        file: 'archive-yellow-submarine-ad',
        alt: 'Ilustrasi kapal selam kuning di bawah ombak, dengan tulisan Eleanor Rigby',
        caption: 'Iklan Capitol Records untuk singel “Yellow Submarine” dan “Eleanor Rigby”, Billboard, Agustus 1966.',
        credit: 'Capitol Records',
        license: 'Domain publik (AS)',
        source: 'https://commons.wikimedia.org/wiki/File:YellowSubTradeAd.jpg',
      },
    ],
  },
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
    title: 'John Lennon dan Yoko Ono, 1969–1971',
    photos: [
      ...johnSolo.photos,
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
  help: {
    title: 'Help! dan tur Amerika 1965',
    photos: [
      archivePhoto('beatles-help-ad', 'The Beatles - Help! ad.jpg', {
        alt: 'Iklan cetak dengan tulisan Help! melengkung di sekitar foto The Beatles',
        caption: 'Iklan Capitol Records untuk singel “Help!” di majalah Cashbox, 24 Juli 1965.',
        credit: 'Capitol Records',
      }),
      archivePhoto('beatles-hollywood-bowl', 'Beatles hollywood bowl, 1965.jpg', {
        alt: 'The Beatles bermain di panggung Hollywood Bowl',
        caption: 'The Beatles di Hollywood Bowl, Agustus 1965. Foto dimuat di KRLA Beat edisi 2 Oktober.',
        credit: 'Robert W. Young / KRLA Beat',
      }),
    ],
  },
  'rubber-soul': {
    title: 'The Beatles menjelang Rubber Soul',
    photos: [
      archivePhoto('beatles-metropolitan-press', 'Beatles press conference 1965.jpg', {
        alt: 'Anggota The Beatles duduk di hadapan mikrofon dan wartawan',
        caption: 'Konferensi pers The Beatles di Metropolitan Stadium, Minnesota, 21 Agustus 1965.',
        credit: 'Minnesota Historical Society',
        ...shareAlike,
      }),
      archivePhoto('beatles-metropolitan-stage', 'The Beatles at Metropolitan Stadium.jpg', {
        alt: 'The Beatles tampil di panggung di tengah lapangan stadion',
        caption: 'The Beatles tampil di Metropolitan Stadium pada 21 Agustus 1965, beberapa bulan sebelum Rubber Soul dirilis.',
        credit: 'Minnesota Historical Society',
        ...shareAlike,
      }),
    ],
  },
  'sgt-pepper': {
    title: 'The Beatles pada era Sgt. Pepper',
    photos: [
      archivePhoto('beatles-sgt-pepper', 'Sgt Peppers.jpg', {
        alt: 'The Beatles mengenakan seragam warna-warni dengan latar kuning',
        caption: 'The Beatles dalam kostum Sgt. Pepper, 30 Maret 1967.',
        credit: 'Michael Cooper',
      }),
      archivePhoto('beatles-capitol-1967', 'The Beatles 1967.jpg', {
        alt: 'Potret keempat anggota The Beatles untuk materi promosi Capitol Records',
        caption: 'Foto promosi singel “All You Need Is Love” / “Baby, You’re a Rich Man” untuk Capitol Records, Juli 1967.',
        credit: 'Henry Grossman / Capitol Records',
      }),
    ],
  },
  'let-it-be': {
    title: 'Jejak sesi Get Back',
    photos: [
      archivePhoto('beatles-savile-row-plaque', 'Savile Row - Beatles Plaque - geograph.org.uk - 7486538.jpg', {
        alt: 'Plakat biru di dinding gedung 3 Savile Row',
        caption: 'Plakat di 3 Savile Row, London, difoto pada 2023. Plakat menandai lokasi konser atap 30 Januari 1969.',
        credit: 'Colin Smith / Geograph Britain and Ireland',
        ...shareAlike,
      }),
      archivePhoto('beatles-across-the-universe', 'AcrossTheUniverse.jpg', {
        alt: 'Label piringan uji hitam untuk Across the Universe',
        caption: 'Piringan uji mono untuk versi “Across the Universe” yang disiapkan bagi proyek World Wildlife Fund. Let It Be memakai versi lain.',
        credit: 'UltraSparky',
        license: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      }),
    ],
  },
  mccartney: {
    title: 'Paul dan Linda McCartney',
    photos: [
      archivePhoto('paul-mccartney-scotland', 'Paul McCartney in Scotland (1969).jpg', {
        alt: 'Paul McCartney menggendong bayi Mary di Skotlandia',
        caption: 'Linda memotret Paul bersama Mary di Skotlandia pada 1969. Foto ini beredar dalam materi promosi album McCartney.',
        credit: 'Linda McCartney / Apple Records',
      }),
      archivePhoto('paul-linda-wings', 'Paul McCartney with Linda McCartney - Wings - 1976.jpg', {
        alt: 'Paul memainkan gitar dengan Linda di sebelahnya di panggung',
        caption: 'Paul dan Linda tampil bersama Wings dalam tur Wings Over America, 1976.',
        credit: 'Jim Summaria',
        license: 'CC BY-SA 3.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      }),
    ],
  },
  'living-in-the-material-world': {
    title: 'George Harrison dan Ravi Shankar',
    photos: [
      archivePhoto('george-harrison-shankar', 'Photograph of Ravi Shankar, George Harrison, President Gerald Ford, and Jack Ford in the Oval Office - NARA - 6926455.jpg', {
        alt: 'Ravi Shankar, George Harrison, Gerald Ford, dan Jack Ford di Ruang Oval',
        caption: 'George Harrison dan kolaboratornya Ravi Shankar bertemu Gerald Ford dan Jack Ford di Gedung Putih, 13 Desember 1974.',
        credit: 'U.S. National Archives and Records Administration',
      }),
      archivePhoto('george-harrison-dark-horse', 'George Harrison - Dark Horse.png', {
        alt: 'George Harrison duduk di bangku taman dengan tulisan Dark Horse',
        caption: 'Iklan album Dark Horse di Billboard, 21 Desember 1974. Dark Horse adalah album studio George setelah Living in the Material World.',
        credit: 'Apple Records',
      }),
    ],
  },
  ringo: {
    title: 'Ringo Starr di pertengahan 1970-an',
    photos: [
      archivePhoto('ringo-starr-1975', 'Ringo Starr (1975).jpg', {
        alt: 'Iklan dengan dua sosok dan piring terbang di atap gedung Capitol Records',
        caption: 'Iklan singel Ringo “No No Song” / “Snookeroo” di Billboard, 1 Februari 1975. Richard Perry kembali menjadi produser setelah mengerjakan album Ringo.',
        credit: 'Apple Records',
      }),
      archivePhoto('ringo-last-waltz', 'The Last Waltz.jpg', {
        alt: 'Ringo Starr duduk di drum bersama The Band dan para tamu di atas panggung',
        caption: 'Ringo ikut bermain drum di The Last Waltz, konser perpisahan The Band, 25 November 1976.',
        credit: 'David Gans',
        ...shareAlike,
      }),
    ],
  },
}

export const artistGalleries = {
  'the-beatles': {
    title: 'The Beatles dalam foto arsip',
    photos: [albumGalleries.help.photos[1], albumGalleries.revolver.photos[0], albumGalleries['sgt-pepper'].photos[0]],
  },
  'john-lennon': johnSolo,
  'paul-mccartney': albumGalleries.mccartney,
  'george-harrison': albumGalleries['living-in-the-material-world'],
  'ringo-starr': albumGalleries.ringo,
}

export const trackGalleries = {
  'imagine-imagine': albumGalleries.imagine,
  'yellow-submarine': albumGalleries.revolver,
  'eleanor-rigby': albumGalleries.revolver,
  'help-help': albumGalleries.help,
  'sgt-pepper-sgt-peppers-lonely-hearts-club-band': albumGalleries['sgt-pepper'],
  'let-it-be-across-the-universe': albumGalleries['let-it-be'],
}
