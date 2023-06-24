import React from 'react'

const SpinnerRoller = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center px-4">
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default SpinnerRoller