import { useState, useEffect } from 'react'

const Day = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [weekDay, setWeekDay] = useState("")
    useEffect(() => {
        const d = new Date();
        let day = d.getDay();
        setWeekDay(days[day])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return weekDay
}
const Time = () => {
    // eslint-disable-next-line
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    // console.log(currDate);
    // setInterval(() => {
    //     setTime(new Date().toLocaleTimeString())
    // }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return time
}
// const date = () => {
//     const [currDate, setDate] = useState(new Date().toLocaleDateString());
//     setDate(new Date().toLocaleDateString())
//     return currDate
// }

export { Time, Day }