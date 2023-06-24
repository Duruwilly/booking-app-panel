import React from 'react'
import Button from '../../../components/button/Button';
import { useTransactionsContext } from '../context/TransactionsContext';

const FilterForm = () => {
    const { paramId, setTransactionsFormState, submitTransactionsFilter, transactionsFormState } = useTransactionsContext()
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            submitTransactionsFilter();
        }}>
            <div className="row mb-3">
                <div className="col-md-2">
                    <label className='form-label'>First Number</label>
                    <div className="mb-3">
                        <input
                            name="firstName"
                            className="form-input"
                            placeholder="First name"
                            type="text"
                            onChange={(e) => {
                                setTransactionsFormState((state) => ({
                                    ...state,
                                    firstName: e.target.value,
                                }));
                            }}
                            value={transactionsFormState.firstName}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <label className='form-label'>Last Name</label>
                    <div className="mb-3">
                        <input
                            name="lastName"
                            className="form-input"
                            placeholder="Last name"
                            type="text"
                            onChange={(e) => {
                                setTransactionsFormState((state) => ({
                                    ...state,
                                    lastName: e.target.value,
                                }));
                            }}
                            value={transactionsFormState.lastName}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <label className='form-label'>Email</label>
                    <div className="mb-3">
                        <input
                            name="email"
                            className="form-input"
                            placeholder="Email"
                            type="text"
                            onChange={(e) => {
                                setTransactionsFormState((state) => ({
                                    ...state,
                                    email: e.target.value,
                                }));
                            }}
                            value={transactionsFormState.email}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="mb-3">
                        <label className='form-label'>Transaction ID</label>
                        <input
                            name="transaction_id"
                            className="form-input"
                            placeholder="Transaction ID"
                            type="text"
                            onChange={(e) => {
                                setTransactionsFormState((state) => ({
                                    ...state,
                                    transaction_id: e.target.value,
                                }));
                            }}
                            value={transactionsFormState.transaction_id}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="mb-3">
                        <label className='form-label'>Reference ID</label>
                        <input
                            name="reference_id"
                            className="form-input"
                            placeholder="Reference ID"
                            type="text"
                            onChange={(e) => {
                                setTransactionsFormState((state) => ({
                                    ...state,
                                    reference_id: e.target.value,
                                }));
                            }}
                            value={transactionsFormState.reference_id}
                        />
                    </div>
                </div>
                {!paramId && <div className="col-md-2">
                    <div className="mb-3">
                        <label className='form-label'>Status</label>
                        <select name="status"
                            className="form-input"
                            placeholder="Status"
                            onChange={(e) => {
                                setTransactionsFormState((state) => ({
                                    ...state,
                                    status: e.target.value,
                                }));
                            }}
                            value={transactionsFormState.status} id="">
                            <option value="">Select status</option>
                            <option value="failed">Failed</option>
                            <option value="successful">Successful</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="pending">Pending</option>
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

export default FilterForm