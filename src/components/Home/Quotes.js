let Value = [];

let apiKey = "PCMLJa7rNbfnWd9DThpryQ==xKZS9WPXe3ODF3UK";
let url = "https://api.api-ninjas.com/v1/quotes?category=happiness"
fetch(url, {
    headers: {
        'X-Api-Key': apiKey
    },
}).then(res => res.json())
    .then(data => {
        Value = data;
    })

export { Value }