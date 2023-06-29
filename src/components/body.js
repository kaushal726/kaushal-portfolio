import React from 'react'
// import image2 from '../assets/Background/bg-5.jpg'
import displayPicture from '../assets/dp.jpg'

export const Body = () => {
    return (
        <div className='grid grid-cols-2'>
            <div className='relative flex-col top-0 flex justify-center items-start w-full md:h-96 h-40 md:pl-16 pl-9'>
                <h1 className='md:text-5xl italic font-medium p-2 text-1xl  py-0 text-white'>Hi There,</h1>
                <h1 className='md:text-5xl italic font-medium p-2 text-1xl  py-0 text-white'>I'm <span className='text-orange-400'>Kaushal Raj</span></h1>
                <h1 className='md:text-5xl italic font-medium p-2 text-1xl  py-0  text-white'>Frontend Developer </h1>
            </div>
            <div className='relative flex-col top-0 flex justify-center items-center w-full md:h-96 h-40'>
                <img className='rounded-full md:w-96  w-36' src={displayPicture} alt=''></img>
            </div>
        </div>

    )
}
