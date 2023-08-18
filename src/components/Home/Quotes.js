
const Quotes = async () => {
    let cat = ["future", "success", "leadership", "health", "love", "knowledge", "failure", "cool", "anger", "attitude", "computers", "education"];
    let randomNumber = Math.random() * 10;
    let apiKey = "PCMLJa7rNbfnWd9DThpryQ==xKZS9WPXe3ODF3UK";
    let url = `https://api.api-ninjas.com/v1/quotes?category=${cat[randomNumber.toFixed(0)]}`
    return fetch(url, {
        headers: {
            'X-Api-Key': apiKey
        },
    }).then(res => res.json())
        .then(data => {
            return data
        })
        .catch(error => {
            console.log(error);
        })
}

export default Quotes

