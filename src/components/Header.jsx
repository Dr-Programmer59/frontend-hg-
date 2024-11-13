"use client"
import { logout } from '@/lib/actions/user'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { RxHamburgerMenu } from "react-icons/rx";
import Dialog from './Dialog'
import { usePathname, useRouter } from 'next/navigation'
import { RiCoinsFill } from 'react-icons/ri'

const Header = () => {
    const [open, setOpen] = useState(false);
    const { isAuth, user } = useSelector(store => store.userReducer);
    const [navactice, setNavactive] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    }


    const checkHideHeader = () => {
        const list = ['/live-dashboard', '/dashboard']

        let hide = false;
        for (const index in list) {
            if (pathname.includes(list[index])) {
                hide = true;
                break;
            } else {
                hide = false;
            }
        }
        return hide
    }

    if (checkHideHeader()) {
        return <></>
    }
    return (
        <>
            <div className='bg-primary  p-6 text-lg '>
                <div className=' ml-10 '>
                    <div className='flex justify-between items-center w-full '>
                    <div className='logo w-60'>
                            <Link href={'/'}>
                                <img src='/images/hgv.png' className=''/>
                            </Link>
                        </div>

                        <div className={`main-nav z-40 absolute top-0 ml-10 ${navactice ? 'left-0' : '-left-[100%]'} md:left-0 w-full h-full bg-white md:relative md:bg-transparent z-10 grid place-items-center  transition-all`}>
                            <ul className='flex justify-center items-center nav-items flex-col md:flex-row mt-20 md:mt-0 gap-7 md:gap-0 w-full md:justify-start'>
                                <li><Link href={'/channels'} className='text-primary md:text-white/80  text-xl md:text-lg  hover:text-white transition-all mx-6'>Channels</Link></li>
                                <li><Link href={'/streams'} className='text-primary md:text-white/80  text-xl md:text-lg  hover:text-white transition-all mx-6'>Streams</Link></li>

                                {
                                    isAuth && user.role == 'admin' &&
                                    <li><Link href={'/admin/dashboard'} className='text-primary md:text-white  text-xl md:text-lg  hover:text-white transition-all mx-6'>Admin Dashboard</Link></li>

                                }

                                {
                                    isAuth && user.role != 'viewer' &&
                                    <li><Link href={'/dashboard'} className='text-primary md:text-white/80 text-xl md:text-lg  hover:text-white transition-all mx-6'>Dashboard</Link></li>

                                }

                                {/* <li><Link href={'/live-dashboard'} className='text-primary md:text-white/80 text-xl md:text-lg  hover:text-white transition-all mx-6'>Go Live</Link></li> */}
                                {/* <li><button onClick={() => { setDialogOpen(true); setNavactive(false) }} className='text-primary md:text-white/80 text-xl md:text-lg  hover:text-white transition-all mx-6'>Go Live</button></li> */}

                              

                                <li><Link href={'/why-us'} className='text-primary md:text-white/80 text-xl md:text-lg  hover:text-white transition-all mx-6'>Why Us ?</Link></li>

                                <li><Link href={'/plans'} className='text-primary md:text-white/80 text-xl md:text-lg  hover:text-white transition-all mx-6'>Pricing</Link></li>

                                {/* <li>
                                    <form className='flex justify-center items-center bg-[#FFF3F3] rounded-2xl px-2 py-1 mx-6'>
                                        <input type='text' placeholder='Search Something' className='bg-transparent text-sm placeholder:text-[#8E8B8B] text-black outline-none border-none' />
                                        <span className='text-black/30'>
                                            <FaSearch size={15} />
                                        </span>
                                    </form>
                                </li> */}
                               
                            </ul>
                          
                        </div>
                        <ul className='flex justify-center items-center nav-items flex-col md:flex-row mt-20 md:mt-0 gap-7 md:gap-0 w-full md:justify-end'>
                            <li className='hidden md:block ml-6'>
                                    {
                                        isAuth
                                            ? (
                                                <div className='relative justify-center items-center flex-col hidden md:flex'>
                                                    <button onMouseMove={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                                                        <img className='w-10 h-10 rounded-full' src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${user?.avatar}`} />
                                                    </button>

                                                    {
                                                        open &&
                                                        <div className={`absolute top-12 z-30 -left-24 w-36 h-44 bg-white shadow-md before:contect-[] before:absolute before:-top-[10.4%] before:left-[calc(80%-5px)] before:border-[10px] before:border-white before:border-x-transparent before:border-t-transparent rounded-md hidden md:block`} onMouseMove={() => setOpen(true)} onMouseLeave={() => {
                                                            setTimeout(() => setOpen(false), 500);
                                                        }}>
                                                            <ul className='p-4 flex flex-col gap-2'>
                                                                <li className='text-xl md:text-lg  text-black/90'><Link href={'/profile'}>Profile</Link></li>
                                                                <li className='text-xl md:text-lg  text-black/90'><button onClick={handleLogout} >Logout</button></li>
                                                                <li className='text-xl md:text-lg  text-black/90'><button className='flex items-center gap-2'>
                                                                    <span className='text-yellow-500'><RiCoinsFill size={25} /></span>
                                                                    <span>{`${user.coins}.00`}</span>
                                                                </button></li>
                                                            </ul>
                                                        </div>
                                                    }
                                                </div>
                                            )
                                            : (
                                                <>
                                                    <Link href={'/login'} className='text-primary md:text-white/80 text-xl md:text-lg  hover:text-white transition-all ml-6 pr-3 border-r-2 md:border-white border-primary'>Login</Link>
                                                    <Link href={'/register'} className='text-primary md:text-white/80 text-xl md:text-lg  hover:text-white transition-all mr-6 pl-3'>Sign Up</Link>
                                                </>
                                            )
                                    }

                                </li>

                                {
                                    isAuth ? <>
                                        <li><Link href={'/profile'} className='text-primary md:hidden md:text-white/80 text-xl md:text-lg  hover:text-white transition-all mx-6'>Profile</Link></li>
                                        <li><button onClick={handleLogout} className='text-primary md:hidden md:text-white/80 text-xl md:text-lg  hover:text-white transition-all mx-6'>Logout</button></li>
                                    </>
                                        : <>
                                            <li className='md:hidden'>
                                                <Link href={'/login'} className='text-primary md:text-white/80 text-xl md:text-lg  hover:text-white transition-all ml-6 pr-3 border-r-2 md:border-white border-primary'>Login</Link>
                                                <Link href={'/register'} className='text-primary md:text-white/80 text-xl md:text-lg  hover:text-white transition-all mr-6 pl-3'>Sign Up</Link>
                                            </li>
                                        </>
                                }
                            </ul>
                        
                       
                        <div className='burger-menu md:hidden relative z-50 mr-5 cursor-pointer text-black/95 transition-all text-gray-600' onClick={() => setNavactive(prev => (!prev))}>
                            <RxHamburgerMenu size={40} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header