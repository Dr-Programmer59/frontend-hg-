import React, { useState } from 'react'
import { motion } from 'framer-motion';


const object = {
    1:310,
    2:345,
    3:345,
    4:345,
    5:350,
    6:345
}

const WhyusCard = ({title,content,index}) => {
    const [view, setview] = useState(false);
    return (
        <motion.div className="p-4 lg:w-1/3 relative" initial={{ x: '-100%', opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: (.2 * index) }}>
            <div className="min-h-[32rem] bg-opacity-75 px-8 pt-10 pb-10 rounded-lg overflow-hidden text-center relative">
                <h1 className="title-font sm:text-2xl text-2xl font-medium  mb-3 !text-white">{title}</h1>
                {/* <p className="leading-relaxed mb-3">{view ? content : `${content.slice(0,object[index+1])}`}</p> */}
                <p className="leading-relaxed text-xl/2 mb-3 !text-white mt-8">{content}</p>

                {/* <button className="text-indigo-500 inline-flex items-center absolute bottom-8 left-[50%] -translate-x-[50%]" onClick={() => setview(prev => !prev)}>{view ? "Less View" : "Learn More"}
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                    </svg>
                </button> */}

            </div>
        </motion.div>
    )
}

export default WhyusCard