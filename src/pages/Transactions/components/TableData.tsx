import { format } from 'date-fns'
import React from 'react'

const TableData = ({ transactions }: any) => {
    return (
        <tr className='font-light'>
            <td className='capitalize'>
                {transactions?.firstName}
            </td>
            <td className='capitalize'>
                {transactions?.lastName}
            </td>
            <td className=''>
                {transactions?.email}
            </td>
            <td className=''>
                {transactions?.convertedPrice}{[(transactions?.total)]
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </td>
            <td className='capitalize'>
                {transactions?.transaction_id ?? "-"}
            </td>
            <td className='capitalize'>
                {transactions?.reference_id ?? "-"}
            </td>
            <td className='capitalize'>
                <div className={`${transactions?.status === "successful" ? "bg-green-600" : transactions?.status === "failed" ? "bg-red-500" : transactions?.status === "cancelled" ? "bg-red-500" : "bg-yellow-300 bg-opacity-70"} capitalize py-1 px-3 text-center`}>
                    {transactions?.status}
                </div>
            </td>
            <td className='capitalize'>
                {transactions.createdAt ? format(new Date(transactions.createdAt), "MMM dd yyy, hh:mm a") : "-"}
            </td>
        </tr>
    )
}

export default TableData