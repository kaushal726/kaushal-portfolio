import React from "react";
import readmeImg from "../assets/readme.jpg"
import { Element } from 'react-scroll';

let Readme = () => {
    return (
        <Element name="Abouts">
            <div className="relative grid md:grid-cols-3 rounded-3xl z-40 background  m-5">
                <div className="flex items-center justify-center">
                    <img className="p-4 rounded-full md:w-3/4 w-1/2" src={readmeImg} alt=""></img>
                </div>
                <div className=" flex justify-center items-center flex-col md:col-span-2 md:p-10 p-3">
                    <h1 className="flex md:justify-start md:items-start justify-center  w-full p-2 text-4xl italic text-white">About Me!</h1>
                    <div className="text-white text-gray-200 md:text-base text-xs">
                        <p className="p-2">My name is Kaushal Raj, and I completed my 10th grade from Bishop's School Ranchi. I opted for the science stream and pursued my intermediate education at Oxford Public School Ranchi, focusing on the same field. Later, I graduated with a Bachelor's degree in Computer Applications (BCA). Currently, I have been working at MapmyIndia for the past year, primarily in the field of artificial intelligence.</p>

                        <p className="p-2">In parallel with my professional commitments, I am pursuing my Master's in Computer Applications (MCA) through LPU Online University. I possess a strong foundation in various technologies such as HTML, CSS, JavaScript, React, and Java. Additionally, I am familiar with Node.js and Angular, which further enhance my proficiency in web development.</p>

                        <p className="p-2">Beyond my technical pursuits, I have a range of interests and hobbies. Photography and video editing allow me to explore my creative side, while photo editing allows me to enhance and transform images. Playing cricket is a passion of mine, providing an outlet for physical activity and teamwork. I also have an interest in the stock market, constantly seeking to expand my knowledge in this field. Cooking is another area where I find joy and the opportunity to experiment with different flavors and recipes.</p>

                        <p className="p-2">In summary, I am a dedicated individual with a solid educational background and professional experience in AI. My skill set encompasses web development technologies, and I am continuously expanding my knowledge base through ongoing studies. Alongside my technical pursuits, I engage in photography, video editing, playing cricket, exploring the stock market, and honing my culinary skills.</p>
                    </div>
                </div>
            </div>
        </Element>

    )
}
export default Readme;