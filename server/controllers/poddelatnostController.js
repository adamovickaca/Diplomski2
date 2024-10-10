import Poddelatnost from "../models/Poddelatnost.js";
import Delatnost from "../models/Delatnost.js"; // Uverite se da je putanja ispravna
import mongoose from 'mongoose';

export const dodajPoddelatnost = async (req, res) => {
  const { naziv, delatnost, slika } = req.body;
  console.log("Request Body:", req.body);

  // Proverava da li su potrebni podaci prisutni
  if (!naziv || !delatnost) {
    return res.status(400).json({ success: false, message: "Naziv i delatnost su obavezni" });
  }

  try {
    // Proverava da li delatnost postoji
    const delatnostPostoji = await Delatnost.findById(delatnost);
    if (!delatnostPostoji) {
      return res.status(400).json({ success: false, message: "Delatnost ne postoji" });
    }

    // Proverava da li poddelatnost već postoji
    let poddelatnost = await Poddelatnost.findOne({ naziv, delatnost });
    if (poddelatnost) {
      return res.status(400).json({ success: false, message: "Poddelatnost već postoji" });
    }

    // Kreira novu poddelatnost
    console.log("Kreiranje poddelatnosti sa podacima:", { naziv, delatnost, slika });

    poddelatnost = new Poddelatnost({ naziv, delatnost, slika });
    console.log(naziv, delatnost, slika);
    await poddelatnost.save();

    return res.status(201).json({ success: true, message: "Uspešno ste dodali poddelatnost!", poddelatnost });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Greška prilikom dodavanja poddelatnosti",
      error: err.message,
    });
  }
};


export const vratiSvePoddelatnosti = async (req, res) => {
    const { delatnostId } = req.params; // Uzimamo delatnostId iz parametara rute
  
    // Proverava da li je ID delatnosti validan
    if (!mongoose.Types.ObjectId.isValid(delatnostId)) {
      return res.status(400).json({ success: false, message: "Nevažeći ID delatnosti" });
    }
  
    try {
      // Pronalazi poddelatnosti za zadatu delatnost
      const poddelatnosti = await Poddelatnost.find({ delatnost: delatnostId });
  
      return res.status(200).json({
        success: true,
        data: poddelatnosti,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Greška prilikom vraćanja poddelatnosti",
        error: err.message,
      });
    }
  };

  export const poddelatnosti = async (req, res) => {
    try {
      const poddelatnosti = await Poddelatnost.find();
      
      if (!poddelatnosti.length) {
        return res.status(404).json({
          success: false,
          message: "Nema poddelatnosti!",
        });
      }
  
      res.status(200).json({
        success: true,
        data: poddelatnosti,
      });
    } catch (error) {
      console.error("Error in vratiSvePoddelatnosti:", error);
      res.status(500).json({
        success: false,
        message: "Greška, pokušajte ponovo.",
      });
    }
  };
  

export const azurirajPoddelatnost = async (req, res) => {
  const id = req.params.id; // Preuzmite ID iz parametara
  try {
    const azuriranaPoddelatnost = await Poddelatnost.findByIdAndUpdate(
      id,
      { $set: req.body }, // Koristite $set za ažuriranje polja
      { new: true, runValidators: true } // new: true vraća ažurirani dokument, runValidators: true pokreće validaciju
    );

    if (!azuriranaPoddelatnost) {
      return res.status(404).json({
        success: false,
        message: "Poddelatnost nije pronađena!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Uspesno azurirana poddelatnost!",
      data: azuriranaPoddelatnost,
    });
  } catch (err) {
    console.error("Error updating poddelatnost:", err);
    res.status(500).json({
      success: false,
      message: "Neuspesno ažuriranje poddelatnosti!",
      error: err.message,
    });
  }
};
