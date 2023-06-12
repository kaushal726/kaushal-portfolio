import './App.css';
import { Body } from './components/body';
import Navbar from './components/navbar';
import Connect from './components/connect';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Body></Body>
      <Connect />
    </div>
  );
}

export default App;
