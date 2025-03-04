import React from 'react'
import Navbar from "./components/Navbar";
import WebcamCapture from "./components/WebcamCapture";
import About from "./pages/About";
import Gallery from "./pages/Gallery";

import { Routes, Route, } from "react-router-dom";


const App = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">

      
      <Routes>
        <Route path="/" element={<WebcamCapture />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        
      </Routes>
      
      </div>


    
      </>
  
  )
}

export default App


/*<Route path="/gallery" element={<Gallery />} />
        <Route path="/suggested" element={<Suggested />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
*/