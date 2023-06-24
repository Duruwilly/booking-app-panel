import React from 'react'
import HotelsProvider from './context/HotelsContext'
import HotelsPage from './HotelsPage'

const index = () => {
    return (
        <HotelsProvider>
            <HotelsPage />
        </HotelsProvider>
    )
}

export default index