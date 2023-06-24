import axios from 'axios'
import { format } from 'date-fns'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../../../constant/base-urls'
import { useUsersContext } from '../context/UsersContext'

const UsersTableData = ({ users }: any) => {
    const { initializeState, paramId, setUsersSelectedRow, toggleEditUserModal } = useUsersContext()
    const navigate = useNavigate()

    const deleteUser = async (userId: string) => {
        if (paramId === "admin-users") {
            const url = `${BASE_URL}/admin-users/${userId}`
            if (window.confirm("Are you sure you want to proceed?")) {
                try {
                    let res = await axios.delete(url)
                    if (res?.data.status === "success") {
                        initializeState()
                        toast.success(res?.data.msg)
                    }
                } catch (error: any) {
                    toast.error(error.response?.data.message)
                }
            }
        } else {
            const url = `${BASE_URL}/users/${userId}`
            if (window.confirm("Are you sure you want to proceed?")) {
                try {
                    let res = await axios.delete(url)
                    if (res?.data.status === "success") {
                        initializeState()
                        toast.success(res?.data.msg)
                    }
                } catch (error: any) {
                    toast.error(error.response?.data.message)
                }
            }
        }
    }

    return (
        <tr className='font-light'>
            <td className='capitalize'>
                {users.fullname}
            </td>
            <td className=''>
                {users.email}
            </td>
            <td className='capitalize'>
                {users.country}
            </td>
            <td className='capitalize'>
                {users.gender ?? "-"}
            </td>
            <td className='capitalize'>
                {users.role}
            </td>
            <td className='capitalize'>
                {users.mobileNumber}
            </td>
            <td className='capitalize'>
                {format(new Date(users?.createdAt), "MM-dd-yyyy, hh:mm a")}
            </td>
            <td>
                <button className='btn bg-primar table-header-dark py-1 px-4 bg-opacity-10 mx-2' onClick={() => deleteUser(users._id)}>delete</button>
                {paramId === "admin-users" && <button className='btn bg-primar table-header-dark py-1 px-4 bg-opacity-10 mx-2' onClick={() => {
                    setUsersSelectedRow(users);
                    toggleEditUserModal();
                }}>edit</button>}
            </td>
        </tr>
    )
}

export default UsersTableData