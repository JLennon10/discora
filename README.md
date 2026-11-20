# Discora

Discora adalah PWA katalog piringan hitam The Beatles dan empat personelnya. Katalog publik berisi lima profil, enam album, dan kredit penulis untuk seluruh 31 trek *Revolver* dan *Abbey Road*. Koleksi disimpan di browser perangkat.

- Web publik: [Discora](https://discora-web.vercel.app)
- API publik: [Daftar album](https://discora-api.vercel.app/api/albums)
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

Buat dua proyek Hobby dari repo yang sama. Pilih root `api` dengan preset Express dan root `web` dengan preset Vite. Masukkan `SUPABASE_URL` dan `SUPABASE_PUBLISHABLE_KEY` ke lingkungan proyek **API**. Set tujuan rewrite `/api/:path*` di `web/vercel.json` ke domain produksi API untuk lingkungan Anda. Konfigurasi web juga menangani refresh langsung di rute React Router.

## Demo asistensi dan responsi

1. Di Chrome Android, buka situs saat online dan pilih **Instal aplikasi** dari menu Chrome. Buka Discora dari ikon perangkat dalam keadaan online.
2. Dari **Artis → The Beatles → Revolver**, buka **For No One** dan **Tomorrow Never Knows**. Tunjukkan perbedaan antara kredit resmi Lennon–McCartney dan catatan penulis utama beserta rujukannya.
3. Dari **Album**, filter **The Beatles** dan cari *Revolver*. Buka detail album lalu pilih **Simpan ke Koleksi**. Muat ulang halaman Koleksi untuk menunjukkan bahwa album tetap tersimpan. Album bisa dihapus dari Koleksi.
4. Setelah service worker aktif, kunjungi kembali *Revolver* dan kedua lagu. Aktifkan mode pesawat sambil memastikan Wi-Fi juga mati, lalu buka ulang kedua rute dari tracklist. Trek yang belum dikunjungi akan menampilkan pesan bahwa halaman belum tersimpan. Sambungkan kembali dan tekan **Coba lagi**.
5. Buka langsung [Revolver](https://discora-web.vercel.app/album/revolver) dan [Tomorrow Never Knows](https://discora-web.vercel.app/lagu/tomorrow-never-knows), lalu refresh untuk menunjukkan fallback rute.

## Rujukan katalog

Urutan trek mengikuti daftar album resmi. Kredit penulisan mempunyai rujukan per lagu di API dan UI. Keempat album solo memiliki detail rilisan. Entri trek dan kredit tersedia untuk *Revolver* dan *Abbey Road*. [Revolver](https://usastore.thebeatles.com/products/revolver-lp-remastered) · [Abbey Road](https://www.thebeatles.com/abbey-road-special-anniversary-editions-2019)
