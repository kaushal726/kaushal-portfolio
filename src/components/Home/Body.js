import React, { useEffect, useState } from 'react'
import './Home.css'
// import image2 from '../assets/Background/bg-5.jpg'
// import displayPicture from '../../assets/dp.jpg'
// import quoteImg from '../../assets/quoteimg.jpeg'
import { Time, Day } from './Time'
import Quotes from './Quotes'
// eslint-disable-next-line
import Weather from './Weather'
import AQI from './AQI'
import Crypto from './CryptoCurreny'
import Covid from './Covid'
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
    const [crypto, setCrypto] = useState();
    // eslint-disable-next-line
    const [covid, setCovid] = useState();
    // eslint-disable-next-line
    const [time, SetTime] = useState(Time());
    // eslint-disable-next-line
    const [date, SetDate] = useState(Day());
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
        Crypto().then(data => {
            setCrypto(data)
        })
        Covid().then(data => {
            setCovid(data)
        })
        Quotes().then(
            data => {
                setAuthor(data[0]?.author)
                setQuote(data[0]?.quote)
            }
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            let apiKey = "3172ea7b1cec32a905b6e73a3dfe25df"
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city ? city : ""}&appid=${apiKey}`
            // debugger 
            let response = await fetch(url);
            let data = await response.json();
            setWeather(data);
            if ("weather" in data) {
                if (Array.isArray(data.weather)) {
                    setWeatherIcon(data.weather[0].main);
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
                <div className='flex flex-row justify-center items-center'>
                    <div className='text-white'>
                        <i className={`pl-2 text-xl fa-solid fa-${weatherIcon.toLowerCase()}`}></i>
                    </div>
                    <div className='text-white'>{aqi ? aqi : ""}</div>
                    <div className='text-white'></div>
                </div>
                <h2 className="text-white font-mono md:text-xl text-xs  text-center">{time}</h2>
                <h2 className="text-white font-mono md:text-xl text-xs  text-center">{date}</h2>
            </div>
            <div className="bg-blue-300 quote p-3 w-3/4 rounded-xl   ">
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
            </div>
            {/* <div className='relative flex-col top-0 flex justify-center items-center w-full md:h-96 h-40'>
                    <img className='rounded-full md:w-96  w-36' src={displayPicture} alt=''></img>
                </div> */}
        </div >
    )
}


