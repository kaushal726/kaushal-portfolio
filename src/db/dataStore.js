import Todolist from "../assets/dbImage/todo.png"
import Menu from "../assets/dbImage/menu.jpg"
import StopWatch from "../assets/dbImage/stopwatch.jpg"
import Drum from "../assets/dbImage/drum-set.png"
import Weather from "../assets/dbImage/weather.png"

let dataStore = [
    {
        name: "Todo List",
        description: "Efficient and user-friendly web app for organizing tasks, setting reminders, and collaborating on projects.",
        src: Todolist,
        link: "https://kaushal726.github.io/React-test/",
    }, {
        name: "Weather App",
        description: "Real-time weather app with accurate forecasts, customizable alerts, and intuitive interface for easy access to weather information.",
        src: Weather,
        link: "https://kaushal-weather.netlify.app/?",
    }, {
        name: "StopWatch",
        description: "A user-friendly web app with a stopwatch feature for accurately tracking time, perfect for timing activities and events.",
        src: StopWatch,
        link: "https://kaushal-stopwatch.netlify.app/",
    }, {
        name: "Restaurant Menu",
        description: "Convenient web app displaying a restaurant's menu, allowing users to browse, search, and order dishes effortlessly.",
        src: Menu,
        link: "https://bean-bag-cafe.netlify.app/",
    }, {
        name: "Drum Kit",
        description: "Interactive web app simulating a virtual drum kit, providing a fun and immersive experience for music enthusiasts.",
        src: Drum,
        link: "https://kaushal-drumkit.netlify.app/",
    },

]
export default dataStore;