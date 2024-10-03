import mongoose from 'mongoose';

const CenaUsluge = new mongoose.Schema({
  majstor: { type: mongoose.Schema.Types.ObjectId, ref: 'Majstor', required: true },
  poddelatnost: { type: mongoose.Schema.Types.ObjectId, ref: 'Poddelatnost', required: true },
  usluga: { type: String, required: true }, // Naziv usluge
  opis: { type: String }, // Opis usluge
  cena: { type: String, required: true }, // Cena usluge (može biti string za različite formate)
  tipCene: {type:String} //npr po satu, kvadratu, fixna  
});

export default mongoose.model('CenaUsluge', CenaUsluge);