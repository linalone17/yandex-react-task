'use client';

import './globals.scss';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Provider } from 'react-redux';

import { store } from '@/store/store';

const inter = Inter({ subsets: ['cyrillic', 'latin'] })

export const metadata = {
  title: 'Билетопоиск',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Navbar/>
            <main>
              {children}
            </main>
          <Footer/>
        </Provider>
      </body>
    </html>
  )
}