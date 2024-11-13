"use client";
import Link from 'next/link';
import React from 'react'
import { FaStar } from "react-icons/fa6";

function avatarProvider(avatar){
    console.log()
    if(avatar  == '/upload/images/default.jpg'){
        return '/images/image-1.jpg'
    }else{
        return `${process.env.NEXT_PUBLIC_BACKEND_URL}${avatar}`
    }
}

const SwipperCard = ({avatar,_id,channelName,name}) => {
    
    return (
        <div className='w-full flex justify-center items-center relative'>
            <div className='w-[80%] h-[40%] border-2 border-primary rounded-2xl relative bg-white/20'>
                <div className='w-full h-full flex gap-5 flex-col md:flex-row'>
                    {/* detail  */}
                    <div className='flex-[5] p-6 text-white flex flex-col gap-3 items-center md:items-start'>
                        <p>Live Streaming...</p>

                        <h2 className='text-3xl font-semibold'>{channelName}</h2>

                        <div className='flex gap-2 text-white/80 items-center'>
                            <span><FaStar size={15} /></span>
                            <span><FaStar size={15} /></span>
                            <span><FaStar size={15} /></span>
                            <span><FaStar size={15} /></span>
                            <span><FaStar size={15} /></span>
                            <span>5.0</span>
                        </div>

                        <p className='text-lg'>
                            Sloan Lake Community Church Streaming from China Grove , NC
                        </p>

                        <div className='flex gap-5 items-center'>
                            <Link href={`/channels/video/${_id}`} className='py-2 px-4 rounded-3xl bg-primary'>Visit Channel</Link>
                            <Link href={"/"} className='py-2 px-4 rounded-3xl bg-transparent text-white'>
                                Subscribe
                            </Link>
                        </div>
                    </div>
                    {/* image  */}
                    <div className='flex-[3] p-6 relative flex justify-center md:block'>
                        <img src={avatarProvider(avatar)} className='md:w-[100%] w-[60%] h-[20rem] md:h-[17rem] rounded-2xl' />
                    </div>
                </div>
            </div>
        </div>
    )
}




export default SwipperCard