const beatles = 'https://www.thebeatles.com/'
const imagineSource = 'https://www.johnlennon.com/music/albums/imagine/'
const mccartneySource = 'https://www.paulmccartney.com/discography/albums/mccartney'
const materialSource = 'https://www.georgeharrison.com/releases/living-in-the-material-world/'
const materialSleeve = 'https://beatlesvinyl.com.ua/uk/george/lp/PAS_10006.html'
const ringoSource = 'https://store.ringostarr.com/products/ringo-cd'
const ringoSleeve = 'https://www.jpgr.co.uk/pctc252.html'
const revolverSessions = beatles + 'announcing-revolver-special-editions'

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
    summary: 'Dirilis pada 5 Agustus 1966. Tiga komposisi George Harrison masuk ke album ini, termasuk lagu pembuka Taxman. Eksperimen studio terdengar pada aransemen dawai Eleanor Rigby dan putaran pita Tomorrow Never Knows.',
  },
  {
    slug: 'abbey-road', title: 'Abbey Road', artist_slug: 'the-beatles', artist_name: 'The Beatles', rank: 2,
    year: 1969, format: 'Stereo', catalog: 'PCS 7088', label: 'Apple Records', track_count: 17,
    cover: '/art/abbey-road-cover.webp', artwork: '/art/abbey-road.webp',
    selection_art: '/art/abbey-road-selection.webp', collection_art: '/art/abbey-road-collection.webp',
    studio: 'EMI Studios, Olympic, Trident', producer: 'George Martin', sides: ['YEX 749', 'YEX 750'],
    edition: 'Stereo Master', source_url: beatles + 'abbey-road',
    summary: 'Kedua sisi album merekam pendekatan yang berbeda. Sisi kedua memuat medley dari You Never Give Me Your Money hingga The End, lalu ditutup Her Majesty, yang tersembunyi pada rilisan awal.',
  },
  {
    slug: 'imagine', title: 'Imagine', artist_slug: 'john-lennon', artist_name: 'John Lennon', rank: 3,
    year: 1971, format: 'Solo', catalog: 'PAS 10004', label: 'Apple Records', track_count: 10,
    cover: '/art/imagine-cover.webp', artwork: '/art/imagine.webp', collection_art: '/art/imagine-collection.webp',
    studio: 'Ascot Sound Studios', producer: 'John Lennon, Yoko Ono, Phil Spector',
    edition: 'Apple Stereo', source_url: imagineSource,
    summary: 'Rekaman dasar dibuat di Ascot Sound Studios. Bagian dawai The Flux Fiddlers ditambahkan di Record Plant, New York. John Lennon, Yoko Ono, dan Phil Spector memproduseri album ini.',
  },
  {
    slug: 'mccartney', title: 'McCartney', artist_slug: 'paul-mccartney', artist_name: 'Paul McCartney', rank: 4,
    year: 1970, format: 'Solo', catalog: 'PCS 7102', label: 'Apple Records', track_count: 13,
    cover: '/art/mccartney-cover.webp', artwork: '/art/mccartney.webp',
    producer: 'Paul McCartney', edition: 'Apple Stereo', source_url: mccartneySource,
    summary: 'Album solo pertama Paul McCartney bermula dari percobaan dengan mesin rekam empat jalur di rumah. Paul memainkan instrumen dan menyanyikan vokal utama, sementara Linda McCartney menyumbang harmoni vokal.',
  },
  {
    slug: 'living-in-the-material-world', title: 'Living in the Material World', artist_slug: 'george-harrison', artist_name: 'George Harrison', rank: 5,
    year: 1973, format: 'Solo', catalog: 'PAS 10006', label: 'Apple Records', track_count: 11,
    cover: '/art/material-world-cover.webp', artwork: '/art/material-world.webp',
    studio: 'Apple Studio', producer: 'George Harrison', edition: 'Apple Stereo', source_url: materialSource,
    summary: 'Album ini mempertemukan Harrison dengan sejumlah kolaborator All Things Must Pass dan The Concert for Bangladesh. Give Me Love (Give Me Peace on Earth) menjadi singel utama.',
  },
  {
    slug: 'ringo', title: 'Ringo', artist_slug: 'ringo-starr', artist_name: 'Ringo Starr', rank: 6,
    year: 1973, format: 'Solo', catalog: 'PCTC 252', label: 'Apple Records', track_count: 10,
    cover: '/art/ringo-cover.webp', artwork: '/art/ringo.webp',
    studio: 'Sunset Sound Recorders', producer: 'Richard Perry', edition: 'Apple Stereo', source_url: ringoSource,
    summary: 'Album solo ketiga Ringo Starr diproduseri Richard Perry. John Lennon, Paul McCartney, dan George Harrison ikut tampil serta menyumbangkan lagu, termasuk Photograph yang ditulis Ringo bersama George.',
  },
].map(album => ({
  selection_art: null, collection_art: null, studio: null, producer: null, sides: [],
  ...album,
}))

