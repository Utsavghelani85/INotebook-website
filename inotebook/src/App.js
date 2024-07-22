import React,{useState} from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Homepage from "./components/Homepage";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";

function App() {
  const [alert,setalert] = useState(null);

  const showalert =(message,type)=>{
    setalert({
      msg: message,
      type : type
    })
    setTimeout(() => {
      setalert(null)
    }, 1000);

  } 
  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Homepage showalert={showalert}/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/Login" element={<Login />} />
              <Route exact path="/Signup" element={<Signup  />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
