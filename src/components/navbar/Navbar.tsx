import React, { useEffect, useState } from 'react'
import { IoMdNotificationsOutline } from "react-icons/io"
import { TiRefresh } from "react-icons/ti"
import { RiArrowDropDownLine } from "react-icons/ri"
import { TiSpannerOutline } from "react-icons/ti"
import { CgLogOff } from "react-icons/cg"
import { AiOutlineUser } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom'
import User from "../../assets/images/team3.jpeg"
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from '../../redux/authReducer'
import { RootState } from '../../redux/store'
import { UserData } from '../../UserData'
import { io, Socket } from "socket.io-client";
import { FaTimes } from 'react-icons/fa'
import { clearNotification, notificationAction, removeNotification } from '../../redux/notificationReducer'

const Navbar = () => {
    const { fullname } = useSelector((state: RootState) => state.authReducer)

    const { notifications } = useSelector((state: RootState) => state.notificationReducer)

    const { fetchUser } = UserData()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [openNotification, setOpenNotification] = useState<boolean>(false)

    const handleLogout = () => {
        // dispatch({ type: "LOGOUT" });
        dispatch(logoutAction())
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        navigate("/");
    };

    const [socket, setSocket] = useState<Socket | null>(null);

    const displayNotification = ({ roomNumbers, bookingID }: any) => {
        return (
            <>
                <span>{`Room ${roomNumbers} has been booked`}</span>
                <div className='col-md-2'>
                    <div className="mb-3 flex justify-center items-center">
                        <Link to={`/single-booking/${bookingID}`} className="w-full" onClick={() => {
                            setOpenNotification(false);
                            dispatch(removeNotification({ bookingID }))
                        }}>
                            <button className='btn bg-secondary py-1 w-full'>View</button>
                        </Link>
                    </div>
                </div>
            </>
        );
    };

    useEffect(() => {
        const socketInstance = io("http://localhost:8200");
        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    useEffect(() => {
        socket?.on("getNotification", (data) => {
            dispatch(notificationAction({ notifications: [data] }));
        });
    }, [socket, dispatch]);

    useEffect(() => {
        if (socket) {
            socket.emit("newUser", "dashboard");
        }
    }, [socket]);

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <>
            <header className='mt-4 px-8 bg-gray widget-box-shadow h-24 flex justify-center sticky top-0 left-0 z-[90]'>
                <nav className='flex justify-between items-center w-full'>
                    <Link to="/dashboard" className='flex justify-center items-center'>
                        <h1 className='font-semibold capitalize text-xl'>dashboard</h1>
                        <TiRefresh className='text-2xl' />
                    </Link>
                    <div className='flex justify-center items-center gap-4'>
                        <div className='relative cursor-pointer' onClick={() => setOpenNotification(true)}>
                            <IoMdNotificationsOutline className='text-2xl' />
                            {notifications.length > 0 && <div className="notification-alert">
                                <p>{notifications.length}</p>
                            </div>}
                        </div>
                        <div className='py-2 px-3 cursor-pointer dropdown' style={{ backgroundColor: "rgba(233, 233, 239, 1)" }}>
                            <div className="flex items-center gap-2">
                                <img src={User} alt="user" className='rounded-full h-8 w-8 object-cover' />
                                <span className='font-light text-base capitalize flex items-center justify-center'>
                                    <p>{fullname !== null ? fullname : ""}</p>
                                    <RiArrowDropDownLine className='text-2xl' />
                                </span>
                            </div>
                            <ul className='widget-box-shadow'>
                                <Link to="/profile" className='flex items-center gap-1'>
                                    <AiOutlineUser />
                                    <li className="capitalize">Profile</li>
                                </Link>
                                <Link to="/settings" className='flex items-center gap-1'>
                                    <TiSpannerOutline />
                                    <li className="capitalize">Settings</li>
                                </Link>
                                <span className='flex items-center gap-1 text-red-500' onClick={() => handleLogout()}>
                                    <CgLogOff />
                                    <li
                                        className="capitalize"
                                    >
                                        Logout
                                    </li>
                                </span>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header >
            {openNotification && <div
                className=" w-screen h-screen fixed top-0 left-0 flex items-cente justify-end z-[100] pr-20"
                style={{ background: "rgba(0, 0, 0, 0.6)" }}
            >
                <div className="w-full max-w-screen-sm relative overflow-y-auto">
                    <div className='bg-white overflow-y-auto h-[65%] w-[70] mt-28 ml-52 rounded-md relative'>
                        <FaTimes
                            onClick={() => setOpenNotification(false)}
                            className="text-gray-500 absolute top-4 right-4 text-xl cursor-pointer"
                        />
                        <div className='mt- py-8'>
                            <div className="py- px-8">
                                <div className="border-b border-gray-300 mb-4 pb-2">
                                    <h1 className='text-xl text-gray-500'>Notifications</h1>
                                </div>
                                <div className="flex flex-col font-ligh text-sm">
                                    {notifications.length > 0 ? notifications.map((n, index) => <React.Fragment key={index}>
                                        {
                                            displayNotification(n)
                                        }
                                    </React.Fragment>) : `You have no new notifications`}
                                </div>
                            </div>

                            {notifications.length > 0 && <div className="border-t w-full border-gray-300 mb- px-3 pt-3 absolute bottom-4 right- text-blue-600 hover:text-blue-800 duration-200 font-semibold">
                                <div className='text-center cursor-pointer' onClick={() => { if (notifications.length > 0) dispatch(clearNotification()) }}>
                                    Mark all as read
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Navbar