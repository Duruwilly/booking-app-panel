import { format } from 'date-fns'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const TableData = ({ bookings }: any) => {
    const navigate = useNavigate()
    return (
        <tr className='font-light'>
            <td className='capitalize'>
                {bookings?.firstName}
            </td>
            <td className='capitalize'>
                {bookings?.lastName}
            </td>
            <td className=''>
                {bookings?.bookingNumber ?? "-"}
            </td>
            <td className=''>
                {bookings?.status ?? "-"}
            </td>
            <td className='capitalize'>
                {bookings?.bookedRoomsOption?.map((opt: any) => (
                    <div key={opt._id}>{opt.roomNumber}<br /></div>
                ))}
            </td>
            <td className='capitalize'>
                {bookings?.bookedRoomsOption?.map((opt: any) => (
                    <div key={opt._id}>{opt.roomTitle}<br /></div>
                ))}
            </td>
            <td className='capitalize'>
                {bookings?.bookedRoomsOption?.map((opt: any) => (
                    <div key={opt._id}>{opt.hotelName}<br /></div>
                ))}
            </td>
            <td className='capitalize'>
                {bookings?.createdAt ? format(new Date(bookings?.createdAt), "MMM dd yyy, hh:mm a") : "-"}
            </td>
            <td>
                <button className='btn bg-primar table-header-dark py-1 px-4 bg-opacity-10' onClick={() => navigate(`/single-booking/${bookings._id}`)}>view</button>
            </td>
        </tr>
    )
}

export default TableData