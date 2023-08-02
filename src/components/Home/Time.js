import React, { useState } from 'react'

const Time = () => {
    const [time, settime] = useState(new Date().toLocaleTimeString());
    const currDate = new Date().toLocaleDateString();
    setInterval(() => {
        settime(new Date().toLocaleTimeString())
    }, 1000);
    return (
        <div className="text-white">
            <h2 className="text-white">{time}</h2>
            <h2 className="text-white">{currDate}</h2>
        </div>
    )
}

export default Time