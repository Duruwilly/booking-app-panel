import React from 'react'
import TransactionsProvider from './context/TransactionsContext'
import TransactionsPage from './TransactionsPage'

const index = () => {
    return (
        <TransactionsProvider>
            <TransactionsPage />
        </TransactionsProvider>
    )
}

export default index