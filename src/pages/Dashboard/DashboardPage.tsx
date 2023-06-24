import React, { useEffect } from 'react'
import { useTitle } from '../../hooks/useTitle'
// import { useTransactionsContext } from '../Transactions/context/TransactionsContext'
import Featured from './component/Featured'
import RecentBookings from './component/RecentBookings'
import Widget from './component/Widget'


const DashboardPage = () => {
    useTitle("Dashboard | willTrip")
    
    return (
        <div>
            <Widget />
            <div className='flex gap-5 px-5 py-3'>
                <div className='' style={{flex: "0 0 auto", width: "24%"}} >
                    <Featured />
                </div>
                <div className='w-ful overflow-x-auto' style={{flex: "1 1 auto", width: "76%"}} >
                    <RecentBookings />
                </div>
            </div>
        </div>
    )
}

export default DashboardPage