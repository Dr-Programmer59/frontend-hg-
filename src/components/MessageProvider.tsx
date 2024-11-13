import { ClearError, ClearMessage } from '@/lib/ActionType';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
// @ts-ignore
const MessageProvider = ({children}) => {
    // @ts-ignore
    const {message,error} = useSelector(store => store.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if(message){
            toast.success(message);
            dispatch({
                type: ClearMessage
            })
        }

        if(error){
            toast.error(error);
            dispatch({
                type: ClearError
            })
        }
    },[message,error])
  return (
   children
  )
}

export default MessageProvider