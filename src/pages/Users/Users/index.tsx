import React from 'react'
import UsersProvider from './context/UsersContext'
import UsersPage from './UsersPage'

const UsersIndex = () => {
    return (
        <UsersProvider>
            <UsersPage />
        </UsersProvider>
    )
}

export default UsersIndex