import React, { useEffect, useState } from 'react'
import './Home.css'
import Quotes from './Quotes'
// eslint-disable-next-line
import AQI from './AQI'
export const Body = () => {
    const [city, setCity] = useState('');
    // const [weatherIcon, setWeatherIcon] = useState('');
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
                setAuthor(data[0]?.author)
                setQuote(data[0]?.quote)
            }
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            let apiKey = "PCMLJa7rNbfnWd9DThpryQ==xKZS9WPXe3ODF3UK"
            let url = `https://api.api-ninjas.com/v1/weather?city=${city ? city : ""}`
            // debugger 
            let response = await fetch(url, {
                headers: {
                    'X-Api-Key': apiKey
                },
            });
            let data = await response.json();
            console.log(data);
            if (city) {
                setWeather(data);
            }
            console.log(weathers);

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
                            <h3 className='data md:ml-72 ml-16  md:text-3xl text-xl '>{weathers ? `${weathers.temp}°C` : ""}</h3>
                        </div>
                        <div className='data md:mr-72  mr-16 md:text-3xl text-xl text-white ml-1'>{aqi ? `AQI : ${aqi}` : ""}</div>
                    </div>

                </div>
                {/* <h2 className="text-white font-mono md:text-xl text-xs  text-center">{date}</h2> */}
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
        </div >
    )
}


