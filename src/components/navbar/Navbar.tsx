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
import { useAuthContext } from '../../context/AuthContext'
import { UserData } from '../../UserData'

const Navbar = () => {
    const { fullname } = useSelector((state: RootState) => state.authReducer)
    const { fetchUser } = UserData()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        // dispatch({ type: "LOGOUT" });
        dispatch(logoutAction())
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        navigate("/");
    };

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <header className='mt-4 px-8 bg-gray widget-box-shadow h-24 flex justify-center sticky top-0 left-0 z-[90]'>
            <nav className='flex justify-between items-center w-full'>
                <Link to="/dashboard" className='flex justify-center items-center'>
                    <h1 className='font-semibold capitalize text-xl'>dashboard</h1>
                    <TiRefresh className='text-2xl' />
                </Link>
                <div className='flex justify-center items-center gap-4'>
                    <div className='relative'>
                        <Link to="/notifications">
                            <IoMdNotificationsOutline className='text-2xl' />
                            <div className="notification-alert">
                                <p>1</p>
                            </div>
                        </Link>
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
                                // onClick={() => {
                                //     handleLogout();
                                // }}
                                >
                                    Logout
                                </li>
                            </span>
                        </ul>
                    </div>
                </div>
            </nav>
        </header >
    )
}

export default Navbar