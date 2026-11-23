# Demo Discora untuk asistensi dan responsi

Mulai dari [README repositori](../README.md) untuk melihat cakupan katalog, teknologi, dan cara menjalankan proyek. Gunakan [Discora versi publik](https://discora-web.vercel.app) untuk demo di Chrome Android.

| Langkah | Hasil yang ditunjukkan |
| --- | --- |
| Saat online, buka menu Chrome dan pilih **Instal aplikasi** atau opsi pemasangan yang tersedia. Buka Discora dari ikon perangkat. | PWA terbuka sebagai aplikasi yang terpasang. |
| Pilih **Artis → The Beatles → Revolver**. Dari daftar lagu, buka **For No One** dan **Tomorrow Never Knows**. | Kedua lagu punya kredit resmi Lennon–McCartney. Catatan penulis dan rujukan menjelaskan kontribusi yang berbeda. |
| Buka **Album**, pilih filter **The Beatles**, lalu cari *Revolver*. Buka albumnya dan klik **Simpan ke Koleksi**. Buka **Koleksi**, muat ulang, lalu coba hapus album. | Pencarian dan filter bisa dipakai bersama. Album tetap tersimpan setelah muat ulang dan dapat dihapus. |
| Saat masih online, buka ulang *Revolver* dan kedua lagu di aplikasi yang sudah terpasang. Aktifkan mode pesawat, matikan Wi-Fi, lalu buka lagi kedua lagu dari daftar lagu *Revolver*. | Service worker memakai respons katalog yang tersimpan. Jika data lagu belum ada di cache, aplikasi menampilkan **Halaman belum tersimpan untuk offline**. Sambungkan kembali internet dan tekan **Coba lagi**. |
| Saat online, buka langsung [Revolver](https://discora-web.vercel.app/album/revolver) dan [Tomorrow Never Knows](https://discora-web.vercel.app/lagu/tomorrow-never-knows), lalu muat ulang. | Tautan detail tetap berfungsi saat dibuka langsung dan setelah muat ulang. |
