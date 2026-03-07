---
name: bersihkan-error-shezzledocs
overview: Rencana mendalam untuk membersihkan error dan merapikan layout rusak di proyek Next.js App Router `portov6` tanpa mengubah gaya visual utama yang sudah ada.
todos:
  - id: inventory-errors-layout
    content: ""
    status: pending
  - id: stabilize-root-layout-globals
    content: ""
    status: pending
  - id: fix-critical-code-errors
    content: ""
    status: pending
  - id: fix-global-layout
    content: ""
    status: pending
  - id: fix-priority-pages-layout
    content: ""
    status: pending
  - id: final-qa-and-refine
    content: ""
    status: pending
isProject: false
---

## Tujuan

- **Membersihkan error** yang menghambat (TypeScript/ESLint/build/runtime) di proyek `portov6`.
- **Memperbaiki layout yang rusak** (alignment, spacing, responsivitas, break layout) sambil **mempertahankan gaya desain sekarang**.
- **Menyusun struktur perbaikan** yang mudah di-maintain untuk iterasi berikutnya.

## Konteks Teknis

- **Bahasa**: TypeScript + React.
- **Framework**: Next.js `15.3.0` dengan App Router (`app/`), Tailwind CSS v4 (via `@import "tailwindcss"` di `globals.css`).
- **Runtime target**: Browser + Next.js server (Node runtime default).
- **Tooling**: ESLint 9 + `eslint-config-next`, TypeScript 5.

## Gambaran Arsitektur Layout

- **Entry route utama**: `[app/page.tsx](C:\Users\lenov\Documents\portov6\app\page.tsx)` merender `LandingPage` dari `[app/landing/page.tsx](C:\Users\lenov\Documents\portov6\app\landing\page.tsx)` (tidak dibaca tapi diasumsikan sebagai halaman utama).
- **Root layout**: `[app/layout.tsx](C:\Users\lenov\Documents\portov6\app\layout.tsx)` mengatur font `Poppins`, metadata SEO lengkap, JSON-LD schema `Person`, dan body dengan background gelap global.
- **Global styling**: `[app/globals.css](C:\Users\lenov\Documents\portov6\app\globals.css)` menggabungkan Tailwind v4 dengan utilitas kustom untuk scrollbar, animasi, dan efek glass.
- Layout rusak kemungkinan besar berasal dari:
  - Struktur komponen di `app/landing/`, `app/components/`, `app/sections/`, dan `app/dashboard/`.
  - Perubahan Tailwind v4 vs v3 (class tertentu hilang/berubah).
  - Style global agresif (`* { font-family; scroll-behavior }`, overflow, dll.).

Diagram alur tinggi layout:

```mermaid
flowchart TD
  rootLayout[RootLayout in app/layout.tsx]
  homePage[HomePage in app/page.tsx]
  landingPage[LandingPage in app/landing/page.tsx]
  sections[Sections & Components (navbar, hero, projects, footer, dashboard, dll.)]

  rootLayout --> homePage
  homePage --> landingPage
  landingPage --> sections
```



## Strategi Umum Perbaikan

- **Fase 1 — Observasi & Inventarisasi**
  - **Jalankan dan catat error**:
    - Jalankan `bun dev`/`npm run dev` dan `npm run build` untuk mengumpulkan **build/runtime error**.
    - Jalankan `npm run lint` untuk memastikan tidak ada error lint yang terlewat (saat ini `ReadLints` tidak melaporkan error, tapi jalankan langsung untuk verifikasi).
  - **Identifikasi layout rusak** secara manual di browser:
    - Catat halaman/section yang bermasalah: misalnya bagian hero, grid project, dashboard, form, dsb.
    - Foto / capture area kritis (untuk referensi visual) jika perlu.
