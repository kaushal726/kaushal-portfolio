import React from "react";
import readmeImg from "../../assets/sky.gif"
import "./About.css"


const pdfUrl = "https://docs.google.com/document/d/1ah_2XrpLrWpvW9iAySFVL4mey1QvOWxWqU6Gbj67Lp0/edit?usp=sharing";

let Readme = () => {



    return (
        <div className="flex flex-col items-center justify-between h-full md:h-[calc(100vh-4rem)]  w-full mt-16">
            <div className="flex flex-col items-center justify-center w-full h-full mb-5 mt-3">
                <p className="text-white font-semibold text-center w-full p-1 text-lg md:text-3xl">Web Developer by Day, Superhero by Night</p>
                <p className="text-white text-center w-full p-1 text-5xl font-bold leading-none md:text-7.5xl">Here I am!</p>
                <p className="text-black font-semibold  text-nowrap rounded-md  text-center w-4/5 bg-white p-3 my-5 text-[1.1rem]  text-gray-550 md:text-[1.4rem] md:leading-8 " style={{ boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.5)" }}>Hello, I'm Kaushal, and I'm passionate about crafting digital experiences that thrive on the internet – encompassing websites, applications, and everything in between. Since my initial encounter with a computer, its intricate workings have fascinated me, sparking my curiosity. Throughout my journey, I've dedicated myself to refining my technical skills, driven by the aspiration to create something truly unique. This journey has led me to choose a career path as a web developer.</p>
                <img fetchpriority="high" width={150} className="animate__bounce" src={readmeImg} alt="" />
                <a className="text-black btnTheme bg-white py-2 md:py-2 px-5 rounded-xl md:text-2xl" rel="noreferrer" download="kaushal-raj-resume" target='_blank' href={pdfUrl} >
                    <button className=" ">Hire Me!</button>
                </a>
            </div>
            <div className="text-center ">
                <p className='text-xs text-white'>&copy; 2023 Kaushal Raj. All rights reserved.</p>
            </div>
        </div>
    )
}
export default Readme; 