import React, { useEffect, useState } from 'react'
import './Home.css'
import Quotes from './Quotes'
// eslint-disable-next-line
import AQI from './AQI'
import TextTransition, { presets } from 'react-text-transition';
import { motion, useAnimation } from 'framer-motion';
import Kaushal from '../../assets/Kaushal.png'
const TEXTS = ['Mern Stack Developer', 'Photographer', 'Editor'];
let render = true;
export const Body = () => {
    const [city, setCity] = useState('');
    // eslint-disable-next-line
    const [weatherIcon, setWeatherIcon] = useState('');
    const [quote, setQuote] = useState();
    const [author, setAuthor] = useState();
    // const [isFirstRender, setFirstRender] = useState(true);
    // eslint-disable-next-line
    const [weathers, setWeather] = useState();
    // eslint-disable-next-line
    const [aqi, setAqi] = useState();
    // eslint-disable-next-line
    const [time, setTime] = useState();
    const [index, setIndex] = React.useState(0);
    // eslint-disable-next-line
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
            // return () => clearTimeout;
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
        setInterval(() => {
            // setTime((new Date().toLocaleTimeString().toLocaleTimeString('en-US')))
            let date = new Date();
            let hh = date.getHours();
            let mm = date.getMinutes();
            hh = hh.toString().length === 1 ? `0${hh}` : hh;
            mm = mm.toString().length === 1 ? `0${mm}` : mm;
            let final = `${hh}:${mm}`
            setTime(final)
        }, 1000);

        // let ss = date.getSeconds();

    }, [time])
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ff65fd7da036d1e69fa3a5025c2e46d1`);
                        const data = await response.json();
                        const cityName = data.name;
                        setCity(cityName);
                    } catch (error) {
                        console.error("Error fetching city name:", error);
                    }
                },
                (error) => {
                    console.error("Error getting geolocation:", error);
                }
            );
        } else {
            console.error("Geolocation is not available");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
    useEffect(() => {
        const fetchData = async () => {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city ? city : "Ranchi"}&appid=a3f94ace917ff857f870c65f2ce22245`
            let response = await fetch(url);
            let data = await response.json();
            if (data) {
                if (data.main) {
                    setWeather(data.main.temp)
                }
                if (data.weather) {
                    setWeatherIcon(data.weather[0].main)
                }
            }
        }

        AQI(city).then(data => {
            if ("overall_aqi" in data) {

                setAqi(data.overall_aqi);
            }
        })
        fetchData();
        // eslint-disable-next-line
    }, [city])
    return (
        <div style={{ position: '', height: '100vh', overflow: 'hidden' }}>
            <motion.div
                className='flex items-center justify-center'
                initial={{ opacity: 0 }}
                animate={controls}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    background: 'rgba(0, 0, 0, 0.8)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 80,
                }}
            >
                <div style={{ textAlign: 'center', color: 'white' }}>
                    <img src={Kaushal} width={400} alt='hello' />
                </div>
            </motion.div>
            {showNormalContent && (
                <div className='top-0 flex flex-col justify-center items-center min-h-screen'>
                    <div className='  relative flex-col top-0 flex justify-center items-start h-screen '>
                        <h1 className='heading  w-full md:text-5xl italic font-medium p-2 text-3xl text-center py-0 text-white'>Hey There,</h1>
                        <h1 className='heading  w-full md:text-5xl italic font-medium p-2 text-3xl text-center py-0 text-white'>I'm <span
                            className=' headingName text-orange-400'>Kaushal Raj</span></h1>
                        <h1 className='heading w-full md:text-5xl italic font-medium p-2 text-3xl text-center py-0  text-white'><TextTransition className='flex items-center justify-center' delay={30} springConfig={presets.molasses}>{TEXTS[index % TEXTS.length]}</TextTransition> </h1>
                    </div>
                    <div className='w-full'>
                        <div className=" curved-div upper ">
                            <svg className='' viewBox="0 0 1440 319">
                                <path className="relative" fill="#044f66" d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            </svg>
                        </div>
                        <div className="curved-div lower w-full">
                            <div className="flex flex-col justify-center items-center w-full">
                                {/* <i className="pl-2 text-xl fa-solid fa-quote-left"></i> */}
                                <h4 className='mb-5 font-mono text-center text-lg md:text-2xl font-bold w-[70%] '>"{quote ? quote : ''}"</h4>
                                {/* <i className="pr-2 text-xl fa-solid fa-quote-right flex justify-end"></i> */}
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
                </div >
            )}
        </div>

    )
}


