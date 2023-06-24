import React from 'react'
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../sidebar/Sidebar'

const Layout = (props: any) => {
    return (
        <>
            <div className='flex w-full'>
                <Sidebar />
                <div className='' style={{flex: "1 1 auto", width: "80%"}}>
                    <Navbar />
                    {props.children}
                </div>
            </div>
        </>
    )
}

export default Layout