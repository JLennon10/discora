const beatles = 'https://www.thebeatles.com/'

export const artists = [
  {
    slug: 'the-beatles', name: 'The Beatles', kind: 'group', rank: 1,
    era: '1960–1970', roles: '12 Album Studio Kanonik', origin: 'Liverpool, Inggris', genre: 'Rock / Psikedelik',
    summary: 'Kuartet legendaris asal Liverpool: John Lennon, Paul McCartney, George Harrison, dan Ringo Starr.',
    bio: 'Grup musik kuartet asal Liverpool yang merevolusi musik populer abad ke-20. Terdiri dari John Lennon, Paul McCartney, George Harrison, dan Ringo Starr, kemitraan penulisan lagu Lennon–McCartney menjadi standar emas musik dunia.',
    highlights: '', tags: ['Abbey Road', 'Apple Corps', 'PMC / PCS Series'],
    image: '/art/beatles.webp', initials: 'TB',
  },
  {
    slug: 'john-lennon', name: 'John Lennon', kind: 'solo', rank: 2,
    era: '1940–1980', roles: 'Vokal, Gitar, Piano', origin: 'Liverpool, Inggris', genre: 'Rock / Pop',
    summary: '', bio: 'Vokalis dan gitaris ritme The Beatles. John melanjutkan karier solonya dengan Plastic Ono Band dan merilis Imagine pada 1971.',
    highlights: 'Imagine, Plastic Ono Band, Double Fantasy.', tags: ['Solo & Ono Band', 'Apple Records'],
    image: null, initials: 'JL',
  },
  {
    slug: 'paul-mccartney', name: 'Paul McCartney', kind: 'solo', rank: 3,
    era: '1942–Sekarang', roles: 'Bass, Vokal, Multi-instrumentalis', origin: 'Liverpool, Inggris', genre: 'Rock / Pop',
    summary: '', bio: 'Bassis, vokalis, dan salah satu penulis lagu utama The Beatles. Ia memulai diskografi solonya dengan McCartney sebelum membentuk Wings.',
    highlights: 'McCartney, Ram, Band on the Run (Wings).', tags: ['Wings Era', 'MPL Communications'],
    image: null, initials: 'PM',
  },
  {
    slug: 'george-harrison', name: 'George Harrison', kind: 'solo', rank: 4,
    era: '1943–2001', roles: 'Gitaris Utama, Sitar, Penulis Lagu', origin: 'Liverpool, Inggris', genre: 'Rock / Folk',
    summary: '', bio: 'Gitaris utama The Beatles dan penulis Taxman, Something, serta Here Comes the Sun. Karya solonya mencakup All Things Must Pass dan Living in the Material World.',
    highlights: 'All Things Must Pass, Living in the Material World.', tags: ['Dark Horse', 'Triple LP Master'],
    image: null, initials: 'GH',
  },
  {
    slug: 'ringo-starr', name: 'Ringo Starr', kind: 'solo', rank: 5,
    era: '1940–Sekarang', roles: 'Drum, Perkusi, Vokal', origin: 'Liverpool, Inggris', genre: 'Rock / Pop',
    summary: '', bio: 'Richard Starkey, dikenal sebagai Ringo Starr, adalah drummer The Beatles dan penulis Octopus’s Garden. Album Ringo terbit pada 1973.',
    highlights: 'Ringo (1973), Beaucoups of Blues, Sentimental Journey.', tags: ['All-Starr Band', 'Ludwig Drums'],
    image: null, initials: 'RS',
  },
]

export const albums = [
  {
    slug: 'revolver', title: 'Revolver', artist_slug: 'the-beatles', artist_name: 'The Beatles', rank: 1,
    year: 1966, format: 'Mono', catalog: 'PMC 7009', label: 'Parlophone / EMI', track_count: 14,
    cover: '/art/revolver-cover.webp', artwork: '/art/revolver.webp',
    selection_art: '/art/revolver-selection.webp', collection_art: '/art/revolver-collection.webp',
    studio: 'EMI Studios, Abbey Road', producer: 'George Martin', sides: ['XEX 605', 'XEX 606'],
    edition: 'Parlophone Mono', source_url: beatles + 'revolver',
  },
  {
    slug: 'abbey-road', title: 'Abbey Road', artist_slug: 'the-beatles', artist_name: 'The Beatles', rank: 2,
    year: 1969, format: 'Stereo', catalog: 'PCS 7088', label: 'Apple Records', track_count: 17,
    cover: '/art/abbey-road-cover.webp', artwork: '/art/abbey-road.webp',
    selection_art: '/art/abbey-road-selection.webp', collection_art: '/art/abbey-road-collection.webp',
    studio: 'EMI Studios, Olympic, Trident', producer: 'George Martin', sides: ['YEX 749', 'YEX 750'],
    edition: 'Stereo Master', source_url: beatles + 'abbey-road',
  },
  {
    slug: 'imagine', title: 'Imagine', artist_slug: 'john-lennon', artist_name: 'John Lennon', rank: 3,
    year: 1971, format: 'Solo', catalog: 'PAS 10004', label: 'Apple Records', track_count: 10,
    cover: '/art/imagine.webp', artwork: '/art/imagine.webp', collection_art: '/art/imagine-collection.webp',
    studio: 'Ascot Sound Studios', edition: 'Ascot Sound Studios', source_url: 'https://www.johnlennon.com/music/albums/imagine/',
  },
  {
    slug: 'mccartney', title: 'McCartney', artist_slug: 'paul-mccartney', artist_name: 'Paul McCartney', rank: 4,
    year: 1970, format: 'Solo', catalog: 'PCS 7102', label: 'Apple Records', track_count: 13,
    cover: '/art/mccartney.webp', artwork: '/art/mccartney.webp',
    edition: 'Apple Records', source_url: 'https://www.paulmccartney.com/discography/albums/mccartney',
  },
  {
    slug: 'living-in-the-material-world', title: 'Living in the Material World', artist_slug: 'george-harrison', artist_name: 'George Harrison', rank: 5,
    year: 1973, format: 'Solo', catalog: 'PAS 10006', label: 'Apple Records', track_count: 11,
    cover: '/art/material-world.webp', artwork: '/art/material-world.webp',
    edition: 'Apple Records', source_url: 'https://www.georgeharrison.com/music/',
  },
  {
    slug: 'ringo', title: 'Ringo', artist_slug: 'ringo-starr', artist_name: 'Ringo Starr', rank: 6,
    year: 1973, format: 'Solo', catalog: 'PCTC 252', label: 'Apple Records', track_count: 10,
    cover: '/art/ringo.webp', artwork: '/art/ringo.webp',
    edition: 'Apple Records', source_url: 'https://store.ringostarr.com/products/ringo-cd',
  },
].map(album => ({
  selection_art: null, collection_art: null, studio: null, producer: null, sides: [],
  ...album,
}))

