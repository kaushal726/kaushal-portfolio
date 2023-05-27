import React from 'react';
// import logo from '../assets/logo.jpg'
function Navbar() {
    return (
        <div>
            <nav className="flex bg-blue-900  sticky top-0 z-50 py-1">
                <div className="max-w-screen-xl px-4 py-3 mx-auto color text-white ">
                    <div className="">
                        <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm text-white">
                            <li>
                                <a href="/#" className="text-white hover:underline" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="/#" className="text-white hover:underline">About</a>
                            </li>
                            <li>
                                <a href="/#" className="text-white hover:underline">Projects</a>
                            </li>
                            <li>
                                <a href="/#" className="text-white hover:underline">Connect</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar