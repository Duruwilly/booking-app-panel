import React, { useMemo } from 'react'
import { Paginator } from '../../../components/Paginator'
import Spinner from '../../../components/spinner/Spinner'
import { useTransactionsContext } from '../context/TransactionsContext'
import TableData from './TableData'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TransactionsTable = () => {
    const { transactionsData, currentPage, setFetchStatus, queryState, paramId } = useTransactionsContext()

    const transactionsDataList = useMemo(() => {
        if (transactionsData.fetching) {
            return (
                <tr>
                    <th colSpan={7} className="text-center">
                        <Spinner />
                    </th>
                </tr>
            )
        }

        if (!transactionsData.fetching && transactionsData.responseData.length > 0) {
            return transactionsData?.responseData.map((transactions) => (
                <React.Fragment key={transactions._id}>
                    <TableData transactions={transactions} />
                </React.Fragment>
            ))
        }

        if (!transactionsData.fetching && transactionsData.responseData.length === 0) {
            return (
                <tr>
                    <th colSpan={7} className="text-center">
                        No Record Found
                    </th>
                </tr>
            )
        }
    }, [transactionsData])

    return (
        <>
            {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
        </Table>
        </TableContainer> */}
            <table className=''>
                <thead>
                    <tr className="text-white table-header-dark">
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Amount Paid</th>
                        <th>Transaction ID</th>
                        <th>Reference ID</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>

                    {transactionsDataList}
                </tbody>
            </table>
            {
                transactionsData?.responseData && transactionsData?.responseData.length > 0 ? (
                    <nav className="custom-paginator">
                        <ul>
                            <Paginator
                                currentPage={currentPage}
                                pages={transactionsData.pages}
                                url={"/transactions"}
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

export default TransactionsTable