"use client"
import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { routes } from '@/lib/ProtectedRoutesList'
import { redirect, usePathname } from 'next/navigation'
const DashboardProtectedRoute = ({children}) => {
    const {isAuth,user} = useSelector(store => store.userReducer);
    const pathname = usePathname();
    useLayoutEffect(() => {
        if(user){
            if(pathname.includes('/dashboard')){
                if(isAuth == false){
                    redirect('/login');
                }
                if(user?.role == 'viewer'){
                    redirect('/');
                }
            }
        }else{
            if(isAuth == false){

                redirect('/login');
            }
        }  
    },[isAuth,pathname,user])
  return (children)
}

export default DashboardProtectedRoute