const lennonMcCartney = 'Lennon–McCartney'
const harrison = 'George Harrison'
const starkey = 'Richard Starkey'
const revolver = [
  ['Taxman', 'taxman', '2:38', harrison, {
    annotation: 'Solo gitar Paul McCartney',
    writing_note: 'George Harrison menulis lagu ini sebagai sindiran terhadap tingginya pajak progresif di Inggris pada masa pemerintahan Harold Wilson.',
    writing_source_url: revolverSessions,
  }],
  ['Eleanor Rigby', 'eleanor-rigby', '2:06', lennonMcCartney, {
    annotation: 'Oktet dawai George Martin',
    writer: 'Paul McCartney',
    writing_note: 'George Martin menata dua kuartet dawai untuk mengiringi lagu tentang tokoh-tokoh yang hidup dalam kesepian ini.',
  }],
  ["I'm Only Sleeping", 'im-only-sleeping', '3:00', lennonMcCartney, {
    annotation: 'Gitar diputar terbalik',
  }],
  ['Love You To', 'love-you', '2:59', harrison, { annotation: 'Sitar dan tabla' }],
  ['Here, There and Everywhere', 'here-there-and-everywhere', '2:24', lennonMcCartney, {
    writer: 'Paul McCartney',
    writing_note: 'McCartney mengenang mulai menyusun akornya dengan gitar di tepi kolam rumah John Lennon di Weybridge.',
  }],
  ['Yellow Submarine', 'yellow-submarine', '2:38', lennonMcCartney, {
    annotation: 'Vokal utama Ringo Starr',
    source_url: revolverSessions,
    writing_note: 'Pita demo memperdengarkan John Lennon menyanyikan draf awal yang bernada murung. John dan Paul kemudian mengolahnya agar selaras dengan bagian refrein yang lebih riang.',
  }],
  ['She Said She Said', 'she-said-she-said', '2:36', lennonMcCartney, {
    writer: 'John Lennon',
    writing_note: 'Lennon mengaitkan liriknya dengan percakapan bersama aktor Peter Fonda pada tahun 1965.',
  }],
  ['Good Day Sunshine', 'good-day-sunshine', '2:09'],
  ['And Your Bird Can Sing', 'and-your-bird-can-sing', '2:00'],
  ['For No One', 'no-one', '1:59', lennonMcCartney, {
    id: 'for-no-one',
    description: 'Baroque Pop · Menampilkan solo French horn oleh Alan Civil.',
    annotation: 'French Horn Solo',
    writer: 'Paul McCartney',
    writing_note: 'McCartney mengenang menulis lagu ini di sebuah chalet ketika berlibur ski di Swiss. Liriknya menggambarkan hubungan yang berakhir. John Lennon menyebutnya sebagai salah satu lagu Paul yang ia sukai.',
    writing_source_url: 'https://www.the-paulmccartney-project.com/song/for-no-one/',
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
  ['Come Together', 'come-together', '4:20', lennonMcCartney, {
    writer: 'John Lennon',
    writing_note: 'Komposisi Lennon ini membuka Abbey Road dan dirilis sebagai singel sisi ganda bersama Something.',
  }],
  ['Something', 'something', '3:03', harrison, {
    writing_note: 'Something menjadi komposisi George Harrison pertama yang dirilis The Beatles sebagai sisi A singel.',
  }],
  ["Maxwell's Silver Hammer", 'maxwells-silver-hammer', '3:27'],
  ['Oh! Darling', 'oh-darling', '3:26', lennonMcCartney, {
    writer: 'Paul McCartney',
    writing_note: 'Judul sementara yang dipakai ketika lagu ini dikerjakan adalah Oh! Darling (I’ll Never Do You No Harm).',
  }],
  ["Octopus's Garden", 'octopuss-garden', '2:48', starkey],
  ["I Want You (She's So Heavy)", 'i-want-you', '7:47', lennonMcCartney, {
    writer: 'John Lennon',
    writing_note: 'Lennon membangun lagu hampir delapan menit ini dengan lirik yang sangat singkat dan progresi gitar berulang.',
  }],
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
  ['Her Majesty', 'her-majesty', '0:23', lennonMcCartney, {
    writer: 'Paul McCartney',
    writing_note: 'Miniatur bergaya music hall ini muncul sesudah The End dan judulnya tidak dicetak pada sampul asli.',
  }],
]

const imagine = [
  ['Imagine', 'imagine', '3:07', 'John Lennon & Yoko Ono', {
    annotation: 'Piano Lennon dan dawai The Flux Fiddlers',
    writing_note: 'John Lennon menyebut buku Grapefruit karya Yoko Ono sebagai salah satu inspirasinya dan mengakui sumbangan Ono pada lirik. Arsip resmi sekarang mencantumkan keduanya sebagai penulis.',
    source_url: 'https://www.johnlennon.com/music/singles/imagine/',
  }],
  ['Crippled Inside', 'crippled-inside', '3:52', 'John Lennon', { annotation: 'Dobro George Harrison' }],
  ['Jealous Guy', 'jealous-guy', '4:14', 'John Lennon', { annotation: 'Siulan John Lennon' }],
  ["It's So Hard", 'its-so-hard', '2:25', 'John Lennon', { annotation: 'Saksofon King Curtis' }],
  ["I Don't Wanna Be a Soldier Mama, I Don't Wanna Die", 'i-dont-wanna-be-a-soldier-mama', '6:05', 'John Lennon'],
  ['Gimme Some Truth', 'gimme-some-truth', '3:16', 'John Lennon', { annotation: 'Gitar elektrik George Harrison' }],
  ['Oh My Love', 'oh-my-love', '2:50', 'John Lennon & Yoko Ono', { annotation: 'Piano elektrik Nicky Hopkins' }],
  ['How Do You Sleep?', 'how-do-you-sleep', '5:36', 'John Lennon'],
  ['How?', 'how', '3:43', 'John Lennon', { annotation: 'Vibrafon John Barham' }],
  ['Oh Yoko!', 'oh-yoko', '4:20', 'John Lennon', {
    annotation: 'Harmonika John Lennon',
    writing_note: 'Catatan resmi album menempatkan penulisan lagu ini pada 1968, tiga tahun sebelum Imagine dirilis.',
  }],
]

const mccartney = [
  ['The Lovely Linda', 'the-lovely-linda', '0:45'],
  ['That Would Be Something', 'that-would-be-something', '2:41'],
  ['Valentine Day', 'valentine-day', '1:43'],
  ['Every Night', 'every-night', '2:35'],
  ['Hot as Sun / Glasses', 'hot-as-sun-glasses', '2:09'],
  ['Junk', 'junk', '1:56'],
  ['Man We Was Lonely', 'man-we-was-lonely', '3:00'],
  ['Oo You', 'oo-you', '2:50'],
  ['Momma Miss America', 'momma-miss-america', '4:07'],
  ['Teddy Boy', 'teddy-boy', '2:24'],
  ['Singalong Junk', 'singalong-junk', '2:37'],
  ["Maybe I'm Amazed", 'maybe-im-amazed', '3:52', 'Paul McCartney', {
    annotation: 'Rekaman asli 1970',
    description: 'Lagu ini pertama kali dirilis pada album solo perdana McCartney pada April 1970.',
  }],
  ['Kreen-Akrore', 'kreen-akrore', '4:14'],
]

const materialWorld = [
  ['Give Me Love (Give Me Peace on Earth)', 'give-me-love-give-me-peace-on-earth', '3:32', harrison, {
    annotation: 'Singel utama',
    source_url: materialSource,
  }],
  ['Sue Me, Sue You Blues', 'sue-me-sue-you-blues', '4:43'],
  ['The Light That Has Lighted the World', 'the-light-that-has-lighted-the-world', '3:28'],
  ["Don't Let Me Wait Too Long", 'dont-let-me-wait-too-long', '2:54'],
  ['Who Can See It', 'who-can-see-it', '3:49'],
  ['Living in the Material World', 'living-in-the-material-world', '5:27'],
  ['The Lord Loves the One (That Loves the Lord)', 'the-lord-loves-the-one', '4:32'],
  ['Be Here Now', 'be-here-now', '4:07'],
  ['Try Some Buy Some', 'try-some-buy-some', '4:06', harrison, {
    annotation: 'Produksi bersama Phil Spector',
  }],
  ["The Day the World Gets 'Round", 'the-day-the-world-gets-round', '2:50'],
  ['That Is All', 'that-is-all', '3:40'],
]

const ringo = [
  ["I'm the Greatest", 'im-the-greatest', '3:21', 'John Lennon', {
    annotation: 'John Lennon dan George Harrison ikut rekaman',
    source_url: 'https://www.youtube.com/watch?v=Ua5EAfAMYpM',
  }],
  ['Have You Seen My Baby', 'have-you-seen-my-baby', '3:43', 'Randy Newman', { annotation: 'Gitar Marc Bolan' }],
  ['Photograph', 'photograph', '3:57', 'Richard Starkey & George Harrison', { annotation: 'Solo saksofon Bobby Keys' }],
  ['Sunshine Life for Me (Sail Away Raymond)', 'sunshine-life-for-me', '2:43', harrison],
  ["You're Sixteen (You're Beautiful and You're Mine)", 'youre-sixteen', '2:47', 'Robert B. Sherman & Richard M. Sherman'],
  ['Oh My My', 'oh-my-my', '4:16', 'Richard Starkey & Vini Poncia'],
  ['Step Lightly', 'step-lightly', '3:14', starkey],
  ["Six O'Clock", 'six-oclock', '4:05', 'Paul McCartney & Linda McCartney', {
    annotation: 'Rekaman di Apple Studios',
    source_url: 'https://www.youtube.com/watch?v=ZZH_z60fkhg',
  }],
  ['Devil Woman', 'devil-woman', '3:54', 'Richard Starkey & Vini Poncia', {
    source_url: 'https://www.youtube.com/watch?v=1ICQJTLy31I',
  }],
  ['You and Me (Babe)', 'you-and-me-babe', '4:41', 'George Harrison & Mal Evans', {
    source_url: 'https://www.youtube.com/watch?v=0gw2_li3i4U',
  }],
]

function makeTracks(albumSlug, sideOneLength, entries, { source, defaultCredit = lennonMcCartney } = {}) {
  return entries.map(([title, slug, duration, credit = defaultCredit, details], index) => ({
    id: source ? albumSlug + '-' + slug : slug,
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
    source_url: source ?? beatles + slug,
    writing_source_url: null,
    ...details,
  }))
}

export const tracks = [
  ...makeTracks('revolver', 7, revolver),
  ...makeTracks('abbey-road', 6, abbeyRoad),
  ...makeTracks('imagine', 5, imagine, { source: imagineSource }),
  ...makeTracks('mccartney', 7, mccartney, { source: mccartneySource, defaultCredit: 'Paul McCartney' }),
  ...makeTracks('living-in-the-material-world', 6, materialWorld, { source: materialSleeve, defaultCredit: harrison }),
  ...makeTracks('ringo', 5, ringo, { source: ringoSleeve }),
]
