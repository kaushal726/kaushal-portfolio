import React from 'react'
import "./Connect.css"
import github from '../../assets/Social Icons/github.png'
import linkedin from "../../assets/Social Icons/linkedin.png"
import facebook from "../../assets/Social Icons/facebook.png"
import snapchat from "../../assets/Social Icons/snapchat.png"
import instagram from "../../assets/Social Icons/instagram (1).png"
import { socialIcons } from '../Style/Style'
const Connect = () => {
    return (
        <div className=' flex  flex-col w-full items-center justify-center'>
            <h1 className='text-center text-white font-bold md:text-2xl text-lg p-1 m-1'>Let's Connect? </h1>
            <div className='flex justify-center items-center p-4'>
                <a className={socialIcons} href='https://github.com/kaushal726' target=''><img src={github} alt='github' /></a>
                <a className={socialIcons} href='https://www.linkedin.com/in/kaushal-raj-074673213' target=''><img src={linkedin} alt='linkedin' /></a>
                <a className={socialIcons} href='https://www.facebook.com/kaushal.927?mibextid=TQi3BacyrYqMRoHa' target=''><img src={facebook} alt='facebook' /></a>
                <a className={socialIcons} href='https://instagram.com/kaushal_726?igshid=MzNlNGNkZWQ4Mg==' target=''><img src={instagram} alt='instagram' /></a>
                <a className={socialIcons} href='https://www.snapchat.com/add/kaushal_7266?share_id=dH5yoA2AUd0&locale=en-IN' target=''><img src={snapchat} alt='snapchat' /></a>
            </div>
            <footer>
                <div className="text-center">
                    <p className='text-xs text-white'>&copy; 2023 Kaushal Raj. All rights reserved.</p>
                </div>
            </footer>
        </div>

    )
}
export default Connect