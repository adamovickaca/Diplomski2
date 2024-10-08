import CenaUsluge from "../models/CenaUsluge.js";
import Majstor from "../models/Majstor.js";
import Poddelatnost from "../models/Poddelatnost.js";
import mongoose from "mongoose";

export const dodajCenuUsluge = async (req, res) => {
  const { majstor, poddelatnost, usluga, opis, cena, tipCene } = req.body;

  // Proverava da li su svi obavezni podaci prisutni
  if (!majstor || !poddelatnost || !usluga || !cena) {
    return res.status(400).json({ success: false, message: "Svi obavezni podaci moraju biti prisutni" });
  }

  try {
    // Proverava da li majstor postoji
    const majstorPostoji = await Majstor.findById(majstor);
    if (!majstorPostoji) {
      return res.status(400).json({ success: false, message: "Majstor ne postoji" });
    }

    // Proverava da li poddelatnost postoji
    const poddelatnostPostoji = await Poddelatnost.findById(poddelatnost);
    if (!poddelatnostPostoji) {
      return res.status(400).json({ success: false, message: "Poddelatnost ne postoji" });
    }

    // Kreira novu cenu usluge
    const novaCenaUsluge = new CenaUsluge({
      majstor,
      poddelatnost,
      usluga,
      opis,
      cena,
      tipCene,
    });

    // Čuva novu cenu usluge u bazi
    await novaCenaUsluge.save();

    return res.status(201).json({ success: true, message: "Uspesno ste dodali cenu usluge!", novaCenaUsluge });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Greška prilikom dodavanja cene usluge",
      error: err.message,
    });
  }
};

export const vratiCeneUslugaZaMajstora = async (req, res) => {
    const { majstorId } = req.params; // Uzimamo majstorId iz parametara rute
  
    // Proverava da li je ID majstora validan
    if (!mongoose.Types.ObjectId.isValid(majstorId)) {
      return res.status(400).json({ success: false, message: "Nevažeći ID majstora" });
    }
  
    try {
      // Pronalazi cene usluga za zadatog majstora
      const ceneUsluga = await CenaUsluge.find({ majstor: majstorId })
        .populate('poddelatnost') // Popunjava poddelatnost za bolji odgovor
        .exec();
  
      return res.status(200).json({
        success: true,
        data: ceneUsluga,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Greška prilikom vraćanja cena usluga",
        error: err.message,
      });
    }
  };

  export const azurirajCenuUsluge = async (req, res) => {
    const { cena, opis, tipCene } = req.body;
    const { cenaUslugeId } = req.params; // Uzimamo ID cene usluge iz parametara rute
  
    // Proverava da li je ID cene usluge validan
    if (!mongoose.Types.ObjectId.isValid(cenaUslugeId)) {
      return res.status(400).json({ success: false, message: "Nevažeći ID cene usluge" });
    }
  
    try {
      // Pronalazi cenu usluge po ID-u
      const cenaUsluge = await CenaUsluge.findById(cenaUslugeId);
      if (!cenaUsluge) {
        return res.status(404).json({ success: false, message: "Cena usluge nije pronađena" });
      }
  
      // Ažurira podatke cene usluge
      if (cena) cenaUsluge.cena = cena;
      if (opis) cenaUsluge.opis = opis;
      if (tipCene) cenaUsluge.tipCene = tipCene;
  
      // Čuva izmene u bazi
      await cenaUsluge.save();
  
      return res.status(200).json({ success: true, message: "Cena usluge uspešno ažurirana", cenaUsluge });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Greška prilikom ažuriranja cene usluge",
        error: err.message,
      });
    }
  };

  export const obrisiCenuUsluge = async (req, res) => {
    const { cenaUslugeId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(cenaUslugeId)) {
      return res.status(400).json({ success: false, message: "Nevažeći ID cene usluge" });
    }
  
    try {
      const deletedCenaUsluge = await CenaUsluge.findByIdAndDelete(cenaUslugeId);
      if (!deletedCenaUsluge) {
        return res.status(404).json({ success: false, message: "Cena usluge nije pronađena" });
      }
  
      return res.status(200).json({ success: true, message: "Cena usluge uspešno obrisana" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Greška prilikom brisanja cene usluge",
        error: err.message,
      });
    }
  };
  