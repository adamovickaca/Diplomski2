import Majstor from "../models/Majstor.js";
import Rezervacija from "../models/Rezervacija.js";
import mongoose from "mongoose";


export const azurirajMajstora = async (req, res) => {
  const id = req.params.id;
  try {
    const azuriranMajstor = await Majstor.findByIdAndUpdate(
      id,
      { $set: req.body }, //Koristi MongoDB $set operator da ažurira polja dokumenta prema podacima u req.body.
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Uspesno azuriran!",
      data: azuriranMajstor,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Neuspesno!",
    });
  }
};

export const obrisiMajstora = async (req, res) => {
  const id = req.params.id;
  try {
    const obrisanMajstor = await Majstor.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Uspesno obrisan!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Neuspesno!",
    });
  }
};

export const vratiMajstora = async (req, res) => {
  const id = req.params.id;
  try {
    const majstor = await Majstor.findById(id)
      .populate("recenzije")
      .select("-sifra");

    res.status(200).json({
      success: true,
      message: "Uspesno!",
      data: majstor,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Neuspesno!",
    });
  }
};

export const filterMajstorIme = async (req, res) => {
  try {
    const { ime } = req.query;
    console.log("Query Params:", { ime });

    let filter = { status: "prihvacen" };

    if (ime) {
      filter.ime = { $regex: ime, $options: "i" };
    }

    const majstori = await Majstor.find(filter).select("-sifra");

    if (majstori.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Ne postoje majstori sa datim imenom!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Found",
      data: majstori,
    });
  } catch (err) {
    console.error("Error in filterMajstorIme:", err);
    res.status(500).json({
      success: false,
      message: "Error, try again",
    });
  }
};


export const filterMajstorGrad = async (req, res) => {
  try {
    const { grad } = req.query; // Preuzmite query parametre iz URL-a
    console.log("Query Params:", { grad }); // Proverite šta se preuzima

    let filter = { status: "prihvacen" };

    if (grad) {
      filter.grad = { $regex: grad, $options: "i" }; // Pretražuje po gradu
    }

    const majstori = await Majstor.find(filter).select(
      "-sifra"
    );

    if (majstori.length === 0) {
      // Ako nema rezultata, vratite sve servisne pružatelje kao alternativu
      return res.status(200).json({
        success: true,
        message:
          "Nema pronadjenih rezultata!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Found",
      data: majstori,
    });
  } catch (err) {
    console.error(err); // Dodajte više informacija o grešci
    res.status(500).json({
      success: false,
      message: "Error, try again",
    });
  }
};

export const majstorProfil = async (req, res) => {
  const majstorId = req.params.id;
  try {
    const majstor = await Majstor.findById(majstorId);
    if (!majstor) {
      return res.status(404).json({
        success: false,
        message: "Majstor nije pronadjen!",
      });
    }

    const { sifra, ...rest } = majstor._doc;
    const zakazivanja = await Rezervacija.find({ majstor: majstorId });

    res.status(200).json({
      success: true,
      message: "Profil",
      data: { ...rest, zakazivanja },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Neuspesno!",
    });
  }
};

export const dodajTermin = async (req, res) => {
  const majstorId = req.params.id; // Uzimamo ID majstora iz URL-a
  const { noviTermin } = req.body; // Pretpostavljamo da noviTermin dolazi u telu zahteva

  // Proverava da li je ID majstora validan
  if (!mongoose.Types.ObjectId.isValid(majstorId)) {
      return res.status(400).json({ message: 'Nevažeći ID majstora' });
  }

  try {
      // Pronalazi majstora po ID-u
      const majstor = await Majstor.findById(majstorId);
      if (!majstor) {
          return res.status(404).json({ message: 'Majstor nije pronađen' });
      }

      // Proverava da li je noviTermin validan
      const datum = new Date(noviTermin);
      if (isNaN(datum)) {
          return res.status(400).json({ message: 'Nevažeći datum' });
      }

      // Dodaje novi termin u niz termina
      majstor.termini.push(datum); // Dodaje datum u niz termina

      // Čuva izmene u bazi
      await majstor.save();

      return res.status(200).json({ message: 'Termin uspešno dodat', majstor });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Greška prilikom dodavanja termina', error });
  }
};