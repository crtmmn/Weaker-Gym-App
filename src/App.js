import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Exercises from './Exercises';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Exercise from './Exercise';

function App() {
  return (
    <div>
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}/>
        <Route path='/exercises' element={<Exercises></Exercises>}/>
        <Route path='/exercise/:exerciseID' element={<Exercise></Exercise>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;