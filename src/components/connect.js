import React from 'react'
import github from '../assets/Social Icons/github.png'
import linkedin from "../assets/Social Icons/linkedin.png"
import facebook from "../assets/Social Icons/facebook.png"
import snapchat from "../assets/Social Icons/snapchat.png"
import telegram from "../assets/Social Icons/telegram (1).png"
import instagram from "../assets/Social Icons/instagram (1).png"
import email from "../assets/Social Icons/envelope.png"
const Connect = () => {
    return (
        <div>
            <h1 className='text-center font-bold text-3xl p-1 m-1'>Let's Connect? </h1>
            <div className='flex justify-between items-center  p-10'>
                <a className=' w-20 m-1' href='/#' target=''><img src={email} alt='email' /></a>
                <a className=' w-20 m-1' href='/#' target=''><img src={github} alt='github' /></a>
                <a className=' w-20 m-1' href='/#' target=''><img src={linkedin} alt='linkedin' /></a>
                <a className=' w-20 m-1' href='/#' target=''><img src={telegram} alt='telegram' /></a>
                <a className=' w-20 m-1' href='/#' target=''><img src={facebook} alt='facebook' /></a>
                <a className=' w-20 m-1' href='/#' target=''><img src={instagram} alt='instagram' /></a>
                <a className=' w-20 m-1' href='/#' target=''><img src={snapchat} alt='snapchat' /></a>
            </div>
        </div>
    )
}
export default Connect