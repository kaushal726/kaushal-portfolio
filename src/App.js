import './App.css';
import { Body } from './components/body';
import Navbar from './components/navbar';
import Connect from './components/connect';
import About from './components/about';
// import CarouselComponent from './components/carousel';


function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <CarouselComponent /> */}
      <Body />
      <About />
      <Connect />
    </div>
  );
}

export default App;
