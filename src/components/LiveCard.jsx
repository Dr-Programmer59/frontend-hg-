import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { HiOutlineSignal } from "react-icons/hi2";

function formatViews(views) {
  if (views >= 1000) {
      const count = Math.floor(views / 1000);
      return `${count}K`;
  } else {
      return `${views}`;
  }
}

// Example usage
console.log(formatViews(500));  // Output: 500 live
console.log(formatViews(1500)); // Output: 1K live
console.log(formatViews(2500)); // Output: 2K live


const LiveCard = ({thumnail,_id,title,views}) => {
  console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}${thumnail}`, "hhhh")
  return (
    <Link href={`/stream/${_id}`}>
      <div className='min-h-[22rem]  shadow-md w-[20rem] relative my-6 rounded-md' >
          <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${thumnail}`} layout='fill' className='absolute top-0 left-0 bottom-0 right-0 h-[15rem] w-[20rem] rounded-t-md z-10'/>
          <button type='button' className='bg-red-600 text-white py-1 px-3 rounded-md text-sm relative z-20 flex items-center gap-2 top-2 left-2'>
            <HiOutlineSignal size={23}/>
            <span>Live</span>
          </button>
          <div className='p-2 mt-[13rem]'>
            <h1 className='text-2xl text-gray-750 font-semibold'>{title}</h1>
            <p className='text-gray-600 mt-2'>{formatViews(views)} Watching</p>
          </div>
      </div>
    </Link>
  )
}

export default LiveCard