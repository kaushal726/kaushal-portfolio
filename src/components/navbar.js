import React from 'react';
// import logo from '../assets/logo.jpg'
function Navbar() {
    return (
        <div>
            <nav className='p-3 flex items-center justify-center  text-white md:py-4 py-2'>
                <div className='tablet:text-neutral-100'>
                    <a className='px-3 md:text-base text-xs text-white font-semibold' href='/#'>Home</a>
                    <a className='px-3 md:text-base text-xs text-white font-semibold' href='/#'>About</a>
                    <a className='px-3 md:text-base text-xs text-white font-semibold' href='/#'>Projects</a>
                    <a className='px-3 md:text-base text-xs text-white font-semibold' href='/#'>Connect</a>
                </div>
            </nav>
        </div>
    )
}

export default Navbar