import React from 'react';
// import logo from '../assets/logo.jpg'
function Navbar() {
    return (
        <div>
            <nav className='p-3 flex items-center justify-center  text-white md:py-4 py-3'>
                <div className='tablet:text-neutral-100  border-b-2 border-grey md:pb-6 md:w-96  flex items-center justify-center pb-3 w-72'>
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