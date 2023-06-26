import React from 'react'
// import image from '../assets/image.jpg'
import image2 from '../assets/Background/bg-5.jpg'

export const Body = () => {
    return (
        <div className='relative w-full h-auto'>
            <img className='img w-full ' src={image2} alt='Bg' />
            <div className='absolute flex justify-center items-center w-full h-full flex-col top-0'>
                <h1 className='md:text-7xl  info p-2 text-2xl  py-0 text-white'>Hi..</h1>
                <h1 className='md:text-5xl  info p-2 text-2xl  py-0 text-white'>I'm Kaushal Raj</h1>
                <h1 className='md:text-5xl  info p-2 text-2xl  py-0 text-white'>Full Stack Developer </h1>
            </div>
        </div>
    )
}
