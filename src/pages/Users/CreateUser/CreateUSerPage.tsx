import React from 'react'
import { useTitle } from '../../../hooks/useTitle'
import CreateUserForm from './components/CreateUserForm'

const CreateUSerPage = () => {
    useTitle("Create user")
    return (
        <>
            <div className="px-8 pt-5">
                <div className="container-fluid">
                    <div className='row'>
                        <div className='col'>
                            <div className='card'>
                                <div className='card-body'>
                                    {/* <UsersForm /> */}
                                    <div className="table-rep-plugin">
                                        <div className="table-responsive mb-0" data-pattern="priority-columns">
                                            <CreateUserForm />
                                        </div>
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

export default CreateUSerPage