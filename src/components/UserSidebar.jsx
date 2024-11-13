"use client"
import React, { memo, useCallback, useState } from 'react'
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import Image from 'next/image';
import { IoIosArrowBack, IoIosArrowForward, IoLogoFacebook, IoLogoTwitter, IoLogoLinkedin, IoMdMail } from "react-icons/io";
import Link from 'next/link';
import { AiFillInstagram } from "react-icons/ai";
import { MdSms, MdStarRate, MdDashboard, MdScanner } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";
import { usePathname, useRouter } from 'next/navigation';
import { MdQrCodeScanner } from "react-icons/md";
import { VscSymbolKeyword } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import { SiGoogleadsense } from "react-icons/si";
import { FaHandsPraying } from "react-icons/fa6";
import { BiSolidVideos } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { HiOutlineSignal } from "react-icons/hi2";
import Dialog from './Dialog'
import axios from 'axios';
import { toast } from 'react-toastify';
import { logout } from '@/lib/actions/user';

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




const SidebarComponent = () => {
    const [expanded, setExpanded] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [title, setTitle] = useState('')
    const [file, setFile] = useState({});
    const [thumnail, setThumnail] = useState('');
    const [permission, setPermission] = useState(false);

    const [filePrev, setFilePrev] = useState();
    const { isAuth, user } = useSelector(store => store.userReducer);
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();


    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    }


    const MenuItemsData = [
        {
            name: 'Dashboard',
            icons: <MdDashboard size={35} color='#B0B0B0' />,
            href: '/dashboard'
        },
        {
            name: 'Pray Requests',
            icons: <FaHandsPraying size={35} color='#B0B0B0' />,
            href: '/dashboard'
        },
        {
            name: 'Streams',
            icons: <BiSolidVideos size={35} color='#B0B0B0' />,
            href: '/dashboard'
        },
        {
            name: 'Go Live',
            icons: <HiOutlineSignal size={35} color='#B0B0B0' />,
            onClick: async  () =>{ 
                try{
                console.log("onclick function")
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });  
                setDialogOpen(true)
                }
                catch(err){
                    toast.warning("Please Allow Camera/Mic")
                  
                }
            },
        },
        {
            name: 'Settings',
            icons: <IoMdSettings size={35} color='#B0B0B0' />,
            href: '/dashboard'
        },
        {
            name: 'Logout',
            icons: <RiLogoutBoxRFill size={35} color='#B0B0B0' />,
            href: '/dashboard',
            onClick: handleLogout
        },

    ]


    const handleCollapse = useCallback(() => {
        setExpanded(prev => !prev);
    }, []);

    const onLiveSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            //create a stream on database pending
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/stream-create`, { title, file, thumnail }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            console.log(data)
            router.push(`/live-dashboard?rooms=${data.roomId}`);
            setDialogOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    const onFileChange = (e) => {
        const [file] = e.target.files;

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState == 2) {
                if (e.target.name == "thumnail") {
                    setThumnail(reader.result);
                    return
                }
                setFilePrev(reader.result);
                setFile(file);
            }
        }

        reader.readAsDataURL(file);
    }




    return (
        <>
            <Sidebar collapsed={expanded} {...sidebarOpetion}>
                <div className='p-4 mb-2 pxg-3 flex justify-between items-center pr-2 border-b border-gray-100'>
                    <div className={`flex-1 flex justify-center items-center ${expanded ? 'hidden' : 'flex'}`}>

                        {
                            user?.avatar
                                ? (<img priority={true} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${user?.avatar}`} alt='avatar' width={200} height={200} className={`w-28 h-28 rounded-full ${expanded ? 'hidden w-0' : 'block'}`} />)
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
                                <MenuItem key={data.name} icon={data.icons} active={pathname === data.href}>
                                    {
                                        data.onClick
                                            ? <button onClick={data.onClick} className='text-gray-700 text-xl'>{data.name}</button>
                                            : <Link href={data.href} className='text-gray-700 text-xl'>{data.name}</Link>
                                    }

                                </MenuItem>
                            ))
                        }
                    </Menu>
                </div>
            </Sidebar>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <form className='p-1 w-full h-full flex flex-col justify-center
                ' onSubmit={onLiveSubmitHandler}>
                    <h2 className='text-gray-800 text-2xl text-center mb-5'>Stream Details</h2>
                    <div className='input-group flex flex-col m-3 mb-6'>
                        <label htmlFor="email" className='text-lg mb-1'>Title</label>
                        <input type='text' placeholder='Enter Your Title' className='w-full outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={title} required onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className='input-group flex flex-col m-3 mb-6'>
                        <label htmlFor="email" className='text-lg mb-1'>Thumnail</label>
                        <input type='file' id='file' className='w-full outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' name="thumnail" onChange={onFileChange} required />
                    </div>
                    <div className='input-group flex flex-col m-3 mb-6'>
                        <label htmlFor="email" className='text-lg mb-1'>Banner</label>
                        <input type='file' name='file' id='file' className='w-full outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' onChange={onFileChange} required />
                    </div>

                    <div className='flex items-center gap-5 justify-center'>
                        {
                            filePrev &&
                            <div className='flex justify-center items-center flex-col gap-2'>
                                <p className='text-gray-700 text-lg'>Banner</p>
                                <img src={filePrev} className='w-20 h-14' />
                            </div>
                        }

                        {
                            thumnail &&
                            <div className='flex justify-center items-center flex-col gap-2'>
                                <p className='text-gray-700 text-lg'>Thumnail</p>
                                <img src={thumnail} className='w-20 h-14' />
                            </div>
                        }
                    </div>
                   
                    <div className='flex justify-center items-center  m-3'>
                    
                        <button type='submit' className='bg-primary text-white text-lg py-2 px-6 rounded'>Go Live</button>
                    </div>

                </form>
            </Dialog>
        </>

    )
}

export default memo(SidebarComponent);