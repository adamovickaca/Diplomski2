import mongoose from "mongoose";

const Majstor = new mongoose.Schema({
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
  role: { type: String, default: 'majstor' },
  adresa: { type: String },
  grad: { type: String },

  //specificna polja za majstore
  poddelatnost: { type: mongoose.Schema.Types.ObjectId, ref: 'Poddelatnost' },
  kvalifikacija: { type: [String] },
  iskustvo: { type: [String] },
  bio: { type: String, maxLength: 500 },
  oMajstoru: { type: String },
  termini: { type: [Date] },
  recenzije: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recenzija' }],
  prosecnaOcena: { type: Number, default: 0 },
  sveOcene: { type: Number, default: 0 },
  status: { type: String, enum: ['naCekanju', 'prihvacen', 'otkazan'], default: 'naCekanju' },
  zakazivanja: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rezervacija' }]

});

export default mongoose.model("Majstor", Majstor);
