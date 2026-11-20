# Discora

Discora adalah PWA katalog piringan hitam The Beatles dan empat personelnya. Katalog publik berisi lima profil, enam album, dan kredit penulis untuk seluruh 75 trek. Koleksi disimpan di browser perangkat.

- Web publik: [Discora](https://discora-web.vercel.app)
- API publik: [Daftar album](https://discora-api.vercel.app/api/albums)
- Kode sumber: [Repo GitHub Discora](https://github.com/JLennon10/discora)
- Data produksi: [Proyek Supabase Discora](https://supabase.com/dashboard/project/slrdzcfilkwqcuebxhss)

## Jalankan di komputer

Gunakan Node.js 22 atau lebih baru. Jalankan perintah berikut dari akar repo.

```sh
npm ci
```

Salin `api/.env.example` ke `api/.env`. Isi `SUPABASE_URL` dan `SUPABASE_PUBLISHABLE_KEY` dari pengaturan proyek Supabase. Lalu jalankan:

```sh
npm run dev
```

Buka [web Vite](http://127.0.0.1:5173). Vite memproksi `/api` ke Express pada port 3000. File lingkungan berada di backend dan diabaikan Git.

Jika ingin menguji PWA lokal dengan data contoh tanpa koneksi Supabase, jalankan build dan preview produksi:

```sh
npm run build
npm run preview:local
```

Buka [preview produksi](http://127.0.0.1:4173). Mode ini memilih fixture lokal secara eksplisit. API produksi selalu membaca Supabase.

## Skema dan seed

Buka SQL Editor di proyek Supabase. Jalankan `api/supabase/schema.sql`, lalu `api/supabase/seed.sql`. Seed memakai upsert sehingga dapat dijalankan ulang untuk memperbarui entri katalog. RLS dan SQL grants memberi role `anon` serta `authenticated` akses baca. Express memakai publishable key untuk membaca.

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

## Demo asistensi dan responsi

1. Di Chrome Android, buka situs saat online dan pilih **Instal aplikasi** dari menu Chrome. Buka Discora dari ikon perangkat dalam keadaan online.
2. Dari **Artis → The Beatles → Revolver**, buka **For No One** dan **Tomorrow Never Knows**. Tunjukkan perbedaan antara kredit resmi Lennon–McCartney dan catatan penulis utama beserta rujukannya.
3. Dari **Album**, filter **The Beatles** dan cari *Revolver*. Buka detail album lalu pilih **Simpan ke Koleksi**. Muat ulang halaman Koleksi untuk menunjukkan bahwa album tetap tersimpan. Album bisa dihapus dari Koleksi.
4. Setelah service worker aktif, kunjungi kembali *Revolver* dan kedua lagu. Aktifkan mode pesawat sambil memastikan Wi-Fi juga mati, lalu buka ulang kedua rute dari tracklist. Trek yang belum dikunjungi akan menampilkan pesan bahwa halaman belum tersimpan. Sambungkan kembali dan tekan **Coba lagi**.
5. Buka langsung [Revolver](https://discora-web.vercel.app/album/revolver) dan [Tomorrow Never Knows](https://discora-web.vercel.app/lagu/tomorrow-never-knows), lalu refresh untuk menunjukkan fallback rute.

## Rujukan katalog

Katalog mengikuti urutan album asli. Durasi dapat berbeda antar pressing atau remaster. Setiap detail lagu menyertakan rujukan kredit.

- [Revolver](https://usastore.thebeatles.com/products/revolver-lp-remastered) dan [catatan sesi dari Apple Corps](https://www.thebeatles.com/announcing-revolver-special-editions)
- [Abbey Road](https://www.thebeatles.com/abbey-road-special-anniversary-editions-2019)
- [Imagine dan catatan sampul](https://www.johnlennon.com/music/albums/imagine/)
- [McCartney dan kredit komposisi dari MPL](https://www.paulmccartney.com/discography/albums/mccartney) · [Durasi remaster 2011](https://music.apple.com/us/album/mccartney-2011-remaster/1443150811)
- [Living in the Material World](https://www.georgeharrison.com/releases/living-in-the-material-world/) dan [arsip sampul Apple PAS 10006](https://beatlesvinyl.com.ua/uk/george/lp/PAS_10006.html)
- [Ringo](https://store.ringostarr.com/products/ringo-cd) dan [arsip edisi Apple PCTC 252](https://www.jpgr.co.uk/pctc252.html)

Detail empat album solo memakai gambar sampul arsip. Kartu katalog mengikuti aset visual frame desain. [Imagine](https://www.johnlennon.com/music/albums/imagine/) · [McCartney](https://www.paulmccartney.com/discography/albums/mccartney) · [Living in the Material World](https://jpgr.co.uk/pas10006.html) · [Ringo](https://www.jpgr.co.uk/pctc252.html)

Cerita di detail album dan lagu menggunakan data editorial di `web/src/trivia-data.js`. Galeri *Abbey Road* dan *Imagine* menampilkan foto dengan tanggal, kredit, dan lisensi. [Catatan riset trivia](docs/riset-trivia-discora.md)
