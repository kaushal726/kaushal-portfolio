import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";
import { AiOutlineForm } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";


const Navbar = () => {
    const [scrolling, setScrolling] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const navbarStyle = {
        backgroundColor: scrolling ? 'white' : 'transparent',
        transition: 'background-color 0.4s ease-in-out',
    };


    const anchorNav = 'inline-block text-lg md:text-2xl w-8 md:w-4 md:mx-4 my-2 md:my-0 text-white hover:text-gray-300';

    return (
        <nav style={navbarStyle} className={`${scrolling ? "border-transparent border-gradient" : ""} p-3 w-full flex fixed right-0 items-center justify-end text-white md:py-4 py-3 z-40`}>
            <div className='fixed w-32 left-1 md:left-0 right-2 top-2 '>
                <h1 className={`text-xl md:text-4xl m-1 md:m-3 ${scrolling ? 'text-black' : 'text-white'}`} style={{ fontFamily: "Amsterdam-2" }}>Kaushal Raj</h1>

            </div>
            <div className='w-34 md:flex md:items-start md:justify-end md:py-2 md:w-96'>
                <ul className='flex'>
                    <li className={anchorNav}>
                        <NavLink to="/" >
                            <FaHome className={`${scrolling ? 'text-black' : 'text-white'}`} />
                        </NavLink>
                    </li>
                    <li className={anchorNav}>
                        <NavLink to="/project" >
                            <GoProjectRoadmap className={`${scrolling ? 'text-black' : 'text-white'}`} />
                        </NavLink>
                    </li>
                    <li className={anchorNav}>
                        <NavLink to="/about" >
                            <FaRegUser className={`${scrolling ? 'text-black' : 'text-white'}`} />
                        </NavLink>
                    </li>
                    <li className={anchorNav}>
                        <NavLink to="/contact" >
                            <AiOutlineForm className={`${scrolling ? 'text-black' : 'text-white'}`} />
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav >
    );
}

export default Navbar