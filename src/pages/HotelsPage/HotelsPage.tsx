import React, { useEffect } from 'react'
import { useTitle } from '../../hooks/useTitle'
import FilterForm from './components/FilterForm'
import HotelsTable from './components/HotelsTable'
import { useHotelsContext } from './context/HotelsContext'

const HotelsPage = () => {
    useTitle("View hotels | willTrip")
    const { initializeState, clearState, paramId, fetchStatus, setFetchStatus } = useHotelsContext()

    useEffect(() => {
        initializeState();

        return () => {
            clearState();
        };
    }, [paramId, fetchStatus]);

    useEffect(() => {
        window.onpopstate = () => {
            setFetchStatus("idle");
        };
    }, []);

    return (
        <>
            <div className="px-8 pt-5 h-scree overflow-y-aut overflow-x-auto">
                <div className="container-fluid">
                    <div className='row'>
                        <div className='col'>
                            <div className='card'>
                                <div className='card-body'>
                                    <FilterForm />
                                    <div className="table-responsive">
                                        <HotelsTable />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HotelsPage