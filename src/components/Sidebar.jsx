"use client"
import React, { memo, useCallback, useState } from 'react'
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import Image from 'next/image';
import { IoIosArrowBack, IoIosArrowForward, IoLogoFacebook, IoLogoTwitter, IoLogoLinkedin, IoMdMail } from "react-icons/io";
import Link from 'next/link';
import { AiFillInstagram } from "react-icons/ai";
import { MdSms, MdStarRate, MdDashboard, MdScanner } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";
import { usePathname } from 'next/navigation';
import { MdQrCodeScanner } from "react-icons/md";
import { VscSymbolKeyword } from "react-icons/vsc";
import { useSelector } from 'react-redux';
import { SiGoogleadsense } from "react-icons/si";


const sidebarOpetion = {
    width: '18rem',
    backgroundColor: 'white',
    rootStyles: {
        display: 'flex',
        flexDirection: 'column',
        [`.${sidebarClasses.container}`]: {
            boxShadow: "0px 8px 10px 5px rgba(0, 0, 0, 0.1)",
            transition: "box-shadow 0.3s ease"
        },
    }

}


const hoverActiveStyle = {
    backgroundColor: '#e0e7ff',
    color: '#4F46E4',
}
const menuItemStyles = {
    overflowY: 'auto',
    button: {
        [`&.active`]: hoverActiveStyle,
        [`&:hover`]: hoverActiveStyle,
    },
}

const MenuItemsData = [
    {
        name: 'Dashboard',
        icons: <MdDashboard size={35} color='#B0B0B0' />,
        href: '/dashboard'
    },
    {
        name: 'Manage Ads',
        icons: <SiGoogleadsense size={35} color='#B0B0B0' />,
        href: '/dashboard/ads'
    },

]


const SidebarComponent = () => {
    const [expanded, setExpanded] = useState(false);
    const { isAuth, user } = useSelector(store => store.userReducer);
    const pathname = usePathname();


    const handleCollapse = useCallback(() => {
        setExpanded(prev => !prev);
    }, []);




    return (
        <Sidebar collapsed={expanded} {...sidebarOpetion}>
            <div className='p-4 mb-2 pxg-3 flex justify-between items-center pr-2 border-b border-gray-100'>
                <div className={`flex-1 flex justify-center items-center ${expanded ? 'hidden' : 'flex'}`}>

                    {
                        user?.avatar
                            ? (<img priority={true} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${user?.avatar}`} alt='avatar' width={200} height={200} className={`w-28 rounded-full ${expanded ? 'hidden w-0' : 'block'}`} />)
                            : (
                                <div className={`w-28 h-28 rounded-full bg-purple-100 grid place-items-center ${expanded ? 'hidden w-0' : 'block'}`}>
                                    <h2 className='text-purple-600 text-5xl'>{user?.name[0].toUpperCase()}</h2>
                                </div>
                            )
                    }


                </div>

                <div className='toggler'>
                    <button onClick={handleCollapse} className='bg-none outline-none border-none p-2 bg-primary/20 rounded-full text-primary'>
                        {expanded ? <IoIosArrowForward size={30} /> : <IoIosArrowBack size={30} />}
                    </button>
                </div>
            </div>
            <div className='flex-1 overflow-x-auto'>
                <Menu menuItemStyles={menuItemStyles}>
                    {
                        MenuItemsData.map(data => (
                            <MenuItem  key={data.name} icon={data.icons} active={pathname === data.href}>
                                <Link href={data.href} className='text-gray-700 text-xl'>{data.name}</Link>
                            </MenuItem>
                        ))
                    }
                </Menu>
            </div>
        </Sidebar>
    )
}

export default memo(SidebarComponent);