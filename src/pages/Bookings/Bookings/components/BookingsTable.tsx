import React, { useMemo } from 'react'
import { Paginator } from '../../../../components/Paginator'
import Spinner from '../../../../components/spinner/Spinner'
import { useBookingsContext } from '../context/BookingsContext'
import TableData from './TableData'


const BookingsTable = () => {
    const { bookingsData, currentPage, setFetchStatus, queryState, paramId } = useBookingsContext()

    const transactionsDataList = useMemo(() => {
        if (bookingsData.fetching) {
            return (
                <tr>
                    <th colSpan={8} className="text-center">
                        <Spinner />
                    </th>
                </tr>
            )
        }

        if (!bookingsData.fetching && bookingsData.responseData.length > 0) {
            return bookingsData?.responseData.map((bookings) => (
                <React.Fragment key={bookings._id}>
                    <TableData bookings={bookings} />
                </React.Fragment>
            ))
        }

        if (!bookingsData.fetching && bookingsData.responseData.length === 0) {
            return (
                <tr>
                    <th colSpan={9} className="text-center">
                        No Record Found
                    </th>
                </tr>
            )
        }
    }, [bookingsData])

    return (
        <>
            <table className=''>
                <thead>
                    <tr className="text-white table-header-dark">
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Booking Number</th>
                        <th>Status</th>
                        <th>Room Number</th>
                        <th>Room Title</th>
                        <th>Hotel Name</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {transactionsDataList}
                </tbody>
            </table>
            {
                bookingsData?.responseData && bookingsData?.responseData.length > 0 ? (
                    <nav className="custom-paginator">
                        <ul>
                            <Paginator
                                currentPage={currentPage}
                                pages={bookingsData.pages}
                                url={"/bookings"}
                                query={queryState.query}
                                setFetchStatus={setFetchStatus}
                                paramId={paramId}
                            />
                        </ul>
                    </nav>
                ) : null
            }
        </>
    )
}

export default BookingsTable