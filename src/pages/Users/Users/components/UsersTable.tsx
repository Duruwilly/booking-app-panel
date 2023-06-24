import React, { useMemo } from 'react'
import { Paginator } from '../../../../components/Paginator'
import Spinner from '../../../../components/spinner/Spinner'
import { useUsersContext } from '../context/UsersContext'
import UsersTableData from './UsersTableData'

const UsersTable = () => {
    const { usersData, currentPage, setFetchStatus, paramId, queryState } = useUsersContext()

    const usersDataList = useMemo(() => {
        if (usersData.fetching) {
            return (
                <tr>
                    <th colSpan={8} className="text-center">
                        <Spinner />
                    </th>
                </tr>
            )
        }

        if (!usersData.fetching && usersData.responseData.length > 0) {
            return usersData?.responseData.map((users) => (
                <React.Fragment key={users._id}>
                    <UsersTableData users={users} />
                </React.Fragment>
            ))
        }

        if (!usersData.fetching && usersData.responseData.length === 0) {
            return (
                <tr>
                    <th colSpan={8} className="text-center">
                        No User Found
                    </th>
                </tr>
            )
        }
    }, [usersData])

    return (
        <>
            <table className=''>
                <thead>
                    <tr className="text-white table-header-dark">
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Country</th>
                        <th>Gender</th>
                        <th>Account Type</th>
                        <th>Mobile Nuber</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {usersDataList}
                </tbody>
            </table>
            {
                usersData?.responseData && usersData?.responseData.length > 0 ? (
                    <nav className="custom-paginator">
                        <ul>
                            <Paginator
                                currentPage={currentPage}
                                pages={usersData.pages}
                                url={"/users"}
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

export default UsersTable