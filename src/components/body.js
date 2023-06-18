import React from 'react'
import image from '../assets/image.jpg'

export const Body = () => {
    return (
        <div className='container bg-slate-500 relative'>
            <img className='img w-full h-full' src={image} alt='Bg' />
            <div className='absolute top-4'>
                <h1 className='tablet:text-3xl info p-2 text-7xl  py-0 text-white'>Hi..</h1>
                <h1 className='tablet:text-3xl info p-2 text-5xl  py-0 text-white'>I'm XYZ</h1>
                <h1 className='tablet:text-3xl info p-2 text-5xl  py-0 text-white'>Full Stack Developer </h1>
            </div>
        </div>
    )
}
