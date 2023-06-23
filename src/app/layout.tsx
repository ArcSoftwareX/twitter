import Sidebar from '@/components/Sidebar'
import './globals.css'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import RightSidebar from '@/components/RightSidebar'
// import ModalxProvider from '@/lib/modalx/ModalRenderer'
// import { modals } from '@/lib/modals'

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
        {/* <ModalxProvider modals={modals}> */}
          <Sidebar />
          {children}
          <RightSidebar />
        {/* </ModalxProvider> */}
      </body>
    </html>
  )
}