- **Fase 2 — Stabilkan Fondasi (Tanpa Ubah Desain)**
  - **Periksa dan rapikan `RootLayout`** (`app/layout.tsx`):
    - Pastikan tidak ada akses API browser langsung di server component.
    - Validasi konfigurasi font `Poppins` dan penggunaan `poppins.variable` di `body` class agar konsisten dengan Tailwind v4 theme (`--font-sans`).
    - Pastikan tag `<head>` tidak memuat script yang bisa memicu hydration mismatch (struktur sekarang dengan `dangerouslySetInnerHTML` untuk JSON-LD sudah standar, cukup pastikan isinya pure JSON stabil).
  - **Audit `globals.css`** untuk potensi masalah layout:
    - Review deklarasi global `* { ... }` dan `html, body { ... }` yang bisa menyebabkan overflow atau konflik dengan Tailwind (`overflow-x: hidden`, `font-family` dobel, dll.).
    - Tandai utilitas yang **seharusnya class** (misalnya `.glass`, `.gradient-text`, `.transition-smooth`) agar dipakai secara eksplisit, bukan menggantung di global.
    - Konfirmasi bahwa penggunaan Tailwind v4 (`@import "tailwindcss"; @theme inline { ... }`) sesuai dengan dokumentasi dan tidak berbenturan dengan konfigurasi di `tailwind.config` (jika ada).
- **Fase 3 — Bersihkan Error Kode yang Menghambat**
  - **TypeScript & ESLint**:
    - Buka semua file baru yang belum di-track di `git status` (`app/components/`, `app/dashboard/`, `app/sections/`, `lib/`, `types/`, dll.) dan:
      - Perbaiki import yang tidak terpakai, tipe `any` yang tidak perlu, dan error strict yang menghalangi build.
      - Pastikan pemisahan **Server Component vs Client Component**: tambahkan `'use client'` hanya pada file yang butuh hooks/DOM (`useState`, `useEffect`, event handler, animasi berbasis browser).
    - Untuk komponen yang memicu hydration error (misalnya menggunakan `window`, `document`, `localStorage`, atau library seperti `aos`/`sweetalert2`):
      - Bungkus dalam **client component** terpisah dan gunakan efek hanya di client.
  - **Integrasi library eksternal**:
    - `aos`, `framer-motion`, `react-intersection-observer`, `sweetalert2`, `typewriter-effect`:
      - Pastikan inisialisasi mereka hanya di client component dan tidak dijalankan di server.
      - Jika ada error dynamic import, pertimbangkan `next/dynamic` untuk komponen berat atau jarang dipakai.
- **Fase 4 — Perbaikan Layout Global**
  - **Navbar & Footer** (`app/components/` atau `app/landing/...`):
    - Pastikan struktur flex/grid konsisten (misalnya `flex items-center justify-between` untuk navbar, `container mx-auto px-...` untuk lebar konten).
    - Periksa breakpoint Tailwind (`sm:`, `md:`, `lg:`, `xl:`) agar menu tidak pecah di mobile atau layar besar.
  - **Container & Spacing**:
    - Standarkan wrapper section:
      - Container lebar maksimum (misalnya `max-w-6xl` atau `max-w-7xl`) dengan `mx-auto`.
      - Padding horizontal konsisten (`px-4 md:px-6 lg:px-8`) dan vertical (`py-12 md:py-16 lg:py-20`).
    - Hapus style inline yang bentrok dengan Tailwind jika ada, dan pindahkan ke class utilitas atau ke Tailwind theme.
  - **Scroll & Overflow**:
    - Validasi bahwa penggunaan `overflow-x-hidden` tidak memotong elemen seperti efek blur/gradient di luar viewport.
    - Sesuaikan jika ada section yang perlu scroll horizontal terkontrol.
