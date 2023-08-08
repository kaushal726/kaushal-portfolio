
const Weather = async (city) => {
    console.log(city);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city ? city : "Ranchi"}&appid=3172ea7b1cec32a905b6e73a3dfe25df`
    return fetch(url).then(res => res.json())
        .then(data => {
            console.log(data);
            return data
        })

}

export default Weather

