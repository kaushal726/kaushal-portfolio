import React from 'react'
import { NavLink } from 'react-router-dom'
// import { HiMenu } from 'react-icons/hi';
import Kaushal from '../../assets/Kaushal.png'
import { FaHome } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";
// import { RiContactsLine } from "react-icons/ri";
import { AiOutlineForm } from "react-icons/ai";
// import { FaUserGraduate } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
// import { ImProfile } from "react-icons/im";
const Navbar = () => {
    // const [isNavOpen, setIsNavOpen] = useState(false);

   

    const closeNav = () => {
        // setIsNavOpen(false);
    };

    const anchorNav = 'inline-block text-lg md:text-2xl w-8 md:w-4 md:mx-4 my-2 md:my-0 text-white hover:text-gray-300';

    return (
        <nav className='p-3 flex fixed right-0 items-center justify-end text-white md:py-4 py-3 z-40'>
            <div className='fixed w-28 left-0 right-2 top-4 md:top-3'>
                <img
                    src={Kaushal}
                    alt='Logo'
                    className='w-14 md:w-36 mx-4 '
                />
            </div>

            {/* Center: Navigation */}
            {/* <div className='relative md:hidden'>
                <HiMenu
                    className='text-2xl cursor-pointer'
                    onClick={toggleNav}
                />

                <ul
                    className={`${isNavOpen ? 'block' : 'hidden'
                        } absolute top-16 left-0 right-0 bg-black text-white p-4`}
                >
                    <li className={anchorNav}>
                        <NavLink to="/" onClick={closeNav}>
                            Home
                        </NavLink>
                    </li>
                    <li className={anchorNav}>
                        <NavLink to="/project" onClick={closeNav}>
                            Project
                        </NavLink>
                    </li>
                    <li className={anchorNav}>
                        <NavLink to="/about" onClick={closeNav}>
                            About
                        </NavLink>
                    </li>
                    <li className={anchorNav}>
                        <NavLink to="/contact" onClick={closeNav}>
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div> */}

            {/* Larger Screens */}
            <div className='w-34 md:flex md:items-start md:justify-end md:py-2 md:w-96'>
                <ul className='flex'>
                    <li className={anchorNav}>
                        <NavLink to="/" onClick={closeNav}>
                            <FaHome />
                        </NavLink>
                    </li>
                    <li className={anchorNav}>
                        <NavLink to="/project" onClick={closeNav}>
                            <GoProjectRoadmap />
                        </NavLink>
                    </li>
                    <li className={anchorNav}>
                        <NavLink to="/about" onClick={closeNav}>
                            <FaRegUser />
                        </NavLink>
                    </li>
                    <li className={anchorNav}>
                        <NavLink to="/contact" onClick={closeNav}>
                            <AiOutlineForm />
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar