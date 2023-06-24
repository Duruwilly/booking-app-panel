import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { BiDotsVerticalRounded } from 'react-icons/bi'

const RecentBookings = () => {
    return (
        <section>
            <main className=''>
                <div className='p- widget-box-shadow rounded-lg h-[21.2rem] -[21.2rem] overflow-y-auto overflow-x-auto'>
                    <h3 className='capitalize font-bold py-2 px-5 table-header-light'>recent bookings</h3>
                    <table className=''>
                        <thead>
                            <tr className="text-white table-header-dark">
                                <th>Customer Name</th>
                                <th>Room Title</th>
                                <th>Room Number</th>
                                <th>Booked At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='text-gray-600 font-light mt-2'>
                                <td className='capitalize'>priincewill duru</td>
                                <td className='capitalize'>super deluxe</td>
                                <td className='capitalize'>201</td>
                                <td className='capitalize'>1 hour ago</td>
                                <td>
                                    <button className='btn bg-primar table-header-dark py-1 px-4 bg-opacity-10 mx-2'>view</button>
                                </td>
                            </tr>
                            <tr className='text-gray-600 font-light mt-2'>
                                <td className='capitalize'>priincewill duru</td>
                                <td className='capitalize'>super deluxe</td>
                                <td className='capitalize'>201</td>
                                <td className='capitalize'>1 hour ago</td>
                                <td>
                                    <button className='btn bg-primar table-header-dark py-1 px-4 bg-opacity-10 mx-2'>view</button>
                                </td>
                            </tr>
                            <tr className='text-gray-600 font-light mt-2'>
                                <td className='capitalize'>priincewill duru</td>
                                <td className='capitalize'>super deluxe</td>
                                <td className='capitalize'>201</td>
                                <td className='capitalize'>1 hour ago</td>
                                <td>
                                    <button className='btn bg-primar table-header-dark py-1 px-4 bg-opacity-10 mx-2'>view</button>
                                </td>
                            </tr>
                            <tr className='text-gray-600 font-light mt-2'>
                                <td className='capitalize'>priincewill duru</td>
                                <td className='capitalize'>super deluxe</td>
                                <td className='capitalize'>201</td>
                                <td className='capitalize'>1 hour ago</td>
                                <td>
                                    <button className='btn bg-primar table-header-dark py-1 px-4 bg-opacity-10 mx-2'>view</button>
                                </td>
                            </tr>
                            <tr className='text-gray-600 font-light mt-2'>
                                <td className='capitalize'>priincewill duru</td>
                                <td className='capitalize'>super deluxe</td>
                                <td className='capitalize'>201</td>
                                <td className='capitalize'>1 hour ago</td>
                                <td>
                                    <button className='btn bg-primar table-header-dark py-1 px-4 bg-opacity-10 mx-2'>view</button>
                                </td>
                            </tr>
                            <tr className='text-gray-600 font-light mt-2'>
                                <td className='capitalize'>priincewill duru</td>
                                <td className='capitalize'>super deluxe</td>
                                <td className='capitalize'>201</td>
                                <td className='capitalize'>1 hour ago</td>
                                <td>
                                    <button className='btn bg-primar table-header-dark py-1 px-4 bg-opacity-10 mx-2'>view</button>
                                </td>
                            </tr>
                            <tr className='text-gray-600 font-light mt-2'>
                                <td className='capitalize'>priincewill duru</td>
                                <td className='capitalize'>super deluxe</td>
                                <td className='capitalize'>201</td>
                                <td className='capitalize'>1 hour ago</td>
                                <td>
                                    <button className='btn bg-primar table-header-dark py-1 px-4 bg-opacity-10 mx-2'>view</button>
                                </td>
                            </tr>
                            <tr className='text-gray-600 font-light mt-2'>
                                <td className='capitalize'>priincewill duru</td>
                                <td className='capitalize'>super deluxe</td>
                                <td className='capitalize'>201</td>
                                <td className='capitalize'>1 hour ago</td>
                                <td>
                                    <button className='btn bg-primar table-header-dark py-1 px-4 bg-opacity-10 mx-2'>view</button>
                                </td>
                            </tr>
                            <tr className='text-gray-600 font-light mt-2'>
                                <td className='capitalize'>priincewill duru</td>
                                <td className='capitalize'>super deluxe</td>
                                <td className='capitalize'>201</td>
                                <td className='capitalize'>1 hour ago</td>
                                <td>
                                    <button className='btn bg-primar table-header-dark py-1 px-4 bg-opacity-10 mx-2'>view</button>
                                </td>
                            </tr>
                            <tr className='text-gray-600 font-light mt-2'>
                                <td className='capitalize'>priincewill duru</td>
                                <td className='capitalize'>super deluxe</td>
                                <td className='capitalize'>201</td>
                                <td className='capitalize'>1 hour ago</td>
                                <td>
                                    <button className='btn bg-primar table-header-dark py-1 px-4 bg-opacity-10 mx-2'>view</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {/* <div className='px-5 space-y-4'>
                        <div className='flex justify-between font-light text-gray-600 mt-2'>
                            <p className='capitalize'>princewill duru</p>
                            <p>super deluxe</p>
                            <p>201</p>
                            <p>1 hour ago</p>
                        </div>
                        <div className='flex justify-between font-light text-gray-600 mt-2'>
                            <p className='capitalize'>princewill duru</p>
                            <p>super deluxe</p>
                            <p>201</p>
                            <p>1 hour ago</p>
                        </div>
                        <div className='flex justify-between font-light text-gray-600 mt-2'>
                            <p className='capitalize'>princewill duru</p>
                            <p>super deluxe</p>
                            <p>201</p>
                            <p>1 hour ago</p>
                        </div>
                        <div className='flex justify-between font-light text-gray-600 mt-2'>
                            <p className='capitalize'>princewill duru</p>
                            <p>super deluxe</p>
                            <p>201</p>
                            <p>1 hour ago</p>
                        </div>
                        <div className='flex justify-between font-light text-gray-600 mt-2'>
                            <p className='capitalize'>princewill duru</p>
                            <p>super deluxe</p>
                            <p>201</p>
                            <p>1 hour ago</p>
                        </div>
                        <div className='flex justify-between font-light text-gray-600 mt-2'>
                            <p className='capitalize'>princewill duru</p>
                            <p>super deluxe</p>
                            <p>201</p>
                            <p>1 hour ago</p>
                        </div>
                        <div className='flex justify-between font-light text-gray-600 mt-2'>
                            <p className='capitalize'>princewill duru</p>
                            <p>super deluxe</p>
                            <p>201</p>
                            <p>1 hour ago</p>
                        </div>
                        <div className='flex justify-between font-light text-gray-600 mt-2'>
                            <p className='capitalize'>princewill duru</p>
                            <p>super deluxe</p>
                            <p>201</p>
                            <p>1 hour ago</p>
                        </div>
                        <div className='flex justify-between font-light text-gray-600 mt-2'>
                            <p className='capitalize'>princewill duru</p>
                            <p>super deluxe</p>
                            <p>201</p>
                            <p>1 hour ago</p>
                        </div>
                        <div className='flex justify-between font-light text-gray-600 mt-2'>
                            <p className='capitalize'>princewill duru</p>
                            <p>super deluxe</p>
                            <p>201</p>
                            <p>1 hour ago</p>
                        </div>
                    </div> */}
                </div>
            </main>
        </section>
    )
}

export default RecentBookings