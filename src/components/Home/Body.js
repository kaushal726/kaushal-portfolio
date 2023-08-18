import React, { useEffect, useState } from 'react'
import './Home.css'
import Quotes from './Quotes'
// eslint-disable-next-line
import AQI from './AQI'
export const Body = () => {
    const [city, setCity] = useState('');
    const [weatherIcon, setWeatherIcon] = useState('');
    const [quote, setQuote] = useState();
    const [author, setAuthor] = useState();
    // eslint-disable-next-line
    const [weathers, setWeather] = useState();
    // eslint-disable-next-line
    const [aqi, setAqi] = useState();
    // eslint-disable-next-line
    const [time, setTime] = useState();
    // eslint-disable-next-line
    useEffect(() => {
        setInterval(() => {
            setTime(new Date().toLocaleTimeString())
        }, 1000);
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
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a3f94ace917ff857f870c65f2ce22245`
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
        <div className='top-0 flex flex-col justify-center items-center min-h-screen'>
            <div className='  relative flex-col top-0 flex justify-center items-start h-screen md:pb-28 pb-32'>
                <h1 className='heading  w-full md:text-5xl italic font-medium p-2 text-3xl text-center py-0 text-white'>Hi There,</h1>
                <h1 className='heading  w-full md:text-5xl italic font-medium p-2 text-3xl text-center py-0 text-white'>I'm <span
                    className=' headingName text-orange-400'>Kaushal Raj</span></h1>
                <h1 className='heading w-full md:text-5xl italic font-medium p-2 text-3xl text-center py-0  text-white'>Full Stack Developer </h1>
            </div>
            <div className=" w-full absolute flex flex-row justify-center items-center z-10 md:top-20 top-12">
                <div className='flex flex-col justify-center items-center w-full'>
                    <div className='text-white'>
                        <h2 className="md:text-3xl text-xl text-white time md:font-semibold font-bold text-center">{time}</h2>
                    </div>
                    <div className='flex flex-rows justify-between items-center w-full'>
                        <div className='text-white flex mr-1'>
                            <h3 className='data md:ml-72 ml-16  md:text-3xl text-xl '>{weathers ? `${(weathers - 273).toFixed(1)}°C` : ""}</h3>
                            <div className='flex justify-center items-center'>
                                {weatherIcon === "Mist" ? <i className="fa-solid fa-smog"></i> : ""}
                                {weatherIcon === "Smoke" ? <i className="fa-solid fa-smog"></i> : ""}
                                {weatherIcon === "Haze" ? <i className="fa-solid fa-smog"></i> : ""}
                                {weatherIcon === "Dust" ? <i className="fa-solid fa-smog"></i> : ""}
                                {weatherIcon === "Fog" ? <i className="fa-solid fa-smog"></i> : ""}
                                {weatherIcon === "Thunderstorm" ? <i className="fa-solid fa-cloud-bolt"></i> : ""}
                                {weatherIcon === "Rain" ? <i className="fa-solid fa-cloud-rain"></i> : ""}
                                {weatherIcon === "broken clouds" ? <i className="fa-solid fa-cloud-showers-heavy"></i> : ""}
                                {weatherIcon === "scattered clouds" ? <i className="fa-solid fa-cloudflare"></i> : ""}
                                {weatherIcon === "clear sky" ? <i className="fa-solid fa-sun"></i> : ""}
                            </div>


                        </div>
                        <div className='data md:mr-72  mr-16 md:text-3xl text-xl text-white ml-1'>{aqi ? `AQI : ${aqi}` : ""}</div>
                    </div>

                </div>
                {/* <h2 className="text-white font-mono md:text-xl text-xs  text-center">{date}</h2> */}
            </div>
            {/* <div className="bg-blue-300 quote p-3 w-3/4 rounded-xl  ">
                <div>
                    <h2 className='text-center mb-2 text-sm md:text-lg'>Quotes</h2>
                </div>
                <div className=" bg-slate-400 rounded-2xl  px-6 md:px-12 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
                    <i className="pl-2 text-xl fa-solid fa-quote-left"></i>
                    <h4 className=' text-center text-xs md:text-sm'>{quote ? quote : ''}</h4>
                    <i className="pr-2 text-xl fa-solid fa-quote-right flex justify-end"></i>
                </div>
                <div className="mt-4 ">
                    <h6 className='pr-4 text-right text-xs md:text-sm'>{author ? author : ''}</h6>
                </div>
            </div> */}
            <div className='w-full'>
                <div className=" curved-div upper ">
                    {/* <h1 className=' top-[55%] absolute w-full items-center justify-center text-center text-white bg-[#044f66] mt-0 pt-0 top-0'>Quotes</h1> */}
                    <svg className='' viewBox="0 0 1440 319">
                        {/* <text x="10" y="40" fontFamily="Arial" fontSize="14" fill="black">Hello, SVG!</text> */}
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
    )
}


