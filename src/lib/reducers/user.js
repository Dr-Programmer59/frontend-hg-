import { createReducer } from '@reduxjs/toolkit'
import { LoginUserReq,LoginUserSuc,LoginUserFai, LoadUserReq, LoadUserSuc, LoadUserFai, LogoutUserFai, LogoutUserReq, LogoutUserSuc, ClearMessage, ClearError, RegisterUserReq, RegisterUserSuc, RegisterUserFai, ForgotUserReq, ForgotUserSuc, ForgotUserFai, ResterUserFai, ResterUserSuc, ResterUserReq, UpdateUserReq, UpdateUserSuc, UpdateUserFai, PrayingReq, PrayingSuc, PrayingFai, createAdsReq, createAdsSuc, createAdsFai, getAdsReq, getAdsSuc, getAdsFai, OTPUserReq, OTPUserSuc, OTPUserFai } from '../ActionType'

const initialstate = {
    loading: false,
    user: null,
    isAuth: undefined,
    message: null,
    error: null,
    ads: []
}

const reducer = createReducer(
  initialstate,
  (builder) => {
    // login 
    builder.addCase(LoginUserReq,(state,payload) => {
        
        state.loading = true;
    })
    builder.addCase(LoginUserSuc,(state,payload) => {
        state.message = payload.message;
        state.loading = false;
        state.user = payload.user;
        state.isAuth = true;
    })
    builder.addCase(LoginUserFai,(state,payload) => {
        state.user = null;
        state.isAuth = false,
        state.error = payload;
        state.loading = false;
        state.error = payload.message
    })

    // register 
    builder.addCase(RegisterUserReq,(state,payload) => {
        state.loading = true;
    })
    builder.addCase(RegisterUserSuc,(state,payload) => {
        state.message = payload.message;
        state.loading = false;
        state.user = payload.user;
        state.isAuth = true;
    })
    builder.addCase(RegisterUserFai,(state,payload) => {
        state.user = null;
        state.isAuth = false,
        state.error = payload;
        state.loading = false;
        state.error = payload.message
    })

    // otp 
    builder.addCase(OTPUserReq,(state,payload) => {
        state.loading = true;
    })
    builder.addCase(OTPUserSuc,(state,payload) => {
        state.message = payload.message;
        state.isAuth = true;
        state.user = payload.user;
        state.loading = false;
    })
    builder.addCase(OTPUserFai,(state,payload) => {
        state.user = null;
        state.isAuth = false,
        state.error = payload;
        state.loading = false;
        state.error = payload.message
    })


    // load user 
    builder.addCase(LoadUserReq,(state,payload) => {
        state.loading = true;
    })
    builder.addCase(LoadUserSuc,(state,payload) => {
        state.user = payload.user;
        state.isAuth = true,
        state.loading = false;
    })
    builder.addCase(LoadUserFai,(state,payload) => {
        state.user = null;
        state.isAuth = false,
        state.loading = false;
    })

    // logout user 
    builder.addCase(LogoutUserReq,(state,payload) => {
        state.loading = true;
    })
    builder.addCase(LogoutUserSuc,(state,payload) => {
        state.user = null;
        state.isAuth = false,
        state.loading = false;
        state.message = payload.message
    })
    builder.addCase(LogoutUserFai,(state,payload) => {
        state.loading = false;
        state.error = payload.message;
    })

    // forgot password user 
    builder.addCase(ForgotUserReq,(state,payload) => {
        state.loading = true;
    })
    builder.addCase(ForgotUserSuc,(state,payload) => {
        state.loading = false;
        state.message = payload.message
    })
    builder.addCase(ForgotUserFai,(state,payload) => {
        state.loading = false;
        state.error = payload.message;
    })

    // reset password user 
    builder.addCase(ResterUserReq,(state,payload) => {
        state.loading = true;
    })
    builder.addCase(ResterUserSuc,(state,payload) => {
        state.loading = false;
        state.message = payload.message
    })
    builder.addCase(ResterUserFai,(state,payload) => {
        state.loading = false;
        state.error = payload.message;
    })


    // update user 
    builder.addCase(UpdateUserReq,(state,payload) => {
        state.loading = true;
    })
    builder.addCase(UpdateUserSuc,(state,payload) => {
        state.loading = false;
        state.message = payload.message
    })
    builder.addCase(UpdateUserFai,(state,payload) => {
        state.loading = false;
        state.error = payload.message;
    })

    // praying 
    builder.addCase(PrayingReq,(state,payload) => {
        state.loading = true;
    })
    builder.addCase(PrayingSuc,(state,payload) => {
        state.loading = false;
        state.message = payload.message
    })
    builder.addCase(PrayingFai,(state,payload) => {
        state.loading = false;
        state.error = payload.message;
    })



    // create ads
    builder.addCase(createAdsReq,(state,payload) => {
        state.loading = true;
    })
    builder.addCase(createAdsSuc,(state,payload) => {
        state.loading = false;
        state.message = payload.message
    })
    builder.addCase(createAdsFai,(state,payload) => {
        state.loading = false;
        state.error = payload.message;
    })

    // get ads 
    builder.addCase(getAdsReq,(state,payload) => {
        state.loading = true;
    })
    builder.addCase(getAdsSuc,(state,payload) => {
        state.loading = false;
        state.ads = payload.ads
    })
    builder.addCase(getAdsFai,(state,payload) => {
        state.loading = false;
        // state.error = payload.message;
    })


    // clear message and error 
    builder.addCase(ClearMessage,(state,payload) => {
        state.message = null;
    })
    builder.addCase(ClearError,(state,payload) => {
        state.error = null;
    })
  }
)

export default reducer;