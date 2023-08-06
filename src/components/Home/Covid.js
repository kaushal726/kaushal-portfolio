
const Covid = async () => {
    let apiKey = "PCMLJa7rNbfnWd9DThpryQ==xKZS9WPXe3ODF3UK";
    let url = "https://api.api-ninjas.com/v1/covid19?country=India"
    return fetch(url, {
        headers: {
            'X-Api-Key': apiKey
        },
    }).then(res => res.json())
        .then(data => {
            console.log(data);
            return data
        })

}

export default Covid
