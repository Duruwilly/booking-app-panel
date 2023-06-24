import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import { AiOutlineUser } from 'react-icons/ai'
import { BiDotsVerticalRounded } from 'react-icons/bi'

const Featured = () => {
    return (
        <section>
            <main className=''>
                <div className='flex justify-betwee justify-cente p-6 widget-box-shadow rounded-lg h-[120px]'>
                    <div className="flex flex-col justify-between">
                        <h3 className='capitalize font-bold'>new user</h3>
                        <span className='flex items-center gap-5'>
                            <p className='font-bold text-3xl'>54</p>
                            <span className='bg-green-200 bg-opacity-60 px-2 py-1 text-green-600 text-xs'>+18.29%</span>
                        </span>
                    </div>
                </div>
                <div className='flex flex-col justify-betwee justify-cente p-6 widget-box-shadow rounded-lg'>
                    <h3 className='capitalize font-bold'>revenue</h3>
                    <div className="flex flex-col justify-center items-center">
                        <div style={{ width: 100, height: 100 }}>
                            <CircularProgressbar className='' value={60} text={"60%"} strokeWidth={5} styles={{
                                path: {
                                    stroke: `rgba(62, 152, 199, ${60 / 100})`,
                                    strokeLinecap: 'butt',
                                    transition: 'stroke-dashoffset 0.5s ease 0s',
                                    transformOrigin: 'center center',
                                },
                                text: {
                                    fontSize: '12px',
                                },
                                background: {
                                    fill: '#3e98c7',
                                },
                            }} />
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <p className='text-center'>Total revenue today</p>
                            <p className='text-center'>$4,200</p>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default Featured