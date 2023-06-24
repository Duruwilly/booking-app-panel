import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Button from '../../../../components/button/Button'
import { BASE_URL } from '../../../../constant/base-urls';
import { CountryType, getCountries } from '../../../../utils/getContries';

interface createUserType {
    fullname: string;
    email: string;
    mobileNumber: string;
    country: string;
    role: string;
    gender: string;
    password: string
}


const CreateUserForm = () => {
    const token = localStorage.getItem("token")
    const [countries, setCountries] = useState<CountryType[]>([]);
    useEffect(() => {
        getCountries().then((data: CountryType[]) => {
            setCountries(data);
        });
    }, []);

    // const { createUserForm, setCreateUserForm } = useCreateUserContext()
    const createUserFormSchema: createUserType = {
        fullname: "",
        email: "",
        mobileNumber: "",
        country: "",
        role: "",
        gender: "",
        password: ""
    }

    const [createUserForm, setCreateUserForm] = useState(createUserFormSchema)

    const clearState = () => {
        setCreateUserForm((state) => ({
            ...state, ...createUserFormSchema
        }))
    }

    const createUser = async (e: any) => {
        e.preventDefault();
        const url = `${BASE_URL}/admin/auth/create`
        try {
            let res = await axios.post(url, createUserForm, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.status === "success") {
                toast.success(res.data.message)
                clearState()
            }
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className='widget-box-shado'>
            <div className="top widget-box-shado border-b pb-4 fle">
                <h1 className='text-xl font-semibol text-gray-500'>Add new user</h1>
            </div>
            <div className='mt- py-8'>
                <form onSubmit={createUser}>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Full Name</label>
                                <input type="text" className="form-input" name='fullname' onChange={(e) => {
                                    setCreateUserForm((state) => ({
                                        ...state, fullname: e.target.value
                                    }))
                                }} value={createUserForm.fullname} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Email Address</label>
                                <input type="text" name='email' className="form-input" onChange={(e) => {
                                    setCreateUserForm((state) => ({
                                        ...state, email: e.target.value
                                    }))
                                }} value={createUserForm.email} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Mobile Number</label>
                                <input type="tel" name='mobileNumber' className="form-input" onChange={(e) => {
                                    setCreateUserForm((state) => ({
                                        ...state, mobileNumber: e.target.value
                                    }))
                                }} value={createUserForm.mobileNumber} />
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
                                        setCreateUserForm((state) => ({
                                            ...state, country: e.target.value
                                        }))
                                    }} value={createUserForm.country}
                                >
                                    <option value="">Select Country</option>
                                    {countries?.map((country, index) => (
                                        <option value={country?.name} key={index}>
                                            {country?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Role</label>
                                <input type="text" name='role' className="form-input" onChange={(e) => {
                                    setCreateUserForm((state) => ({
                                        ...state, role: e.target.value
                                    }))
                                }} value={createUserForm.role} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Gender</label>
                                <select name="gender" className='form-input' onChange={(e) => {
                                    setCreateUserForm((state) => ({
                                        ...state, gender: e.target.value
                                    }))
                                }} value={createUserForm.gender}>
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
                                    setCreateUserForm((state) => ({
                                        ...state, password: e.target.value
                                    }))
                                }} value={createUserForm.password} />
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
    )
}

export default CreateUserForm