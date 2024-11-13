import Link from 'next/link';
import React, { useState } from 'react'
import {FaQuestionCircle,FaArrowCircleDown,FaArrowCircleUp, FaCheck} from 'react-icons/fa'

const PlanCard = ({ name,description,price,period,features,color,hidebtn,id,url,save }) => {
    const [all,setAll] = useState(false);
    return (
        <div className={`w-[22rem] pt-14 border border-gray-100 min-h-[35rem] shadow-md rounded-md  relative m-4 card-bg` } style={{backgroundImage: `linear-gradient(to bottom,rgba(32, 34 ,47 ,0.5) 10%, rgb(32, 34 ,47) 30%),url('${url}')`}}>
            
            <span className='hidden text-blue-600 text-purple-600 text-orange-600 from-blue-600 to-blue-500 from-orange-600 to-orange-500 from-purple-600 to-purple-500'/>
            
            <div className='p-4 rounded-t-md'>
                <button className='py-0 px-1 rounded-md text-lg mb-8 uppercase text-white bg-blue-700'>
                    SAVE <span className='text-xl'>${save}</span>
                </button>
                <div className='flex justify-center items-center flex-col'>
                    <p className='para !text-white' style={{lineHeight: "1.2 !important"}}>{description}</p>
                    <p className='para !text-sm !text-white/90' style={{lineHeight: "1.2 !important"}}>{description}</p>
                </div>
            </div>
            <div className=''>
                <ul className=''>
                    {
                        all ?
                        features?.map(({description:fdesc,name:fname}) => (
                        <li className='py-2 flex gap-4 items-left'>
                            <span></span>
                            <button type='button' title={fdesc} className='text-white/90'><FaCheck /></button>
                            <span className={`text-sm text-white/90`}>{fname}</span>
                        </li>
                        ))
                        : features?.slice(0,5).map(({description:fdesc,name:fname}) => (
                            <li className='py-2 flex gap-4 items-left'>
                                <span></span>
                                <button type='button' title={fdesc} className='text-white/90'><FaCheck /></button>
                                <span className={`text-sm text-white/90`}>{fname}</span>
                            </li>
                        ))
                    }
                    
                </ul>
            </div>

            {
                !hidebtn && <div className='absolute bottom-2 left-2'>
                <Link href={`/checkout?id=${id}`}  type='button' className={` text-[#2a5880] text-sm transition-all`}>GET THIS DEAL</Link>
            </div>
            }

           
        </div>
    )
}

export default PlanCard