import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Lora, Montserrat, Playfair_Display } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-playfair', display: 'swap' })
const lora = Lora({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-lora', display: 'swap' })
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-montserrat', display: 'swap' })

const description =
  'Perfumería de nicho y perfumería para el hogar creadas en Argentina por dos miradas que encontraron en la perfumería un lenguaje común.'

export const metadata: Metadata = {
  title: 'ELEMENTOS — Universo Olfativo',
  description,
  openGraph: {
    title: 'ELEMENTOS — Universo Olfativo',
    description,
    locale: 'es_AR',
    type: 'website',
    images: [{ url: '/img/divino-tesoro.jpg', alt: 'Perfume Divino Tesoro de ELEMENTOS' }],
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#f5f2ed',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-AR" className={`${playfair.variable} ${lora.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
