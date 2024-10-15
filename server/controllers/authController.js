//registracija i prijava(generisanje tokena)

import Korisnik from "../models/Korisnik.js";
import Majstor from "../models/Majstor.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = user => {
    return jwt.sign({id:user._id, role: user.role}, 
        process.env.JWT_SECRET_KEY, {
           expiresIn: '15d' 
        })
}

export const register = async (req, res) => {
  const {
    ime,
    prezime,
    email,
    sifra,
    brTelefona,
    slika,
    role,
    adresa,
    grad,
    poddelatnost,
    kvalifikacija,
    iskustvo,
    bio,
    oMajstoru,
  } = req.body;

  try {
    let user = null;

    if (role === "korisnik") {
      user = await Korisnik.findOne({ email });
    } else if (role === "majstor") {
      user = await Korisnik.findOne({ email });
    }else if (role === "admin") {
      user = await Korisnik.findOne({ email });
    }
    
    if (user) {
      return res.status(400).json({ message: "Korisnik vec postoji" });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(sifra, salt);

    if (role === "korisnik" || role ==="admin") {
      user = new Korisnik({
        ime,
        prezime,
        email,
        sifra: hashPassword,
        brTelefona,
        slika,
        role,
        adresa,
        grad,
      });
    } 
    if (role === "majstor") {
      user = new Majstor({
        ime,
        prezime,
        email,
        sifra: hashPassword,
        brTelefona,
        slika,
        role,
        adresa,
        grad,
        poddelatnost,
        kvalifikacija,
        iskustvo,
        bio,
        oMajstoru,
      });
    }
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Uspesno ste se registrovali!" });
  } catch (err) {
    console.error(err); // Dodaj ovu liniju
    res.status(500).json({
      success: false,
      message: "Neuspesno, pokusajte ponovo",
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, sifra } = req.body;
  try {
    // Pronađite korisnika
    let user = null;

    const korisnik = await Korisnik.findOne({ email });
    const majstor = await Majstor.findOne({ email });

    if (korisnik) {
      user = korisnik;
    }
    if (majstor) {
      user = majstor;
    }

    // Proverite da li korisnik postoji
    if (!user) {
      return res.status(404).json({ message: "Korisnik nije pronadjen" });
    }

    // Uporedite lozinke
    const poklapanjeLozinki = await bcrypt.compare(req.body.sifra, user.sifra);

    if (!poklapanjeLozinki) {
      return res
        .status(400)
        .json({ status: false, message: "Netacna lozinka!" });
    }

    // Generišite token
    const token = generateToken(user);

    // Odbacite lozinku i druge informacije koje ne želite da pošaljete klijentu
    const { sifra: _, role, ...rest } = user._doc;

    res.status(200).json({
      status: true,
      message: "Uspesno!",
      token,
      data: { ...rest },
      role,
    });
  } catch (err) {
    console.error(err); // Dajte više informacija o grešci u server logovima
    res.status(500).json({ status: false, message: "Neuspesno logovanje!" });
  }
};
