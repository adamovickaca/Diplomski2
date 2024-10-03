//profil: Prikazuje korisnički profil.
//izmena profila: Ažurira korisničke informacije.
//zakazivanje: Upravljanje zakazivanjima (lista, otkazivanje).

import Korisnik from "../models/Korisnik.js";
import Rezervacija from "../models/Rezervacija.js";
import Majstor from "../models/Majstor.js";

export const azurirajKorisnika = async (req, res) => {
  const id = req.params.id;
  try {
    const azuriran = await Korisnik.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Uspesno azuriran!",
      data: azuriran,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Neuspesno azuriran",
    });
  }
};

export const obrisiKorisnika = async (req, res) => {
  const id = req.params.id;
  try {
    const obrisan = await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Uspesno obrisan!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Neuspesno brisanje!",
    });
  }
};

export const vratiKorisnika = async (req, res) => {
  const id = req.params.id;
  try {
    const korisnik = await Korisnik.findById(id).select("-sifra");

    res.status(200).json({
      success: true,
      message: "Uspesno!",
      data: korisnik,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Neuspesno!",
    });
  }
};

export const vratiSveKorisnike = async (req, res) => {
  try {
    const korisnici = await Korisnik.find({}).select("-sifra");

    res.status(200).json({
      success: true,
      message: "Uspesno!",
      data: korisnici,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Neuspesno!",
    });
  }
};

export const profilKorisnika = async (req, res) => {
  const korisnikId = req.korisnikId;
  try {
    const korisnik = await Korisnik.findById(korisnikId);
    if (!korisnik) {
      return res.status(404).json({
        success: false,
        message: "Nije pronadjen!",
      });
    }

    const { sifra, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: "Profil",
      data: { ...rest },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Neuspesno!",
    });
  }
};

export const korisnikRezervacije = async (req, res) => {
  try {
    //1 vrati zakazivanja iz rezerv. za datog korisnika
    const zakazivanja = await Rezervacija.find({ korisnik: req.korisnikId });
    //2 izdvoji majstore iz rezerv.
    const majstorIds = zakazivanja.map((el) => el.majstor.id);

    //3 dohvati doktore koristeci docid
    const majstori = await Majstor.find({ _id: { $in: majstorIds } }).select(
      "-sifra"
    );

    res.status(200).json({
      success: true,
      message: "Uspesno",
      data: majstori,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Neuspesno!",
    });
  }
};
