import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sidebarContentInterface } from '../sidebar/SidebarContent';
import { RiArrowDropRightLine, RiArrowDropDownLine } from "react-icons/ri"

interface AccordionProps {
    items: sidebarContentInterface[]
}

function Accordion({ items }: AccordionProps) {
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const toggleAccordion = (index: number) => {
        if (openIndexes.includes(index)) {
            setOpenIndexes(openIndexes.filter(i => i !== index));
        } else {
            setOpenIndexes([...openIndexes, index]);
        }
    };

    return (
        <div className="accordion">
            {items.map((item, index) => (
                <div className="accordion__item" key={index}>
                    <div className='flex items-center gap-1' style={{ color: "#b2c1cf" }}>
                        {item.icon}
                        <button className={`accordion__toggle ${openIndexes.includes(index) ? 'text-white' : "text-gray-400"}`} onClick={() => toggleAccordion(index)}>
                            {item.title}
                            {openIndexes.includes(index) ? <RiArrowDropDownLine className='ml-3' /> : <RiArrowDropRightLine className='ml-3' />}
                        </button>
                    </div>
                    {openIndexes.includes(index) && (
                        <div className="accordion__content">
                            {item.content.map((contentItem, contentIndex) => (
                                <div key={contentIndex} className="py-2 text-gray-400">
                                    <Link to={contentItem.path}>
                                        {contentItem.text}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Accordion;
