import React from 'react';
// import { Body } from './body';
// import About from './about';
// import Connect from './connect';
import { Link } from 'react-scroll';
// import About from './about';
// import Readme from './readme';
// import Contact from './contact';
// import { Body } from ./body';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import logo from '../assets/logo.jpg'
function Navbar() {
    return (
        < div >
            <nav className='  p-3 flex items-center justify-center  text-white md:py-4 py-3 z-40 '>
                <div className='relative tablet:text-neutral-100  border-b-2 border-grey md:pb-6 md:w-96  flex items-center justify-center pb-3 w-72 z-40'>
                    <a className='px-3 md:text-base text-xs text-white font-semibold' href='/#'>
                        <Link
                            activeClass="active"
                            to="home"
                            spy={true}
                            smooth={true}
                            offset={-1}
                            duration={500}
                        >Home</Link>
                    </a>
                    <a className='px-3 md:text-base text-xs text-white font-semibold' href='/#'>
                        <Link
                            activeClass="active"
                            to="Project"
                            spy={true}
                            smooth={true}
                            offset={-1}
                            duration={500}
                        >Projects</Link>
                    </a>
                    <a className='px-3 md:text-base text-xs text-white font-semibold' href='/#'>
                        <Link
                            activeClass="active"
                            to="Abouts"
                            spy={true}
                            smooth={true}
                            offset={-1}
                            duration={500}
                        >About</Link>
                    </a>
                    <a className='px-3 md:text-base text-xs text-white font-semibold' href='/#'>
                        <Link
                            activeClass="active"
                            to="Connect"
                            spy={true}
                            smooth={true}
                            offset={-1}
                            duration={500}
                        >Connect</Link>
                    </a>
                </div>
            </nav>
        </div >
    )

}

export default Navbar