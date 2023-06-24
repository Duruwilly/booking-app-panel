import React, { useMemo } from 'react'
import { Paginator } from '../../../components/Paginator'
import Spinner from '../../../components/spinner/Spinner'
import { useHotelsContext } from '../context/HotelsContext'
import TableData from './TableData'

const HotelsTable = () => {
    const { hotelsData, currentPage, setFetchStatus, queryState, paramId } = useHotelsContext()

    const transactionsDataList = useMemo(() => {
        if (hotelsData.fetching) {
            return (
                <tr>
                    <th colSpan={5} className="text-center">
                        <Spinner />
                    </th>
                </tr>
            )
        }

        if (!hotelsData.fetching && hotelsData.responseData.length > 0) {
            return hotelsData?.responseData.map((hotels) => (
                <React.Fragment key={hotels._id}>
                    <TableData hotel={hotels} />
                </React.Fragment>
            ))
        }

        if (!hotelsData.fetching && hotelsData.responseData.length === 0) {
            return (
                <tr>
                    <th colSpan={5} className="text-center">
                        No Record Found
                    </th>
                </tr>
            )
        }
    }, [hotelsData])

    return (
        <>
            <table className=''>
                <thead>
                    <tr className="text-white table-header-dark">
                        <th>Hotel Name</th>
                        <th>Destination</th>
                        <th>Price</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {transactionsDataList}
                </tbody>
            </table>
            {
                hotelsData?.responseData && hotelsData?.responseData.length > 0 ? (
                    <nav className="custom-paginator">
                        <ul>
                            <Paginator
                                currentPage={currentPage}
                                pages={hotelsData.pages}
                                url={"/hotels"}
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

export default HotelsTable