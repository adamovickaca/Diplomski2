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

    const majstori = await Majstor.find(filter).select("-sifra");

    if (majstori.length === 0) {
      // Ako nema rezultata, vratite sve servisne pružatelje kao alternativu
      return res.status(200).json({
        success: true,
        message: "Nema pronadjenih rezultata!",
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

export const filterMajstorPoddelatnost = async (req, res) => {
  try {
    const { poddelatnost } = req.query; // Preuzmite query parametar iz URL-a
    console.log("Query Params:", { poddelatnost }); // Proverite šta se preuzima

    let filter = { status: "prihvacen" };

    if (poddelatnost) {
      filter.poddelatnost = poddelatnost; // Pretražuje po poddelatnosti
    }

    const majstori = await Majstor.find(filter)
      .populate("poddelatnost")
      .select("-sifra");

    if (majstori.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Nema pronađenih majstora sa tom poddelatnošću!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Pronađeni majstori",
      data: majstori,
    });
  } catch (err) {
    console.error("Error in filterMajstorPoddelatnost:", err);
    res.status(500).json({
      success: false,
      message: "Greška, pokušajte ponovo",
      error: err.message,
    });
  }
};

export const majstorProfil = async (req, res) => {
  const majstorId = req.params.id;
  try {
    const majstor = await Majstor.findById(majstorId)
      .populate("recenzije") // Popunite recenzije
      .exec();
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
  const majstorId = req.params.id; 
  const { noviTermin } = req.body; 

  if (!mongoose.Types.ObjectId.isValid(majstorId)) {
    return res.status(400).json({ message: "Nevažeći ID majstora" });
  }

  try {
    const majstor = await Majstor.findById(majstorId);
    if (!majstor) {
      return res.status(404).json({ message: "Majstor nije pronađen" });
    }

    const datum = new Date(noviTermin);
    if (isNaN(datum)) {
      return res.status(400).json({ message: "Nevažeći datum" });
    }

    // Proveri da li termin već postoji
    const terminExists = majstor.termini.some(existingTermin => {
      const existingDate = new Date(existingTermin);
      return existingDate.getTime() === datum.getTime(); // Proverava da li postoji termin sa istim vremenom
    });

    if (terminExists) {
      return res.status(400).json({ message: "Termin sa istim vremenom već postoji." });
    }

    majstor.termini.push(datum);
    await majstor.save();

    return res.status(200).json({ message: "Termin uspešno dodat", majstor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Greška prilikom dodavanja termina", error });
  }
};

export const getTermini = async (req, res) => {
  const majstorId = req.params.id; // Uzimamo ID majstora iz URL-a
  try {
    // Pronalazi majstora po ID-u
    const majstor = await Majstor.findById(majstorId).select("termini");
    if (!majstor) {
      return res.status(404).json({ message: "Majstor nije pronađen" });
    }

    // Vraća termine
    res.status(200).json({
      success: true,
      message: "Uspesno dobijeni termini",
      data: majstor.termini,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Greška prilikom dobijanja termina" });
  }
};

export const getTerminiZaDatum = async (req, res) => {
  const majstorId = req.params.id; // ID majstora iz URL-a
  const { datum } = req.query; // Datum iz query parametara

  try {
    // Proveri da li je datum validan
    const parsedDate = new Date(datum);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ message: "Nevažeći datum" });
    }

    // Pronađi majstora po ID-u
    const majstor = await Majstor.findById(majstorId).select("termini");
    if (!majstor) {
      return res.status(404).json({ message: "Majstor nije pronađen" });
    }

    // Filtriraj termine koji odgovaraju datumu
    const terminiZaDatum = majstor.termini.filter((termin) => {
      const terminDate = new Date(termin);
      return terminDate.toDateString() === parsedDate.toDateString();
    });

    res.status(200).json({
      success: true,
      message: "Uspesno dobijeni termini",
      data: terminiZaDatum,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Greška prilikom dobijanja termina" });
  }
};

// Izmeni termin
export const izmeniTermin = async (req, res) => {
  const majstorId = req.params.id; 
  const { stariTermin, noviTermin } = req.body; // Primamo stari i novi termin

  if (!mongoose.Types.ObjectId.isValid(majstorId)) {
    return res.status(400).json({ message: "Nevažeći ID majstora" });
  }

  try {
    const majstor = await Majstor.findById(majstorId);
    if (!majstor) {
      return res.status(404).json({ message: "Majstor nije pronađen" });
    }

    // Proveri da li stari termin postoji
    const index = majstor.termini.findIndex(termin => new Date(termin).toISOString() === new Date(stariTermin).toISOString());
    if (index !== -1) {
      // Ako postoji, izmeni ga
      majstor.termini[index] = new Date(noviTermin).toISOString();
      await majstor.save();
      return res.status(200).json({ message: "Termin uspešno izmenjen", majstor });
    } else {
      return res.status(404).json({ message: "Termin nije pronađen" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Greška prilikom izmena termina", error });
  }
};




// Izbriši termin
export const obrisiTermin = async (req, res) => {
  const majstorId = req.params.id; // ID majstora iz URL-a
  const { termin } = req.body; // Datum termina koji treba obrisati

  if (!mongoose.Types.ObjectId.isValid(majstorId)) {
    return res.status(400).json({ message: "Nevažeći ID majstora" });
  }

  try {
    const majstor = await Majstor.findById(majstorId);
    if (!majstor) {
      return res.status(404).json({ message: "Majstor nije pronađen" });
    }

    // Pronađi i izbriši termin
    const index = majstor.termini.findIndex(t => new Date(t).toISOString() === new Date(termin).toISOString());
    if (index === -1) {
      return res.status(404).json({ message: "Termin nije pronađen" });
    }

    majstor.termini.splice(index, 1);
    await majstor.save();
    return res.status(200).json({ message: "Termin uspešno obrisan", majstor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Greška prilikom brisanja termina", error });
  }
};


