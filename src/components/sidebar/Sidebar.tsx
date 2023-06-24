import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import Logo from "../../assets/icons/logo.png"
import { RootState } from '../../redux/store'
import Accordion from '../accordion/Accordion'
import { sidebarContentFile } from './SidebarContent'
// import { sidebarContent } from './SidebarContent'

const Sidebar = () => {
    const { isAdmin, role } = useSelector((state: RootState) => state.authReducer)

    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const { sidebarContent } = sidebarContentFile({ isAdmin, role })

    const toggleAccordion = (index: number) => {
        if (openIndexes.includes(index)) {
            setOpenIndexes(openIndexes.filter(i => i !== index));
        } else {
            setOpenIndexes([...openIndexes, index]);
        }
    };

    return (
        <div className='py-3 px-4 bg-primary h-screen max-h-ful sticky right-0 bottom-0 left-0 top-0 overflow-y-auto w-full' style={{flex: "0 0 auto", width: "20%"}}>
            <div className='w-full'>
                <div className=''>
                    <Link to='/dashboard'>
                        <img src={Logo} alt="logo" className='h-14 mt-6 object-cover' />
                    </Link>
                </div>
                <div className=''>
                    {/* <Accordion items={sidebarContent} /> */}
                    <div className="accordion">
                        {sidebarContent.map((item, index) => (
                            <div className="accordion__item" key={index}>
                                <div className='flex items-center gap-1' style={{ color: "#b2c1cf" }}>
                                    {item.icon}
                                    <button className="accordion__toggle text-white">
                                        {item.title}
                                    </button>
                                </div>

                                <div className="accordion__content">
                                    {item.content.map((contentItem, contentIndex) => (
                                        <div key={contentIndex} className="py-2 capitalize">
                                            <NavLink to={contentItem.path} className={({ isActive }) => (isActive ? "text-white" : "text-gray-400")}>
                                                {contentItem.text}
                                            </NavLink>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar