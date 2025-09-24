import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./Stream";
import Navbar from "./components/Navbar";
import Contact from "./contact";
import Stream from "./Stream";
import Feature from "./Feature";

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
       
        </Routes>
      </Router>
    </>
  );
}

export default App;
