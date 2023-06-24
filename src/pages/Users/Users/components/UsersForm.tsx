import React, { useEffect, useState } from 'react'
import Button from '../../../../components/button/Button'
import { CountryType, getCountries } from '../../../../utils/getContries'
import { useUsersContext } from '../context/UsersContext'

const UsersForm = () => {
    const { submitUsersFilter, usersFormState, setUsersFormState, paramId } = useUsersContext()

    const [countries, setCountries] = useState<CountryType[]>([]);
    useEffect(() => {
        getCountries().then((data: CountryType[]) => {
            setCountries(data);
        });
    }, []);

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            submitUsersFilter();
        }}>
            <div className="row mb-3">
                <div className="col-md-2">
                    <div className="mb-3">
                        <label className='form-label'>Full Name</label>
                        <input
                            name="fullname"
                            className="form-input"
                            placeholder="Full name"
                            type="text"
                            onChange={(e) => {
                                setUsersFormState((state) => ({
                                    ...state,
                                    fullname: e.target.value,
                                }));
                            }}
                            value={usersFormState.fullname}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="mb-3">
                        <label className='form-label'>Email</label>
                        <input
                            name="email"
                            className="form-input"
                            placeholder="Email"
                            type="text"
                            onChange={(e) => {
                                setUsersFormState((state) => ({
                                    ...state,
                                    email: e.target.value,
                                }));
                            }}
                            value={usersFormState.email}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="mb-3">
                        <label className='form-label'>Country</label>
                        <select name="country"
                            className="form-input"
                            placeholder="Country"
                            onChange={(e) => {
                                setUsersFormState((state) => ({
                                    ...state,
                                    country: e.target.value,
                                }));
                            }}
                            value={usersFormState.country}>
                            <option value="">Select coutry</option>
                            {countries.map((country, index) => (
                                <option value={country.name} key={index}>{country.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {!paramId && <div className="col-md-2">
                    <div className="mb-3">
                        <label className='form-label'>Account Type</label>
                        <select name="role"
                            className="form-input"
                            onChange={(e) => {
                                setUsersFormState((state) => ({
                                    ...state,
                                    role: e.target.value,
                                }));
                            }}
                            value={usersFormState.role}>
                            <option value="">Select user type</option>
                            <option value="merchant">Merchant</option>
                            <option value="regular">Regular</option>
                        </select>
                    </div>
                </div>}
                <div className="col-md-2">
                    <label className='form-label'>&nbsp;</label>
                    <div className="mb-3">
                        <Button text="Search" />
                    </div>
                </div>
            </div>
        </form >
    )
}

export default UsersForm