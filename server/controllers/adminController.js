import Majstor from "../models/Majstor.js";
import mongoose from "mongoose";

export const odobriMajstora = async (req, res) => {
  const { majstorId } = req.params;

  // Proverava da li je ID majstora validan
  if (!mongoose.Types.ObjectId.isValid(majstorId)) {
    return res.status(400).json({ success: false, message: "Nevažeći ID majstora" });
  }

  try {
    // Pronalazi majstora po ID-u
    const majstor = await Majstor.findById(majstorId);
    if (!majstor) {
      return res.status(404).json({ success: false, message: "Majstor nije pronađen" });
    }

    // Ažurira status majstora na "prihvacen"
    majstor.status = "prihvacen";
    await majstor.save();

    return res.status(200).json({ success: true, message: "Majstor je uspešno odobren", majstor });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Greška prilikom odobravanja majstora", error: err.message });
  }
};

export const odbijMajstora = async (req, res) => {
  const { majstorId } = req.params;

  // Proverava da li je ID majstora validan
  if (!mongoose.Types.ObjectId.isValid(majstorId)) {
    return res.status(400).json({ success: false, message: "Nevažeći ID majstora" });
  }

  try {
    // Pronalazi majstora po ID-u
    const majstor = await Majstor.findById(majstorId);
    if (!majstor) {
      return res.status(404).json({ success: false, message: "Majstor nije pronađen" });
    }

    // Ažurira status majstora na "otkazan"
    majstor.status = "otkazan";
    await majstor.save();

    return res.status(200).json({ success: true, message: "Majstor je uspešno odbijen", majstor });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Greška prilikom odbijanja majstora", error: err.message });
  }
};

export const vratiSveMajstore = async (req, res) => {
  try {
    const majstori = await Majstor.find().populate('poddelatnost').exec();
    return res.status(200).json({ success: true, data: majstori });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Greška prilikom vraćanja majstora", error: err.message });
  }
};

export const vratiMajstoreNaCekanju = async (req, res) => {
    try {
      const majstori = await Majstor.find({ status: 'naCekanju' }).populate('poddelatnost').exec();
      return res.status(200).json({ success: true, data: majstori });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Greška prilikom vraćanja majstora na čekanju", error: err.message });
    }
  };
  
  export const vratiMajstorePrihvacene = async (req, res) => {
    try {
      const majstori = await Majstor.find({ status: 'prihvacen' }).populate('poddelatnost').exec();
      return res.status(200).json({ success: true, data: majstori });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Greška prilikom vraćanja prihvaćenih majstora", error: err.message });
    }
  };
  