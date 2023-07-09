import React from 'react'
import Button from '../../../../components/button/Button';
import { useBookingsContext } from '../context/BookingsContext';

const FilterForm = () => {
    const { paramId, setBookingsFormState, submitBookingsFilter, bookingsFormState } = useBookingsContext()
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            submitBookingsFilter();
        }}>
            <div className="row mb-3">
                <div className="col-md-2">
                    <div className="mb-3">
                        <label className='form-label'>Booking Number</label>
                        <input
                            name="bookingNumber"
                            className="form-input"
                            placeholder="Booking Number"
                            type="text"
                            onChange={(e) => {
                                setBookingsFormState((state) => ({
                                    ...state,
                                    bookingNumber: e.target.value,
                                }));
                            }}
                            value={bookingsFormState.bookingNumber}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <label>&nbsp;</label>
                    <div className="mb-3">
                        <Button text="Search" />
                    </div>
                </div>
            </div>
        </form >
    )
}

export default FilterForm