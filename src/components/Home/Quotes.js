
const Quotes = async () => {
    let apiKey = "PCMLJa7rNbfnWd9DThpryQ==xKZS9WPXe3ODF3UK";
    let url = "https://api.api-ninjas.com/v1/quotes?category=happiness"
    return fetch(url, {
        headers: {
            'X-Api-Key': apiKey
        },
    }).then(res => res.json())
        .then(data => {
            return data
        })

}

export default Quotes

