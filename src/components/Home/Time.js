import { useState, useEffect } from 'react'

const Day = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [weekDay, setWeekDay] = useState("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const d = new Date();
        let day = d.getDay();
        // console.log(day);
        setWeekDay(days[day])
    }, [days])
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