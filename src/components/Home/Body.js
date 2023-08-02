import React, { useState, useEffect } from 'react'
// import image2 from '../assets/Background/bg-5.jpg'
// import displayPicture from '../../assets/dp.jpg'
export const Body = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [weekDay, setWeekDay] = useState("")
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const currDate = new Date().toLocaleDateString();
    useEffect(() => {
        const d = new Date();
        let day = d.getDay();
        setWeekDay(days[day])
    }, [])
    setInterval(() => {
        setTime(new Date().toLocaleTimeString())
    }, 1000);
    return (
        <div className='top-0 flex flex-col justify-center items-center  h-screen overflow-x-auto'>
            <div className=' pb-24 relative flex-col top-0 flex justify-center items-start  md:h-96  md:pl-16 pl-9'>
                <h1 className='md:text-5xl italic font-medium p-2 text-1xl align-center py-0 text-white'>Hi There,</h1>
                <h1 className='md:text-5xl italic font-medium p-2 text-1xl  py-0 text-white'>I'm <span
                    className='text-orange-400'>Kaushal Raj</span></h1>
                <h1 className='md:text-5xl italic font-medium p-2 text-1xl  py-0  text-white'>Full Stack Developer </h1>
            </div>
            <div className=" w-full absolute flex flex-col justify-center items-center z-10 md:top-20 top-12">
                <h2 className="text-white font-mono md:text-xl text-xs w-full text-left">{time}</h2>
                <h2 className="text-white font-mono md:text-xl text-xs w-full text-left">{weekDay}   {currDate}</h2>
            </div>
            {/* <div className='relative flex-col top-0 flex justify-center items-center w-full md:h-96 h-40'>
                    <img className='rounded-full md:w-96  w-36' src={displayPicture} alt=''></img>
                </div> */}
        </div>
    )
}

