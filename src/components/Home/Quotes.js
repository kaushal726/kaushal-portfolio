
const Quotes = async () => {
    let url = 'https://dummyjson.com/quotes/random';

    return fetch(url, {
    }).then(res => res.json())
        .then(data => {
            return data
        })
        .catch(error => {
            console.log(error);
        })
}

export default Quotes

