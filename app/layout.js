'use client'

import { Quicksand } from 'next/font/google'
import { AuthContextProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeProvider'
import './styles.scss'

const quicksand = Quicksand({
   subsets: ['latin'],
   weight: ['300','400'] 
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>To Do List</title>
        <meta name="description" content="Application in which you can write down all the pending tasks of the day."/>
      </head>
      <body className={quicksand.className}>
        <AuthContextProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
