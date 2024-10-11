import mongoose from "mongoose";
import Majstor from "./Majstor.js";

const RezervacijaSchema = new mongoose.Schema(
  {
    korisnik: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Korisnik",
      required: true,
    },
    cena: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CenaUsluge",
      required: true,
    },
    datumRezervacije: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["naCekanju", "prihvacena", "otkazana", "zavrsena", "pomerena"],
      default: "naCekanju",
    },
    placeno: {
      type: Boolean,
      default: false,
    },
    napomena: {
      type: String,
      default: '',
    },
    odgovorMajstora: {
      type: String,
      default: '',
    },

  },
  { timestamps: true }
);
/*
RezervacijaSchema.pre("save", async function (next) {
  // Prvo učitajte majstora
  const majstor = await Majstor.findById(this.majstor);
  if (!majstor) {
    return next(new Error("Majstor nije pronađen."));
  }

  // Proverite da li je datum rezervacije slobodan
  if (majstor.termini.includes(this.datumRezervacije)) {
    return next(new Error("Termin nije slobodan."));
  }

  // Ako je slobodan, dodajte rezervaciju i uklonite termin
  majstor.termini.pull(this.datumRezervacije);
  await majstor.save();
  
  next();
});
*/

export default mongoose.model("Rezervacija", RezervacijaSchema);
