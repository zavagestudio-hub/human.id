import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HumanID — Perfil médico de emergencia',
  description: 'Tu información médica vital siempre disponible con un código QR. Sin app, sin registro.',
  keywords: ['emergencia', 'médico', 'QR', 'salud', 'identidad', 'human-id'],
  metadataBase: new URL('https://human-id.app'),
  openGraph: {
    title: 'HumanID — Perfil médico de emergencia',
    description: 'Escanea el QR para ver información médica vital.',
    url: 'https://human-id.app',
    siteName: 'HumanID',
    locale: 'es_MX',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
