import React from 'react';
// import logo from '../assets/logo.jpg'
function Navbar() {
    return (
        <div>
            <nav className='p-3 flex items-center justify-center bg-black text-red-100 md:py-4 py-2'>
                <div className='tablet:text-neutral-100'>
                    <a className='px-3 md:text-base text-xs' href='/#'>Home</a>
                    <a className='px-3 md:text-base text-xs' href='/#'>About</a>
                    <a className='px-3 md:text-base text-xs' href='/#'>Projects</a>
                    <a className='px-3 md:text-base text-xs' href='/#'>Connect</a>
                </div>
            </nav>
        </div>
    )
}

export default Navbar