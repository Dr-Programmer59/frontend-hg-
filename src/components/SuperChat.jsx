import React, { memo } from 'react'
import { RiCoinsFill } from "react-icons/ri";


const gendomColor = () => {
    const colors = ['#FF8911','#74E291','#FF8080','#FF8080','#D63484','#BB2525'];
    const random = Math.floor(Math.random() * colors.length);
    return colors[random]
}

const SuperChat = ({avatar,amount,message}) => {
  return (
    <div className='flex items-center gap-3 rounded-3xl p-1 min-w-[13rem] mx-3' style={{background: gendomColor()}}>
        <img src={avatar} alt='avatar' className="w-8 h-8 rounded-full"/>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-2'>
            <h2 className='text-white text-[.7rem] flex items-center'>
              {'zeeshan raza'}
            </h2>
            <h2 className='text-white text-[.6rem] flex items-center gap-0'>
                <span className='text-yellow-500'><RiCoinsFill size={10}/></span>
                <span>{`${amount}.00`}</span>
            </h2>
          </div>
          <h2 className='text-white text-[.8rem]'>
            {message}
          </h2>
        </div>
    </div>
  )
}

export default memo(SuperChat);