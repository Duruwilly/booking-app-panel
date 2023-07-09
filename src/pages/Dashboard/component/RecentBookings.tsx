import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeNotification } from '../../../redux/notificationReducer'
import { RootState } from '../../../redux/store'

const RecentBookings = () => {
    const { notifications } = useSelector((state: RootState) => state.notificationReducer)

    return (
        <section>
            <main className=''>
                <div className='p- widget-box-shadow rounded-lg h-[21.2rem]'>
                    <h3 className='capitalize font-bold py-2 px-5 table-header-light w-full'>recent bookings</h3>
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
                            {notifications.length > 0 ?
                                notifications.map((data) => (
                                    <TableData data={data} />
                                ))
                                :
                                <tr>
                                    <th colSpan={5} className="text-center">
                                        No recent bookings
                                    </th>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </main>
        </section>
    )
}

export default RecentBookings

const TableData = ({ data }: any) => {

    const dispatch = useDispatch()

    var currentDate = moment(new Date(), "YYYY-MM-DD");
    var startDate = moment(new Date(data?.bookedAt), "YYYY-MM-DD");

    let timeframe = "";
    let diff = currentDate.diff(startDate, "years");

    if (diff > 0) {
        timeframe = diff === 1 ? diff + " year ago" : diff + " years ago";
    } else {
        let diff = currentDate.diff(startDate, "months");
        if (diff > 0) {
            timeframe = diff === 1 ? diff + " month ago" : diff + " months ago";
        } else {
            let diff = currentDate.diff(startDate, "weeks");
            if (diff > 0) {
                timeframe = diff === 1 ? diff + " week ago" : diff + " weeks ago";
            } else {
                let diff = currentDate.diff(startDate, "days");
                if (diff > 0) {
                    timeframe = diff === 1 ? diff + " day ago" : diff + " days ago";
                } else {
                    let diff = currentDate.diff(startDate, "hours");
                    if (diff > 0) {
                        timeframe = diff === 1 ? diff + " hour ago" : diff + " hours ago";
                    } else {
                        let diff = currentDate.diff(startDate, "minutes");
                        if (diff > 0) {
                            timeframe =
                                diff === 1 ? diff + " minute ago" : diff + " minutes ago";
                        } else {
                            let diff = currentDate.diff(startDate, "seconds");
                            if (diff > 0) {
                                timeframe =
                                    diff === 1 ? diff + " second ago" : diff + " seconds ago";
                            } else {
                                timeframe = "";
                            }
                        }
                    }
                }
            }
        }
    }

    return (
        <tr className='text-gray-600 font-light mt-2'>
            <td className='capitalize'>{data?.lastName} {data?.firstName}</td>
            <td className='capitalize'>{data?.roomTitles}</td>
            <td className='capitalize'>{data?.roomNumbers}</td>
            <td className='capitalize'>{timeframe}</td>
            <td>
                <Link to={`/single-booking/${data?.bookingID}`} onClick={() => dispatch(removeNotification({ bookingID: data?.bookingID }))}>
                    <button className='btn bg-primar table-header-dark py-1 px-4 bg-opacity-10 mx-2'>view</button>
                </Link>
            </td>
        </tr >
    )
}