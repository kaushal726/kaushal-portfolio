import React from 'react';
// import logo from '../assets/logo.jpg'
function Navbar() {
    return (
        <div>
            <nav className='p-3 flex items-center justify-center bg-slate-800 text-red-100 py-5'>
                <div className='tablet:text-neutral-100'>
                    <a className='px-3' href='/#'>Home</a>
                    <a className='px-3' href='/#'>About</a>
                    <a className='px-3' href='/#'>Projects</a>
                    <a className='px-3' href='/#'>Connect</a>
                </div>
            </nav>
        </div>
    )
}

export default Navbar