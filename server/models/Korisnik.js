import mongoose from "mongoose";

const Korisnik = new mongoose.Schema({
  ime: {
    type: String,
    required:true
  },
  prezime: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^\S+@\S+\.\S+$/.test(v); // Proverava validan email format
      },
      message: "Nevažeći email format",
    },
  },
  sifra: { type: String, required: true },
  brTelefona: { type: Number },
  slika: { type: String },
  role: {
    type: String,
    enum: ["korisnik", "admin"],
    default: "korisnik",
  },
  adresa: { type: String },
  grad: { type: String },
  zakazivanja: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rezervacija' }]
});

export default mongoose.model("Korisnik", Korisnik);
