import Rezervacija from "../models/Rezervacija.js";
import Majstor from "../models/Majstor.js";
import CenaUsluge from "../models/CenaUsluge.js";

import mongoose from "mongoose";

export const zakaziTermin = async (req, res) => {
  const { korisnik, cena, datumRezervacije } = req.body;

  // Proverava da li su potrebni podaci prisutni
  if (!korisnik || !cena || !datumRezervacije) {
    return res
      .status(400)
      .json({ success: false, message: "Svi podaci su obavezni." });
  }

  // Proverava da li je ID cene validan
  if (!mongoose.Types.ObjectId.isValid(cena)) {
    return res
      .status(400)
      .json({ success: false, message: "Nevažeći ID cene." });
  }

  // Proverava da li je datum u budućnosti
  const now = new Date();
  if (new Date(datumRezervacije) < now) {
    return res
      .status(400)
      .json({ success: false, message: "Datum rezervacije mora biti u budućnosti." });
  }

  try {
    // Proveri da li već postoji rezervacija za dati termin
    const existingReservation = await Rezervacija.findOne({
      cena,
      datumRezervacije,
    });

    if (existingReservation) {
      return res.status(400).json({
        success: false,
        message: "Termin je već zauzet.",
      });
    }

    // Kreira novu rezervaciju
    const novaRezervacija = new Rezervacija({
      korisnik,
      cena,
      datumRezervacije,
    });

    // Čuva rezervaciju u bazi
    await novaRezervacija.save();

    // Učitava cenu sa referencom na majstora
    const cenaUsluge = await CenaUsluge.findById(cena).populate("majstor");

    if (cenaUsluge) {
      const majstorId = cenaUsluge.majstor;

      // Ažurira polje zakazivanja u modelu Majstor
      await Majstor.findByIdAndUpdate(majstorId, {
        $push: { zakazivanja: novaRezervacija._id },
        $pull: { termini: datumRezervacije }
      });

      // Ažurira korisnika dodavanjem rezervacije
      await Korisnik.findByIdAndUpdate(korisnik, {
        $push: { rezervacije: novaRezervacija._id },
      });

      // Učitava rezervaciju sa detaljima
      const rezervacijaSaDetaljima = await Rezervacija.findById(
        novaRezervacija._id
      ).populate({
        path: "cena",
        populate: {
          path: "majstor",
          model: "Majstor",
        },
      });

      return res.status(201).json({
        success: true,
        message: "Rezervacija uspešno dodata.",
        rezervacija: rezervacijaSaDetaljima,
      });
    } else {
      return res.status(404).json({ success: false, message: "Cena usluge nije pronađena." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Greška prilikom dodavanja rezervacije.",
      error: error.message,
    });
  }
};



export const vratiSveRezervacije = async (req, res) => {
  const { userId } = req; // pretpostavljamo da userId dolazi iz autentifikacije

  try {
    const rezervacije = await Rezervacija.find({ user: userId })
    .populate({
      path: 'cena',
      populate: {
        path: 'majstor',
        model: 'Majstor',
      },
    });

    return res.status(200).json({ success: true, data: rezervacije });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({
        success: false,
        message: "Greška prilikom vraćanja rezervacija",
        error: err.message,
      });
  }
};

export const otkaziRezervaciju = async (req, res) => {
  const { rezervacijaId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(rezervacijaId)) {
    return res
      .status(400)
      .json({ success: false, message: "Nevažeći ID rezervacije" });
  }

  try {
    const rezervacija = await Rezervacija.findById(rezervacijaId);
    if (!rezervacija) {
      return res
        .status(404)
        .json({ success: false, message: "Rezervacija nije pronađena" });
    }

    rezervacija.status = "otkazana";
    await rezervacija.save();

    // Vraćanje termina majstoru
    const majstor = await Majstor.findById(rezervacija.majstor);
    if (majstor) {
      majstor.termini.push(rezervacija.datumRezervacije);
      await majstor.save();
    }

    return res
      .status(200)
      .json({ success: true, message: "Rezervacija otkazana", rezervacija });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({
        success: false,
        message: "Greška prilikom otkazivanja rezervacije",
        error: err.message,
      });
  }
};

export const izmeniRezervaciju = async (req, res) => {
  const { rezervacijaId } = req.params;
  const { cena, datumRezervacije, status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(rezervacijaId)) {
    return res
      .status(400)
      .json({ success: false, message: "Nevažeći ID rezervacije" });
  }

  try {
    const rezervacija = await Rezervacija.findById(rezervacijaId);
    if (!rezervacija) {
      return res
        .status(404)
        .json({ success: false, message: "Rezervacija nije pronađena" });
    }

    // Ako se menja datum rezervacije, proveriti da li je termin slobodan
    if (datumRezervacije) {
      const majstor = await Majstor.findById(rezervacija.majstor);
      if (!majstor.termini.includes(new Date(datumRezervacije))) {
        return res
          .status(400)
          .json({ success: false, message: "Termin nije slobodan." });
      }
      rezervacija.datumRezervacije = datumRezervacije;
    }

    if (cena) rezervacija.cena = cena;
    if (status) rezervacija.status = status;

    await rezervacija.save();

    return res
      .status(200)
      .json({
        success: true,
        message: "Rezervacija uspešno izmenjena",
        rezervacija,
      });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({
        success: false,
        message: "Greška prilikom izmene rezervacije",
        error: err.message,
      });
  }
};

export const izmeniStatusRezervacije = async (req, res) => {
  const { rezervacijaId } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(rezervacijaId)) {
    return res.status(400).json({ success: false, message: "Nevažeći ID rezervacije" });
  }

  try {
    const rezervacija = await Rezervacija.findById(rezervacijaId);
    if (!rezervacija) {
      return res.status(404).json({ success: false, message: "Rezervacija nije pronađena" });
    }

    rezervacija.status = status;
    await rezervacija.save();

    return res.status(200).json({ success: true, message: "Status rezervacije uspešno izmenjen", rezervacija });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Greška prilikom izmene statusa rezervacije", error: err.message });
  }
};