const lennonMcCartney = 'Lennon–McCartney'
const harrison = 'George Harrison'
const starkey = 'Richard Starkey'
const revolver = [
  ['Taxman', 'taxman', '2:38', harrison],
  ['Eleanor Rigby', 'eleanor-rigby', '2:06'],
  ["I'm Only Sleeping", 'im-only-sleeping', '3:00'],
  ['Love You To', 'love-you', '2:59', harrison],
  ['Here, There and Everywhere', 'here-there-and-everywhere', '2:24'],
  ['Yellow Submarine', 'yellow-submarine', '2:38', lennonMcCartney, {
    annotation: 'Vokal utama Ringo Starr',
    source_url: beatles + 'announcing-revolver-special-editions',
  }],
  ['She Said She Said', 'she-said-she-said', '2:36'],
  ['Good Day Sunshine', 'good-day-sunshine', '2:09'],
  ['And Your Bird Can Sing', 'and-your-bird-can-sing', '2:00'],
  ['For No One', 'no-one', '1:59', lennonMcCartney, {
    id: 'for-no-one',
    description: 'Baroque Pop · Menampilkan solo French horn oleh Alan Civil.',
    annotation: 'French Horn Solo',
    writer: 'Paul McCartney',
    writing_note: 'Lagu ini menggambarkan berakhirnya sebuah hubungan. John Lennon menyebutnya sebagai salah satu lagu Paul yang ia sukai.',
  }],
  ['Doctor Robert', 'doctor-robert', '2:14'],
  ['I Want to Tell You', 'i-want-tell-you', '2:28', harrison],
  ['Got to Get You into My Life', 'got-get-you-my-life', '2:29'],
  ['Tomorrow Never Knows', 'tomorrow-never-knows', '2:57', lennonMcCartney, {
    description: 'Rock psikedelik dan eksperimental · Menggunakan loop pita dan automatic double tracking (ADT).',
    annotation: 'Experimental Tape Loops',
    writer: 'John Lennon',
    writing_note: 'Dalam sebuah wawancara, Lennon mengaitkan penulisan liriknya dengan The Psychedelic Experience, panduan yang mengadaptasi Tibetan Book of the Dead.',
    writing_source_url: 'https://penthouse.com/legacy/yoko-influence/',
  }],
]
const abbeyRoad = [
  ['Come Together', 'come-together', '4:20'],
  ['Something', 'something', '3:03', harrison],
  ["Maxwell's Silver Hammer", 'maxwells-silver-hammer', '3:27'],
  ['Oh! Darling', 'oh-darling', '3:26'],
  ["Octopus's Garden", 'octopuss-garden', '2:48', starkey],
  ["I Want You (She's So Heavy)", 'i-want-you', '7:47'],
  ['Here Comes the Sun', 'here-comes-sun', '3:05', harrison],
  ['Because', 'because', '2:45'],
  ['You Never Give Me Your Money', 'you-never-give-me-your-money', '4:02'],
  ['Sun King', 'sun-king', '2:26'],
  ['Mean Mr. Mustard', 'mean-mr-mustard', '1:06'],
  ['Polythene Pam', 'polythene-pam', '1:12'],
  ['She Came In Through the Bathroom Window', 'she-came-through-bathroom-window', '1:57'],
  ['Golden Slumbers', 'golden-slumbers', '1:31'],
  ['Carry That Weight', 'carry-weight', '1:36'],
  ['The End', 'end', '2:19'],
  ['Her Majesty', 'her-majesty', '0:23'],
]

function makeTracks(albumSlug, sideOneLength, entries) {
  return entries.map(([title, sourceSlug, duration, credit = lennonMcCartney, details], index) => ({
    id: sourceSlug,
    album_slug: albumSlug,
    title,
    position: index + 1,
    side: index < sideOneLength ? 1 : 2,
    duration,
    credit,
    description: null,
    annotation: null,
    writer: null,
    writing_note: null,
    source_url: beatles + sourceSlug,
    writing_source_url: null,
    ...details,
  }))
}

export const tracks = [
  ...makeTracks('revolver', 7, revolver),
  ...makeTracks('abbey-road', 6, abbeyRoad),
]
