import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Button from '../../../../components/button/Button'
import { BASE_URL } from '../../../../constant/base-urls';
import { CountryType, getCountries } from '../../../../utils/getContries';
import { useUsersContext } from '../../Users/context/UsersContext'

const EditUserForm = () => {
    const [countries, setCountries] = useState<CountryType[]>([]);
    useEffect(() => {
        getCountries().then((data: CountryType[]) => {
            setCountries(data);
        });
    }, []);

    const { usersSelectedRow, setUsersSelectedRow, toggleEditUserModal, initializeState } = useUsersContext()

    const user_id = localStorage.getItem("user_id")
    const token = localStorage.getItem("token")

    // const [users, setUsers] = useState({
    //     fullname: "",
    //     email: "",
    //     mobileNumber: "",
    //     country: "",
    //     role: "",
    //     gender: "",
    //     password: ""
    // })

    // useEffect(() => {
    //     setUsers({
    //         fullname: usersSelectedRow?.fullname || "",
    //         email: usersSelectedRow?.email || "",
    //         mobileNumber: usersSelectedRow?.mobileNumber || "",
    //         country: usersSelectedRow?.country || "",
    //         role: usersSelectedRow?.role || "",
    //         gender: usersSelectedRow?.gender || "",
    //         password: ""
    //     })
    // }, [usersSelectedRow])

    const updateProfile = async (e: any) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                `${BASE_URL}/admin-users/${usersSelectedRow._id}`,
                usersSelectedRow,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (res.data.status === "success") {
                toast.success(res.data.msg);
                initializeState()
                toggleEditUserModal()
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            toggleEditUserModal()
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="bg-white w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 relative shadow-md">
                <FaTimes
                    onClick={() => toggleEditUserModal()}
                    className="text-whit absolute top-4 right-4 text-2xl cursor-pointer"
                />
                <div className='mt- py-8'>
                    <form className="py- px-8" onSubmit={updateProfile}>
                        <div className="border-b border-gray-300 mb-4 pb-2">
                            <h1 className='text-xl text-gray-500'>Edit user</h1>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="" className="form-label">Full Name</label>
                                    <input type="text" className="form-input" name='fullname' onChange={(e) => {
                                        setUsersSelectedRow((state) => ({
                                            ...state, fullname: e.target.value
                                        }))
                                    }} value={usersSelectedRow.fullname} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="" className="form-label">Email Address</label>
                                    <input type="text" name='email' className="form-input" onChange={(e) => {
                                        setUsersSelectedRow((state) => ({
                                            ...state, email: e.target.value
                                        }))
                                    }} value={usersSelectedRow.email} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="" className="form-label">Mobile Number</label>
                                    <input type="tel" name='mobileNumber' className="form-input" onChange={(e) => {
                                        setUsersSelectedRow((state) => ({
                                            ...state, mobileNumber: e.target.value
                                        }))
                                    }} value={usersSelectedRow.mobileNumber} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="" className="form-label">Country</label>
                                    <select
                                        name="country"
                                        id="country"
                                        required
                                        className="form-input text-sm"
                                        onChange={(e) => {
                                            setUsersSelectedRow((state) => ({
                                                ...state, country: e.target.value
                                            }))
                                        }} value={usersSelectedRow.country}
                                    >
                                        <option value="">Select Country</option>
                                        {countries?.map((country, index) => (
                                            <option value={country?.name} key={index}>
                                                {country?.name}
                                            </option>
                                        ))}
                                    </select>
                                    {/* <input type="text" name='country' className="form-input" onChange={(e) => {
                                    setUsersSelectedRow((state) => ({
                                        ...state, country: e.target.value
                                    }))
                                }} value={usersSelectedRow.country} /> */}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="" className="form-label">Role</label>
                                    <input type="text" name='role' className="form-input" onChange={(e) => {
                                        setUsersSelectedRow((state) => ({
                                            ...state, role: e.target.value
                                        }))
                                    }} value={usersSelectedRow.role} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="" className="form-label">Gender</label>
                                    <select name="gender" className='form-input' onChange={(e) => {
                                        setUsersSelectedRow((state) => ({
                                            ...state, gender: e.target.value
                                        }))
                                    }} value={usersSelectedRow.gender}>
                                        <option value="">Select gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="" className="form-label">Password</label>
                                    <input type="text" name='password' className="form-input" onChange={(e) => {
                                        setUsersSelectedRow((state) => ({
                                            ...state, password: e.target.value
                                        }))
                                    }} value={usersSelectedRow.password} />
                                </div>
                            </div>
                        </div>
                        <div className='col-md-2'>
                            <div className="mb-3">
                                <Button text="Submit" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditUserForm