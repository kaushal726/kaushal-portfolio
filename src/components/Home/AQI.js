
const AQI = async (city) => {
    let apiKey = "PCMLJa7rNbfnWd9DThpryQ==xKZS9WPXe3ODF3UK";
    let url = `https://api.api-ninjas.com/v1/airquality?city=${city ? city : 'Ranchi'}`
    return fetch(url, {
        headers: {
            'X-Api-Key': apiKey
        },
    }).then(res => res.json())
        .then(data => {
            // console.log(data);
            return data
        })

}

export default AQI

