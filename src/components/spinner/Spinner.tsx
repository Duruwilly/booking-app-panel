import React from 'react'

const Spinner = () => {
    return (
        <div className="w-full flex justify-center items-center px-4">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Spinner