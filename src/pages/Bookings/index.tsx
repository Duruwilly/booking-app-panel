import React from 'react'
import BookingsPage from './BookingsPage'
import BookingsProvider from './context/BookingsContext'

const index = () => {
  return (
    <BookingsProvider>
      <BookingsPage />
    </BookingsProvider>
  )
}

export default index