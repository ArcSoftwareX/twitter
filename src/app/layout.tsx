import Sidebar from '@/components/Sidebar'
import './globals.css'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import RightSidebar from '@/components/RightSidebar'
import ClientSideProviders from '@/components/ClientSideProviders'

const inter = Inter({ subsets: ['latin'], variable: "--font" })

export const metadata = {
  title: 'Twitter',
  description: 'A Twitter clone',
}

const icons = localFont({
  src: '../assets/icons.woff2',
  display: 'swap',
  variable: '--icon'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${icons.variable} font-sans bg-neutral-950 text-white flex items-stretch antialiased`}>
        <ClientSideProviders>
          <Sidebar />
          {children}
          <RightSidebar />
        </ClientSideProviders>
      </body>
    </html>
  )
}