- **Fase 5 — Perbaikan Layout Halaman Prioritas**
  - **Landing/Marketing** (`app/landing/page.tsx` + `app/sections/`):
    - Hero section: pastikan alignment teks, gambar, dan CTA tidak overlap di resolusi tertentu.
    - Section portofolio/projects: pastikan grid responsif (misalnya `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) dan card tidak patah.
    - Test di beberapa viewport utama: 320px (small mobile), 768px (tablet), 1024–1440px (desktop).
  - **Halaman lain (dashboard, project detail, dll.)**:
    - Dashboard: periksa layout panel (sidebar, content area, widget) agar tidak saling tumpang tindih di mobile.
    - Project detail: fokus pada readability (line-height, max-width teks, spacing antar komponen).
- **Fase 6 — Hardening & QA**
  - **Cross-browser & device check**:
    - Test di Chrome & Edge minimal.
    - Uji scroll, animasi, dan AOS/Framer di beberapa device/resolution.
  - **Accessibility dasar**:
    - Pastikan tombol dan link punya `:focus-visible` yang jelas (sudah dibantu oleh `globals.css`).
    - Cek kontras teks vs background pada elemen utama.
  - **Perf & bundle** (tingkat dasar):
    - Pastikan tidak ada import besar yang tidak dipakai di halaman utama.
    - Pertimbangkan `next/dynamic` untuk bagian berat (misalnya grafik dashboard) jika menghambat TTFB/CLS.

## Struktur Task Detail (Implementasi)

- **Task 1 — Inventarisasi Error & Layout Rusak**
  - Jalankan `npm run dev`, `npm run build`, dan `npm run lint`, lalu catat semua error dan warning yang benar-benar menghambat.
  - Buat daftar halaman/section yang layout-nya rusak (nama file, gejala, resolusi yang bermasalah).
- **Task 2 — Stabilkan Fondasi Global**
  - Review `app/layout.tsx` dan pastikan:
    - Tidak ada penggunaan API browser di server component.
    - Metadata dan JSON-LD rapi dan stabil.
  - Review `app/globals.css`:
    - Minimalkan style global yang bisa bentrok dengan layout.
    - Pastikan utilitas seperti `.glass`, `.gradient-text`, `.transition-smooth` digunakan secara konsisten di komponen, bukan duplikat style inline.
- **Task 3 — Bersihkan Error Kode Kritis**
  - Iterasi ke semua file di `app/components/`, `app/sections/`, `app/dashboard/`, `app/project/`, `lib/`, dan `types/`:
    - Perbaiki import/tipe yang rusak.
    - Pisahkan client/server components sesuai kebutuhan.
    - Pastikan integrasi library pihak ketiga hanya berjalan di client.
- **Task 4 — Rapikan Layout Global (Navbar, Footer, Container)**
  - Konsolidasikan pattern layout (container, grid, flex) di komponen layout global.
  - Pastikan responsivitas global konsisten antar halaman.
- **Task 5 — Rapikan Layout Halaman Prioritas**
  - Fokus pada halaman yang menurut Anda paling rusak (Anda sudah memilih opsi "Other" untuk target layout, jadi kita akan menyesuaikan setelah Anda menyebutkan halaman/section spesifik di chat berikutnya).
  - Sesuaikan grid, typografi, dan spacing tanpa mengubah overall look & feel.
- **Task 6 — QA Akhir & Refactor Kecil**
  - Jalankan kembali semua script (`dev`, `build`, `lint`).
  - Lakukan pass terakhir untuk menghapus duplikasi kecil, menamai ulang variabel/komponen yang kurang deskriptif, dan memastikan struktur folder tetap rapi.

## Catatan Tambahan

- **Desain**: Anda memilih untuk **mempertahankan gaya visual sekarang**, jadi setiap perubahan CSS/Tailwind akan difokuskan pada **perbaikan struktur layout**, bukan mengganti tema.
- **Testing**: Untuk logika non-trivial (misalnya helper di `lib/` atau hooks kustom), kita dapat menambahkan contoh unit test (Jest/Testing Library) di langkah lanjutan jika diperlukan, tapi tahap awal akan fokus pada stabilitas build & layout.
- **Risiko utama**: Perubahan global di `globals.css` atau di struktur layout root bisa berdampak ke banyak halaman; karena itu perubahan di area ini akan dilakukan kecil, bertahap, sambil terus diuji di browser.

