import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";

import Navbar from "./components/Navbar";
import Contact from "./Contact";
import Stream from "./Stream";
import Feature from "./Feature";
import SignIn from "./(auth)/sign-in";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
      
          <Route path="/contact" element={<Contact />} />
          <Route path="/feature" element={<Feature />} />
          <Route path="/stream" element={<Stream />} />
           <Route path="/sign-in" element={<SignIn />} />
         
       
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
