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
import KorisnikProfil from "../src/profili/korisnik/korisnikProfil.js"
import ProtectedRoute from "./routes/ProtectedRoute.js";
import BlogDetail from "./components/Blog/BlogDetail.js";
import Poddelatnosti from "./pages/Poddelatnosti.js";
import MajstoriList from "./pages/MajstoriList.js";
import MajstorProfil from "./profili/majstor/MajstorProfil.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Pocetna />} />
          <Route path="/pocetna" element={<Pocetna />} />
          <Route path="/delatnosti" element={<Delatnosti />} />
          <Route path="/majstori" element={<Majstori />} />
          <Route path="/onama" element={<ONama />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<PrijaviSe/>} />
          <Route path="/signin" element={<RegistrujSe/>} />
          <Route path="/admin" element= {<ProtectedRoute allowedRoles={'admin'}><AdminProfil/></ProtectedRoute>} />
          <Route path="/majstor/:majstorId" element={<Majstor />} /> {/* Dodajte ovu liniju */}
          <Route path = "/termini/:majstorId" element ={<MajstorTermini/>} />
          <Route path = "/korisnik/profil" element ={<ProtectedRoute allowedRoles={'korisnik'}><KorisnikProfil/></ProtectedRoute>} />
          <Route path="/blog/:id" element={<BlogDetail />} /> {/* Define route for BlogDetail */}
          <Route path="/poddelatnosti/:delatnostId" element={<Poddelatnosti />} />
          <Route path="/majstori/:poddelatnostId" element={<MajstoriList />} /> {/* Dodajte ovu liniju */}
          <Route path="/majstor/zahtevi" element={<MajstorProfil />} /> {/* Dodajte ovu liniju */}

          </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
