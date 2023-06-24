import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

const TableData = ({ hotel }: any) => {
    const navigate = useNavigate()

    return (
        <tr className='font-light'>
            <td className='capitalize'>
                {hotel?.name}
            </td>
            <td className='capitalize'>
                {hotel?.destination}
            </td>
            <td className='capitalize'>
                {hotel?.price}
            </td>
            <td className='capitalize'>
                {hotel?.createdAt ? format(new Date(hotel?.createdAt), "MMM dd yyy, hh:mm a") : "-"}
            </td>
            <td>
                <button className='btn bg-primar table-header-dark py-1 px-4 bg-opacity-10'>view</button>
            </td>
        </tr>
    )
}

export default TableData