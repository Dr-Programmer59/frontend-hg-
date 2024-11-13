"use client"
import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { routes } from '@/lib/ProtectedRoutesList'
import { redirect, usePathname } from 'next/navigation'
const AdminProtected = ({children}) => {
    const {isAuth,user} = useSelector(store => store.userReducer);
    const pathname = usePathname();
    useLayoutEffect(() => {
        if(user){
            if(pathname.includes('/admin')){
                if(user?.role != 'admin'){
                    redirect('/');
                }
            }
        }    
    },[isAuth,pathname,user])
  return (children)
}

export default AdminProtected