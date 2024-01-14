import React, { useEffect, useState } from 'react'
import './Home.css'
import Marquee from "react-fast-marquee";
import Quotes from './Quotes'
import 'animate.css';
import Javascript from '../../assets/Skills/javascript.png'
import Typescript from '../../assets/Skills/typescript.png'
import CSS from '../../assets/Skills/css.png'
import Express from '../../assets/Skills/express.png'
import GitHub from '../../assets/Skills/github.png'
import HTML from '../../assets/Skills/html.png'
import Java from '../../assets/Skills/java.png'
import Linux from '../../assets/Skills/linux.png'
import Mongo from '../../assets/Skills/mongo-db.png'
import Node from '../../assets/Skills/node.png'
import NPM from '../../assets/Skills/npm.png'
import ReactLogo from '../../assets/Skills/react.png'
import SAAS from '../../assets/Skills/saas.png'
import TailwindLogo from '../../assets/Skills/tailwind.png'
import TextTransition, { presets } from 'react-text-transition';
import { motion, useAnimation } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
const TEXTS = ['Mern Stack Developer', 'Photographer', 'Editor'];
let render = true;
export const Body = () => {
    const [quote, setQuote] = useState();
    const [message, setMessage] = useState("");
    const [author, setAuthor] = useState();
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [time, setTime] = useState();
    const [index, setIndex] = React.useState(0);
    const [showNormalContent, setShowNormalContent] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        if (render) {
            controls.start({ opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: 'easeInOut' } });
            const timeout = setTimeout(() => {
                setShowNormalContent(true);
                controls.start({ opacity: 0, y: -20, scale: 0.8, transition: { duration: 0.5, ease: 'easeIn' } });
            }, 5000);
            render = false;
            return () => clearTimeout(timeout);
        }
        else {
            setShowNormalContent(true);
            controls.start({ opacity: 0, y: -20, scale: 0.8, transition: { duration: 0.5, ease: 'easeIn' } });
        }
    }, [controls]);

    useEffect(() => {
        const intervalId = setInterval(
            () => setIndex((index) => index + 1),
            3000,
        );
        return () => clearTimeout(intervalId);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const date = new Date();
            const hh = date.getHours();
            const mm = date.getMinutes();
            const day = date.getDay();
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            const formattedTime = `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`;
            setTime(formattedTime);
            setDayOfWeek(daysOfWeek[day]);

            if (hh >= 0 && hh < 12) {
                setMessage(`Good Morning. Create a positive vibe. Embrace the day with a smile, and let positivity guide your way!`);
            } else if (hh >= 12 && hh < 17) {
                setMessage(`Good Afternoon. Your presence has the power to make today amazing. Shine on!`);
            } else if (hh >= 17 && hh < 24) {
                setMessage(`A Great Day is About to End. Radiate good vibes and watch the world transform around you!`);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [dayOfWeek]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        Quotes().then(
            data => {
                if (data) {
                    setAuthor(data[0]?.author)
                    setQuote(data[0]?.quote)
                }
            }
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='h-full overflow-hidden fancy-scrollbar'>
            <motion.div
                className='flex items-center justify-center bg-black absolute top-0 left-0 w-full h-screen md:h-screen z-50'
                initial={{ opacity: 0 }}
                animate={controls} animate__hinge
            >
                <div className='mb-24 flex justify-center items-center text-center text-white'>
                    <h1 className='text-6xl sm:text-4xl md:text-[9rem] animate__animated animate__hinge ' style={{ fontFamily: "Amsterdam-2" }}  >Kaushal Raj</h1>
                </div>
            </motion.div>
            {showNormalContent && (
                <div className='flex flex-col justify-center items-center h-full fancy-scrollbar'>
                    <div className='   flex-col top-0 flex justify-center items-start h-screen '>
                        <h1 className='heading  w-full md:text-5xl italic font-medium p-2 text-3xl text-center py-0 text-white'>Hey There,</h1>
                        <h1 className='heading  w-full md:text-5xl italic font-medium p-2 text-3xl text-center py-0 text-white'>I'm <span
                            className=' headingName text-orange-400'>Kaushal Raj</span></h1>
                        <h1 className='heading w-full md:text-5xl italic font-medium p-2 text-3xl text-center py-0  text-white'><TextTransition className='flex items-center justify-center' delay={30} springConfig={presets.molasses}>{TEXTS[index % TEXTS.length]}</TextTransition> </h1>
                    </div>
                    <Tilt reset={false} tiltAngleXInitial={10} tiltAngleYInitial={10}>
                        <section className='w-full h-[30rem] flex justify-center items-center '>
                            <section className='w-4/5 md:w-3/5 h-4/5 bg-yellow-200 flex justify-between flex-col rounded-md'>
                                <section className='relative h-1/4'>
                                    <h2 className='animate__animated animate__fadeInUp text-left text-5xl  font-bold m-2 text-black ' style={{ animationDuration: "0.4s", opacity: "1" }}>My Skills</h2>
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 mt-1 text-4xl text-blue-400 transition-colors duration-300" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path><path d="M6 21v-2a4 4 0 0 1 4 -4h3.5"></path><path d="M20 21l2 -2l-2 -2"></path><path d="M17 17l-2 2l2 2"></path></svg>
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="absolute -right-3 -top-7 z-10 text-8xl text-blue-200 transition-transform duration-300 group-hover:text-blue-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path><path d="M6 21v-2a4 4 0 0 1 4 -4h3.5"></path><path d="M20 21l2 -2l-2 -2"></path><path d="M17 17l-2 2l2 2"></path></svg>
                                </section>
                                <section className='h-3/4 translate-y-8 rounded-t-2xl rounded-b-lg bg-gradient-to-br from-blue-400 to-cyan-400 transition-transform duration-300 group-hover:translate-y-3 group-hover:rotate-[1deg] mx-9 md:mx-24 flex flex-col justify-start items-center'>
                                    <Marquee className='h-1/2' autoFill={true} pauseOnHover={true}>
                                        <img alt={"Css"} width={70} height={70} src={CSS} />
                                        <img alt={"Express"} width={70} height={70} src={Express} />
                                        <img alt={"HTML"} width={70} height={70} src={HTML} />
                                        <img alt={"Demo"} width={70} height={70} src={Javascript} />
                                        <img alt={"Demo"} width={70} height={70} src={Mongo} />
                                        <img alt={"Demo"} width={70} height={70} src={Node} />
                                        <img alt={"Demo"} width={70} height={70} src={ReactLogo} />
                                        <img alt={"Demo"} width={70} height={70} src={Typescript} />
                                    </Marquee>
                                    <Marquee className='h-1/2' autoFill={true} pauseOnHover={true}>
                                        <img alt={"Demo"} width={70} height={70} src={GitHub} />
                                        <img alt={"Demo"} width={70} height={70} src={Java} />
                                        <img alt={"Demo"} width={70} height={70} src={Linux} />
                                        <img alt={"Demo"} width={70} height={70} src={NPM} />
                                        <img alt={"Demo"} width={70} height={70} src={SAAS} />
                                        <img alt={"Demo"} width={70} height={70} src={TailwindLogo} />
                                    </Marquee>
                                </section>
                            </section>
                        </section>
                    </Tilt>
                    <div className='py-24 w-full'>
                        <div className=" curved-div upper ">
                            <svg className='' viewBox="0 0 1440 319">
                                <path className="relative" fill="#044f66" d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            </svg>
                        </div>
                        <div className="curved-div lower w-full">
                            <div className="flex flex-col justify-center items-center w-full">
                                <h4 className='mb-5 font-mono text-center text-lg md:text-2xl font-bold w-[70%] '>"{quote ? quote : ''}"</h4>
                                <div className="flex items-end justify-end  w-[60%]">
                                    <h6 className='italic text-center mb-8 md:mb-16 md:text-base text-base'>{author ? author : ''}</h6>
                                </div>
                            </div>
                            <div className='bottom'>
                                <svg className='' viewBox="0 0 1440 319">
                                    <path fill="" d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <section className='w-full h-[15rem] bg-black flex items-center justify-center'>
                        <div className='bg-white rounded my-25 p-4 relative  mt-2  w-3/4'>
                            <p className=' text-center text-wrap text-black  text-lg md:text-md lg:text-xl xl:text-2xl'>It's <span className='bg-black  text-white px-1 md:px-3 label-tag-sm label-tag  rounded'> {time}</span> {message} <span className='bg-black text-white px-1 md:px:3 label-tag-sm label-tag whitespace-nowrap  rounded'> Happy {dayOfWeek} </span></p>
                        </div>
                    </section>
                </div >
            )
            }
        </div >
    )
}


