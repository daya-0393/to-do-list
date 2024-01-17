'use client'

import { Quicksand } from 'next/font/google'
import './globals.css'
import { AuthContextProvider } from './context/AuthContext'

const quicksand = Quicksand({
   subsets: ['latin'],
   weight: ['300','400'] 
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>To Do List</title>
      </head>
      <body className={quicksand.className}>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
