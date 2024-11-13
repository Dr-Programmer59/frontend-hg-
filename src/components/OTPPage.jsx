import React from 'react'
import OtpInput from 'react-otp-input';

const OTPPage = ({ submitHandler, OTP, setOTP }) => {
    return (
        <section className='min-h-[100vh] flex items-center p-5'>
            <div className='container m-auto flex justify-center items-center'>
                <div className='w-[50rem] max-w-[50rem] border-[.2rem] border-primary rounded-[2.8rem] px-8 py-3'>
                    <h2 className='text-center text-4xl text-black font-[600]'>OTP Verification</h2>
                    <form className='p-1' onSubmit={submitHandler}>
                        <OtpInput
                            value={OTP}
                            onChange={setOTP}
                            numInputs={6}
                            renderSeparator={''}
                            renderInput={(props) => <input {...props} />}
                            inputStyle="inputStyle"
                            containerStyle="containerStyle"
                            shouldAutoFocus={true}
                            inputType='number'
                        />
                        <div className='flex justify-center items-center  m-3'>
                            <button type='submit' className='bg-primary text-white text-lg py-2 px-6 rounded'>verify</button>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    )
}

export default OTPPage