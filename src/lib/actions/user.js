import axios from 'axios'
import { ForgotUserFai, ForgotUserReq, ForgotUserSuc, LoadUserFai, LoadUserReq, LoadUserSuc, LoginUserFai, LoginUserReq, LoginUserSuc, LogoutUserFai, LogoutUserReq, LogoutUserSuc, OTPUserFai, OTPUserReq, OTPUserSuc, PrayingFai, PrayingReq, PrayingSuc, RegisterUserFai, RegisterUserReq, RegisterUserSuc, ResterUserFai, ResterUserSuc, UpdateUserFai, UpdateUserReq, UpdateUserSuc, createAdsFai, createAdsReq, createAdsSuc, getAdsFai, getAdsReq, getAdsSuc } from '../ActionType';


const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
    withCredentials: true
});

export const  login = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: LoginUserReq,
        })
        const {data} = await api.post('/login',formData);
        dispatch({
            type: LoginUserSuc,...data
        })
        return true
    } catch (error) {
        dispatch({
            type: LoginUserFai,
            message: error?.response?.data?.message
        })
        return false
    }
}


export const register = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: RegisterUserReq,
        })

        const {data} = await api.post('/register',formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({
            type: RegisterUserSuc,...data
        })

        console.log("registered ")
        return true
    } catch (error) {
        dispatch({
            type: RegisterUserFai,
            message: error?.response?.data?.message
        })
        return false
    }
}

export const verifyOTP = (OTP) => async (dispatch) => {
    try {
        dispatch({
            type: OTPUserReq,
        })

        const {data} = await api.post('/verify-otp',{OTP});
        dispatch({
            type: OTPUserSuc,...data
        })
        return true
    } catch (error) {
        dispatch({
            type: OTPUserFai,
            message: error?.response?.data?.message
        })
        return false
    }
}

export const loadme = () => async (dispatch) => {
    try {
        dispatch({
            type: LoadUserReq,
        })

        const {data} = await api.get('/me');
        dispatch({
            type: LoadUserSuc,...data
        })
    } catch (error) {
        dispatch({
            type: LoadUserFai
        })
    }
}


export const logout = () => async (dispatch) => {
    try {
        dispatch({
            type: LogoutUserReq,
        })

        const {data} = await api.get('/logout');
        dispatch({
            type: LogoutUserSuc,...data
        })
    } catch (error) {
        dispatch({
            type: LogoutUserFai,
            message: error?.response?.data?.message
        })
    }
}

export const forgot = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: ForgotUserReq,
        })

        const {data} = await api.post('/forgot-password',formData);
        dispatch({
            type: ForgotUserSuc,...data
        })
    } catch (error) {
        dispatch({
            type: ForgotUserFai,
            message: error?.response?.data?.message
        })
    }
}

export const reset = (token,formData) => async (dispatch) => {
    try {
        dispatch({
            type: RegisterUserReq,
        })

        const {data} = await api.put(`/reset-password/${token}`,formData);
        dispatch({
            type: ResterUserSuc,...data
        })
    } catch (error) {
        dispatch({
            type: ResterUserFai,
            message: error?.response?.data?.message
        })
    }
}


export const updateUser = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: UpdateUserReq,
        })

        const {data} = await api.put('/user/update',formData);
        dispatch({
            type: UpdateUserSuc,...data
        })
    } catch (error) {
        dispatch({
            type: UpdateUserFai,
            message: error?.response?.data?.message
        })
    }
}


export const PrayingRequest = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: PrayingReq,
        })

        const {data} = await api.post('/pray-request',formData,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        dispatch({
            type: PrayingSuc,...data
        })
    } catch (error) {
        dispatch({
            type: PrayingFai,
            message: error?.response?.data?.message
        })
    }
}

export const createAds = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: createAdsReq,
        })

        const {data} = await api.post('/create/ads',formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({
            type: createAdsSuc,...data
        })
    } catch (error) {
        dispatch({
            type: createAdsFai,
            message: error?.response?.data?.message
        })
    }
}

export const getAds = () => async (dispatch) => {
    try {
        console.warn('ads')
        dispatch({
            type: getAdsReq,
        })

        const {data} = await api.get('/create/get');
        dispatch({
            type: getAdsSuc,...data
        })
        
        return data.ads;
    } catch (error) {
        dispatch({
            type: getAdsFai,
            message: error?.response?.data?.message
        })
        return []
    }
}



export const getChannels = async  (query) => {
    try {
        const {data} = await api.get(`/channels?channelName=${query}`);
        return data?.channels
    } catch (error) {
        return []
    }
}
export const getSingleChannels = async  (_id) => {
    try {
        const {data} = await api.get(`/channels/${_id}`);
        return data?.channel;
    } catch (error) {
        return {}
    }
}


export const followUnFollowRequest = async  (id) => {
    try {
        const {data} = await api.get(`/follow-unfollow/${id}`);
        return data.message;
    } catch (error) {
        return error?.response?.data?.message || error?.message;
    }
}