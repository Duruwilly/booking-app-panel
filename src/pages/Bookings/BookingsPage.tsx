import React, { useEffect } from 'react'
import { useTitle } from '../../hooks/useTitle';
import BookingsTable from './components/BookingsTable';
import FilterForm from './components/FilterForm';
import { useBookingsContext } from './context/BookingsContext';

const BookingsPage = () => {
  useTitle("View bookings | willTrip")
  const { initializeState, clearState, paramId, fetchStatus, setFetchStatus } = useBookingsContext()

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
      <div className="px-8 pt-5 overflow-x-auto">
        <div className="container-fluid">
          <div className='row'>
            <div className='col'>
              <div className='card'>
                <div className='card-body'>
                  <FilterForm />
                  <div className="table-responsive">
                    <BookingsTable />
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

export default BookingsPage