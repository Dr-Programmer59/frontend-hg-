"use client";
import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwipperCard from './SwipperCard';
import Link from 'next/link';

const Swipper = () => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: false,enabled: false }}
        >
            <SwiperSlide>
                <div className='w-full relative main-bg h-[calc(100vh-4rem)] px-5 py-10' style={{"--i": "/images/hero-bg.jpg"}}>
                    <div className='container mx-auto flex items-center justify-center gap-5 h-[calc(100vh-6.50rem)] flex-col'>
                        <h1 className='main-heading !text-white !text-5xl'>Engagement + Outreach Platform for Churches  & Businesses</h1>
                        <h3 className='text-xl text-white text-center'>Simplify your website and live streaming with one flexible ministry platform. Get a free demo to learn how.</h3>
                        <Link href={'/streams'} className='bg-primary text-white text-lg py-2 px-6 rounded'>View Streams</Link>
                    </div> 
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-full relative main-bg2 h-[calc(100vh-4rem)] px-5 py-10' style={{"--i": "/images/hero-bg.jpg"}}>
                    <div className='container mx-auto flex items-center justify-center gap-5 h-[calc(100vh-6.50rem)] flex-col'>
                        <h1 className='main-heading !text-white !text-5xl'>Engagement + Outreach Platform for Churches</h1>
                        <h3 className='text-xl text-white text-center'>Simplify your website and live streaming with one flexible ministry platform. Get a free demo to learn how.</h3>
                        <Link href={'/register'} className='bg-primary text-white text-lg py-2 px-6 rounded'>Become A Streamer</Link>
                    </div> 
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-full relative main-bg3 h-[calc(100vh-4rem)] px-5 py-10' style={{"--i": "/images/hero-bg.jpg"}}>
                    <div className='container mx-auto flex items-center justify-center gap-5 h-[calc(100vh-6.50rem)] flex-col'>
                        <h1 className='main-heading !text-white !text-5xl'>Engagement + Outreach Platform for Churches</h1>
                        <h3 className='text-xl text-white text-center'>Simplify your website and live streaming with one flexible ministry platform. Get a free demo to learn how.</h3>
                        <Link href={'/plans'} className='bg-primary text-white text-lg py-2 px-6 rounded'>View Pricing</Link>
                    </div> 
                </div>
            </SwiperSlide>
            
        </Swiper>
    );
}

export default Swipper