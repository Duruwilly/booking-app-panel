import React, { useEffect } from 'react'
import UsersTable from './components/UsersTable';
import UsersForm from './components/UsersForm';
import { useUsersContext } from './context/UsersContext';
import Modal from '../../../components/modal/Modal';
import EditUserForm from '../EditUser/components/EditUserForm';
import { useTitle } from '../../../hooks/useTitle';

const UsersPage = () => {
  useTitle("View users | willTrip")
  const { initializeState, clearState, paramId, fetchStatus, setFetchStatus, editUserModal } = useUsersContext()

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
      <div className="px-8 pt-5">
        <div className="container-fluid">
          <div className='row'>
            <div className='col'>
              <div className='card'>
                <div className='card-body'>
                  <UsersForm />
                  <div className="table-responsive">
                    <UsersTable />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        editUserModal && (
          <Modal>
            <EditUserForm />
          </Modal>
        )
      }
    </>
  )
}

export default UsersPage