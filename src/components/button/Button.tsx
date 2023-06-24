import React from 'react'

const Button = ({ text }: any) => {
    return (
        <button className='btn bg-secondary py-2 px-6 w-full'>{text}</button>
    )
}

export default Button