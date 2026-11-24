# Discora

Discora adalah aplikasi web progresif (PWA) untuk menjelajahi piringan hitam The Beatles dan karier solo keempat personelnya. Katalognya mencakup 5 profil artis, 10 album, dan kredit penulis untuk 128 lagu.

[Buka aplikasi](https://discora-web.vercel.app) · [Lihat contoh respons API](https://discora-api.vercel.app/api/albums) · [Panduan demo asistensi](docs/demo-asistensi.md)

## Fitur

- Jelajahi profil artis, cari dan filter album, lalu buka daftar lagu menurut sisi piringan.
- Lihat kredit resmi, catatan penulis, rujukan, trivia, dan galeri arsip pada entri yang relevan.
- Simpan album ke **Koleksi**. Daftar tersimpan di `localStorage` browser.
- Instal Discora sebagai PWA. Setelah service worker aktif, halaman katalog yang sudah dikunjungi bisa dibuka kembali saat offline selama datanya masih tersimpan di cache.

## Coba di komputer tanpa Supabase

Gunakan Node.js 22 atau lebih baru. Jalankan dari folder utama repositori.

```sh
npm ci
npm run build
npm run preview:local
```

Buka [preview di port 4173](http://127.0.0.1:4173). Perintah preview menjalankan Vite dan Express dengan data contoh dari repositori. Port 3000 dan 4173 perlu tersedia.

## Struktur proyek

| Lokasi | Peran |
| --- | --- |
| [`web/src/`](web/src) | Antarmuka React, rute React Router, koleksi lokal, dan konten editorial. |
| [`web/vite.config.js`](web/vite.config.js) | Proxy API lokal, manifest PWA, dan strategi cache service worker. |
| [`api/`](api) | Endpoint Express dan akses data dari Supabase atau katalog lokal. |
| [`api/supabase/`](api/supabase) | Skema dan seed PostgreSQL untuk katalog. |
| [`docs/`](docs) | Panduan demo dan catatan riset trivia. |

Di produksi, Vercel meneruskan permintaan `/api` dari web ke Express. Express mengambil data katalog dari Supabase. Service worker mencoba jaringan dulu, lalu memakai respons API dari cache saat jaringan gagal atau melewati batas waktu.

## Pengembangan dengan Supabase

Setelah `npm ci`, salin [`api/.env.example`](api/.env.example) ke `api/.env` dan isi `SUPABASE_URL` serta `SUPABASE_PUBLISHABLE_KEY`. Siapkan basis data dengan langkah di bawah jika proyek Supabase masih kosong. Gunakan perintah ini dari folder utama untuk memulai pengembangan.

```sh
npm run dev
```

Buka [web Vite di port 5173](http://127.0.0.1:5173). Vite meneruskan `/api` ke Express pada port 3000. Git mengabaikan `api/.env`.

### Skema dan seed

Buka SQL Editor di proyek Supabase. Jalankan [`schema.sql`](api/supabase/schema.sql), lalu [`seed.sql`](api/supabase/seed.sql). Seed memakai upsert sehingga dapat dijalankan ulang untuk memperbarui entri katalog. RLS dan SQL grants memberi role `anon` serta `authenticated` akses baca. Express memakai publishable key untuk membaca.

Edit `api/catalog.mjs` jika data atau sumber berubah. Buat ulang seed dengan `npm run seed:generate -w api` sebelum menjalankannya di Supabase.

## Endpoint

| Endpoint | Contoh |
| --- | --- |
| `GET /api/artists` | [Daftar artis](https://discora-api.vercel.app/api/artists) |
| `GET /api/artists/:slug` | [The Beatles](https://discora-api.vercel.app/api/artists/the-beatles) |
| `GET /api/albums` | [Daftar album](https://discora-api.vercel.app/api/albums) |
| `GET /api/albums/:slug` | [Revolver dan daftar lagu](https://discora-api.vercel.app/api/albums/revolver) |
| `GET /api/tracks/:id` | [For No One](https://discora-api.vercel.app/api/tracks/for-no-one) · [Tomorrow Never Knows](https://discora-api.vercel.app/api/tracks/tomorrow-never-knows) |

Daftar mengembalikan array JSON dan detail mengembalikan objek. Slug dan ID yang tidak ditemukan mengembalikan HTTP `404`. Gangguan basis data mengembalikan HTTP `503`.

## Deploy di Vercel

Buat dua proyek Hobby dari repo yang sama. Pilih root `api` dengan preset Express dan root `web` dengan preset Vite. Izinkan kedua proyek mengakses file di luar root masing-masing agar dapat memakai lockfile workspace. Masukkan `SUPABASE_URL` dan `SUPABASE_PUBLISHABLE_KEY` ke lingkungan proyek **API**. Set tujuan rewrite `/api/:path*` di `web/vercel.json` ke domain produksi API untuk lingkungan Anda. Konfigurasi web juga menangani refresh langsung di rute React Router.

## Rujukan katalog

Katalog mengikuti urutan album asli. Durasi dapat berbeda antar pressing atau remaster. Setiap detail lagu menyertakan rujukan kredit.

- [Revolver](https://usastore.thebeatles.com/products/revolver-lp-remastered) dan [catatan sesi dari Apple Corps](https://www.thebeatles.com/announcing-revolver-special-editions)
- [Help!](https://www.thebeatles.com/help-0), [Rubber Soul](https://www.thebeatles.com/rubber-soul), [Sgt. Pepper’s Lonely Hearts Club Band](https://www.thebeatles.com/sgt-peppers-lonely-hearts-club-band-0), dan [Let It Be](https://www.thebeatles.com/let-it-be-0)
- [Abbey Road](https://www.thebeatles.com/abbey-road-special-anniversary-editions-2019)
- [Imagine dan catatan sampul](https://www.johnlennon.com/music/albums/imagine/)
- [McCartney dan kredit komposisi dari MPL](https://www.paulmccartney.com/discography/albums/mccartney) · [Durasi remaster 2011](https://music.apple.com/us/album/mccartney-2011-remaster/1443150811)
- [Living in the Material World](https://www.georgeharrison.com/releases/living-in-the-material-world/) dan [arsip sampul Apple PAS 10006](https://beatlesvinyl.com.ua/uk/george/lp/PAS_10006.html)
- [Ringo](https://store.ringostarr.com/products/ringo-cd) dan [arsip edisi Apple PCTC 252](https://www.jpgr.co.uk/pctc252.html)

Katalog, detail album, dan koleksi mengutamakan gambar sampul arsip yang sama. [Imagine](https://www.johnlennon.com/music/albums/imagine/) · [McCartney](https://www.paulmccartney.com/discography/albums/mccartney) · [Living in the Material World](https://jpgr.co.uk/pas10006.html) · [Ringo](https://www.jpgr.co.uk/pctc252.html)

Detail album dan lagu memuat cerita dari arsip resmi, wawancara, podcast, dan diskusi penggemar. Galeri di detail album dan profil artis menampilkan keterangan, kredit, serta lisensi foto. [Catatan riset trivia](docs/riset-trivia-discora.md)
