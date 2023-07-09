import React, { useEffect, useState } from 'react'
import { BiDotsVerticalRounded } from "react-icons/bi"
import { AiOutlineUser } from "react-icons/ai"
import { TbBrandBooking } from "react-icons/tb"
import { BiTransfer } from "react-icons/bi"
import { Link } from 'react-router-dom'
import { useTransactionsContext } from '../../Transactions/context/TransactionsContext'
import { BASE_URL } from '../../../constant/base-urls'
import axios from 'axios'

interface widgetDetails {
    users: boolean;
    merchants: boolean;
    bookings: boolean
    transactions: boolean
}

interface totalAmountTyep {
    total: number;
}

const Widget = () => {
    const [users, setUsers] = useState([])
    const [merchantUsers, setMerchantUsers] = useState([])
    const [bookings, setBookings] = useState([])
    const [totalAmount, setTotalAmount] = useState<totalAmountTyep[]>([])
    const [fetchUsersStatus, setFetchUsersStatus] = useState("idle")

    const [widgetDetailsOpen, setWidgetDetailsOpen] = useState<widgetDetails>({
        users: false,
        merchants: false,
        bookings: false,
        transactions: false,
    });

    const toggleWidgetDetails = (widgetName: keyof widgetDetails) => {
        setWidgetDetailsOpen((prevState) => ({
            ...prevState,
            [widgetName]: !prevState[widgetName],
        }));
    };

    const fetchUsersData = async () => {
        await axios.get(`${BASE_URL}/admin/dashboard/users`).then((data) => {
            if (data.data.status === "success") {
                setUsers(data?.data?.data,)
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const fetchMerchantData = async () => {
        await axios.get(`${BASE_URL}/admin/dashboard/merchant-users/merchant`).then((data) => {
            if (data.data.status === "success") {
                setMerchantUsers(data?.data?.data,)
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const fetchTotalBookings = async () => {
        await axios.get(`${BASE_URL}/admin/dashboard/bookings`).then((data) => {
            if (data.data.status === "success") {
                setBookings(data?.data?.data,)
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const fetchTotalTransactions = async () => {
        await axios.get(`${BASE_URL}/admin/dashboard/transactions`).then((data) => {
            if (data.data.status === "success") {
                setTotalAmount(data?.data?.data,)
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const initializeState = () => {
        fetchUsersData();
        fetchMerchantData();
        fetchTotalBookings();
        fetchTotalTransactions()
    }

    useEffect(() => {
        initializeState()
    }, [])

    useEffect(() => {
        window.onpopstate = () => {
            initializeState()
        };
    }, []);

    return (
        <section className=''>
            <main className='flex gap-5 p-5'>
                <div className='flex justify-between p-5 flex-1 widget-box-shadow rounded-lg h-[130px] relative'>
                    <div className="left flex flex-col justify-between">
                        <AiOutlineUser className='text-2xl' />
                        <h3 className='capitalize text-gray-500'>users</h3>
                        <span className='flex items-center gap-5'>
                            <p className='font-bold text-xl'>{users.length}</p>
                            <span className='bg-green-200 bg-opacity-60 px-2 py-1 text-green-600 text-xs'>+18.29%</span>
                        </span>
                        {
                            widgetDetailsOpen.users && <div className='pr-2 absolute right-0 mt-5'>
                                <Link to="/users" className='px-3 py-2 text-sm hover:text-red-500 bg-white widget-box-shadow rounded-sm'>view all users</Link>
                            </div>
                        }
                    </div>
                    <div className="right cursor-pointer" onClick={() => toggleWidgetDetails('users')}>
                        <BiDotsVerticalRounded />
                    </div>
                </div>

                <div className='flex justify-between p-5 flex-1 widget-box-shadow rounded-lg h-[130px] relative'>
                    <div className="left flex flex-col justify-between">
                        <AiOutlineUser className='text-2xl' />
                        <h3 className='capitalize text-gray-500'>merchants</h3>
                        <span className='flex items-center gap-5'>
                            <p className='font-bold text-xl'>{merchantUsers.length}</p>
                            <span className='bg-green-200 bg-opacity-60 px-2 py-1 text-green-600 text-xs'>+18.29%</span>
                        </span>
                        {
                            widgetDetailsOpen.merchants && <div className='pr-2 absolute right-0 mt-5'>
                                <Link to="/users/merchant" className='px-3 py-2 text-sm hover:text-red-500 bg-white widget-box-shadow rounded-sm'>view all merchants</Link>
                            </div>
                        }
                    </div>
                    <div className="right cursor-pointer" onClick={() => toggleWidgetDetails('merchants')}>
                        <BiDotsVerticalRounded />
                    </div>
                </div>

                <div className='flex justify-between p-5 flex-1 widget-box-shadow rounded-lg h-[130px] relative'>
                    <div className="left flex flex-col justify-between">
                        <TbBrandBooking className='text-2xl' />
                        <h3 className='capitalize text-gray-500'>bookings</h3>
                        <span className='flex items-center gap-5'>
                            <p className='font-bold text-xl'>{bookings.length}</p>
                            <span className='bg-green-200 bg-opacity-60 px-2 py-1 text-green-600 text-xs'>+18.29%</span>
                        </span>
                        {
                            widgetDetailsOpen.bookings && <div className='pr-2 absolute right-0 mt-5'>
                                <Link to="/bookings" className='px-3 py-2 text-sm hover:text-red-500 bg-white widget-box-shadow rounded-sm'>view all bookings</Link>
                            </div>
                        }
                    </div>
                    <div className="right cursor-pointer" onClick={() => toggleWidgetDetails('bookings')}>
                        <BiDotsVerticalRounded />
                    </div>
                </div>

                <div className='flex justify-between p-5 flex-1 widget-box-shadow rounded-lg h-[130px] relative'>
                    <div className="left flex flex-col justify-between">
                        <BiTransfer className='text-2xl' />
                        <h3 className='capitalize text-gray-500'>transactions</h3>
                        <span className='flex items-center gap-5'>
                            <p className='font-bold text-xl'>
                                {/* {totalAmount ?
                                    totalAmount.reduce((acc, item) =>
                                        item.total && !isNaN(item.total) ? acc + item.total : acc, 0
                                    ).toFixed(2)
                                    : 0
                                } */}
                                {[totalAmount ?
                                    totalAmount.reduce((acc, item) =>
                                        item.total && !isNaN(item.total) ? acc + item.total : acc, 0
                                    ).toFixed(2) : 0]
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </p>
                            <span className='bg-green-200 bg-opacity-60 px-2 py-1 text-green-600 text-xs'>+18.29%</span>
                        </span>
                        {
                            widgetDetailsOpen.transactions && <div className='pr-2 absolute right-0 mt-5'>
                                <Link to="/transactions" className='px-3 py-2 text-sm hover:text-red-500 bg-white widget-box-shadow rounded-sm'>view all transactions</Link>
                            </div>
                        }
                    </div>
                    <div className="right cursor-pointer" onClick={() => toggleWidgetDetails('transactions')}>
                        <BiDotsVerticalRounded />
                    </div>
                </div>

            </main>
        </section>
    )
}

export default Widget