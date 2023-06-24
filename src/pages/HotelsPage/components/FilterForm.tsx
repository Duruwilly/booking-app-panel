import React from 'react'
import Button from '../../../components/button/Button';
import { useHotelsContext } from '../context/HotelsContext';

function FilterForm() {
    const { paramId, setHotelsFormState, submitHotelsFilter, hotelsFormState } = useHotelsContext()

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            submitHotelsFilter();
        }}>
            <div className="row mb-3">
                <div className="col-md-2">
                    <div className="mb-3">
                        <label className='form-label'>Hotel Name</label>
                        <input
                            name="name"
                            className="form-input"
                            placeholder="Hotel Name"
                            type="text"
                            onChange={(e) => {
                                setHotelsFormState((state) => ({
                                    ...state,
                                    name: e.target.value,
                                }));
                            }}
                            value={hotelsFormState.name}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="mb-3">
                        <label className='form-label'>Hotel Destination</label>
                        <input
                            name="name"
                            className="form-input"
                            placeholder="Hotel Destination"
                            type="text"
                            onChange={(e) => {
                                setHotelsFormState((state) => ({
                                    ...state,
                                    destination: e.target.value,
                                }));
                            }}
                            value={hotelsFormState.destination}
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