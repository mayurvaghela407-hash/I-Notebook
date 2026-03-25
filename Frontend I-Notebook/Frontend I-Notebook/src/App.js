import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './context/notes/NoteState';
import Alerts from './Components/Alerts';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';

function App() {
  const [Alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    }, 1500);
  }
  return (
    <NoteState>
      <Router>
        <Navbar/>
        <Alerts alert={Alert} />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>} />
            <Route exact path="/about" element={<About/>} />
            <Route exact path="/Login" element={<Login showAlert={showAlert}/>} />
            <Route exact path="/Signup" element={<Signup showAlert={showAlert}/>} />
          </Routes>
          </div>
      </Router>
    </NoteState>
  );
}

export default App;
