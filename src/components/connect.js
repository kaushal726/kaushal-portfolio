import React from 'react'
import github from '../assets/Social Icons/github.png'
import linkedin from "../assets/Social Icons/linkedin.png"
import facebook from "../assets/Social Icons/facebook.png"
import snapchat from "../assets/Social Icons/snapchat.png"
import instagram from "../assets/Social Icons/instagram (1).png"
const Connect = () => {
    return (
        <div className=''>
            <h1 className='text-center font-bold text-2xl p-1 m-1'>Let's Connect? </h1>
            <div className='flex justify-center items-center p-4'>
                <a className=' w-7 m-1 ' href='https://github.com/kaushal726' target=''><img src={github} alt='github' /></a>
                <a className=' w-7 m-1 ' href='https://www.linkedin.com/in/kaushal-raj-074673213' target=''><img src={linkedin} alt='linkedin' /></a>
                <a className=' w-7 m-1 ' href='https://www.facebook.com/kaushal.927?mibextid=TQi3BacyrYqMRoHa' target=''><img src={facebook} alt='facebook' /></a>
                <a className=' w-7 m-1 ' href='https://instagram.com/kaushal_726?igshid=MzNlNGNkZWQ4Mg==' target=''><img src={instagram} alt='instagram' /></a>
                <a className=' w-7 m-1 ' href='https://www.snapchat.com/add/kaushal_7266?share_id=dH5yoA2AUd0&locale=en-IN' target=''><img src={snapchat} alt='snapchat' /></a>
            </div>
            <footer>
                <div className="text-center">
                    <p className='text-xs text-black'>&copy; 2023 Kaushal Raj. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
export default Connect