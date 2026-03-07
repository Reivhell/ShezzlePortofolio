import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#030014',
}

export const metadata: Metadata = {
  title: 'Shezzle | My Portfolio',
  description: 'Website resmi Ahmad David Alvees, Fullstack Developer. Saya berfokus pada penciptaan pengalaman digital yang menarik dan selalu berupaya memberikan solusi terbaik dalam setiap proyek yang saya kerjakan.',
  keywords: 'Ahmad David Alvees, Fullstack Developer, Fullstack Developer, Fullstack Developer, Fullstack Developer',
  authors: [{ name: 'Ahmad David Alvees' }],
  creator: 'Ahmad David Alvees',
  metadataBase: new URL('https://shezzle.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://shezzle.com/',
    title: 'Ahmad David Alvees | Fullstack Developer',
    description: 'Website resmi dan portofolio Ahmad David Alvees, Fullstack Developer.',
    images: [
      {
        url: '/Meta.png',
        width: 1200,
        height: 630,
        alt: 'Ahmad David Alvees Portfolio',
      },
    ],
    locale: 'id_ID',
    siteName: 'Ahmad David Alvees Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmad David Alvees | Fullstack Developer',
    description: 'Website resmi dan portofolio Ahmad David Alvees.',
    images: ['/Meta.png'],
    creator: '@shezzle',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/Photo.jpg',
    shortcut: '/Photo.jpg',
    apple: '/Photo.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Ahmad David Alvees',
              url: 'https://shezzle.com',
              image: 'https://shezzle.com/Photo.jpg',
              jobTitle: 'Fullstack & Mobile Developer',
              description:
                'Saya berfokus pada penciptaan pengalaman digital yang menarik dan selIalu berupaya memberikan solusi terbaik dalam setiap proyek yang saya kerjakan.',
              sameAs: [
                'https://www.linkedin.com/in/shezzle/',
                'https://www.instagram.com/shezzle',
                'https://github.com/Reivhell',
                'https://www.tiktok.com/@sheznael',
              ],
            }),
          }}
        />
      </head>
      <body className={`${poppins.variable} font-sans antialiased bg-[#030014] text-white`}>
        {children}
      </body>
    </html>
  )
}
