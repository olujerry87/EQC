import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Excellent Quality Care',
  description: 'Premium home care and facility staffing solutions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
