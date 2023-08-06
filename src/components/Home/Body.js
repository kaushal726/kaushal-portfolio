import React, { useEffect, useState } from 'react'
// import image2 from '../assets/Background/bg-5.jpg'
// import displayPicture from '../../assets/dp.jpg'
import { Time, Day } from './Time'
import Quotes from './Quotes'
import Weather from './Weather'
import AQI from './AQI'
import Crypto from './CryptoCurreny'
import Covid from './Covid'
export const Body = () => {
    const [city, setCity] = useState('');
    const [quote, setQuote] = useState();
    const [author, setAuthor] = useState();
    // eslint-disable-next-line
    const [weather, setWeather] = useState();
    // eslint-disable-next-line
    const [aqi, setAqi] = useState();
    // eslint-disable-next-line
    const [crypto, setCrypto] = useState();
    // eslint-disable-next-line
    const [covid, setCovid] = useState();
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
    console.log(city);
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
                setAuthor(data[0].author)
                setQuote(data[0].quote)
            }
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        Weather(city).then(data => {
            setWeather(data);
        })
        AQI(city).then(data => {
            setAqi(data);
        })
    }, [city])
    return (
        <div className='top-0 flex flex-col justify-center items-center min-h-screen'>
            <div className='  relative flex-col top-0 flex justify-center items-start h-screen pb-28 '>
                <h1 className=' w-full md:text-5xl italic font-medium p-2 text-1xl text-center py-0 text-white'>Hi There,</h1>
                <h1 className=' w-full md:text-5xl italic font-medium p-2 text-1xl text-center py-0 text-white'>I'm <span
                    className='text-orange-400'>Kaushal Raj</span></h1>
                <h1 className='w-full md:text-5xl italic font-medium p-2 text-1xl text-center py-0  text-white'>Full Stack Developer </h1>
            </div>
            <div className=" w-full absolute flex flex-col justify-center items-center z-10 md:top-20 top-12">
                <h2 className="text-white font-mono md:text-xl text-xs w-full text-center">{Time()}</h2>
                <h2 className="text-white font-mono md:text-xl text-xs w-full text-center">{Day()}</h2>
            </div>
            <div className="bg-yellow-300 p-3 w-3/4 rounded-xl   ">
                <div>
                    <h2 className='text-center mb-2 text-sm md:text-lg'>Quotes</h2>
                </div>
                <div className=" bg-yellow-500 rounded-full  px-6 md:px-12 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
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
        </div>
    )
}


