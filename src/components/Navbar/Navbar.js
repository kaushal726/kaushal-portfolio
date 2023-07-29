import React from 'react'
import { NavLink } from 'react-router-dom'
import { anchorNav } from '../Style/Style'
const Navbar = () => {
    return (
        <nav className='  p-3 flex items-center justify-center  text-white md:py-4 py-3 z-40 '>
            <div className='relative tablet:text-neutral-100  border-b-2 border-grey md:pb-6 md:w-96  flex items-center justify-center pb-3 w-72 z-40'>
                <ul className='flex'>
                    <li className={anchorNav}>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className={anchorNav}>
                        <NavLink to="/project">Project</NavLink>
                    </li>
                    <li className={anchorNav}>
                        <NavLink to="/about">About</NavLink>
                    </li>
                    <li className={anchorNav}>
                        <NavLink to="/contact">Contact</NavLink>
                    </li>
                </ul>
            </div>

        </nav>
    )
}

export default Navbar