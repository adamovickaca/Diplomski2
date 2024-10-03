import "./App.css";
import Navbar from "./components/Navbar/Navbar.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Delatnosti from "./pages/Delatnosti";
import Majstori from "./pages/Majstori";
import ONama from "./pages/ONama.js";
import Blog from "./pages/Blog";
import Pocetna from './pages/Pocetna.js'
import PrijaviSe from "./pages/PrijaviSe.js";
import RegistrujSe from "./pages/RegistrujSe.js";
import AdminProfil from "./profili/adminProfil.js";
import Majstor from "./components/Majstori/Majstor/MajstorPocetna.js"
import MajstorTermini from "../src/components/Majstori/Majstor/MajstorTermini.js"
import Footer from "../src/components/Footer.js"
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/pocetna" element={<Pocetna />} />
          <Route path="/delatnosti" element={<Delatnosti />} />
          <Route path="/majstori" element={<Majstori />} />
          <Route path="/onama" element={<ONama />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<PrijaviSe/>} />
          <Route path="/signin" element={<RegistrujSe/>} />
          <Route path="/admin" element= {<AdminProfil/>} />
          <Route path = "/majstor" element ={<Majstor/>} />
          <Route path = "/termini" element ={<MajstorTermini/>} />

        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
