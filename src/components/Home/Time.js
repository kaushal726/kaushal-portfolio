import { useState, useEffect } from 'react'

const Day = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [weekDay, setWeekDay] = useState("")
    useEffect(() => {
        const d = new Date();
        let day = d.getDay();
        // console.log(day);
        setWeekDay(days[day])
    }, [])
    return weekDay
}
const Time = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    // console.log(currDate);
    setInterval(() => {
        setTime(new Date().toLocaleTimeString())
    }, 1000);
    return time
}
// const date = () => {
//     const [currDate, setDate] = useState(new Date().toLocaleDateString());
//     setDate(new Date().toLocaleDateString())
//     return currDate
// }

export { Time, Day }