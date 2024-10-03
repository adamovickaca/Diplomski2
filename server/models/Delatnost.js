import mongoose from 'mongoose';

const Delatnost = new mongoose.Schema({
  naziv: { type: String, required: true, unique: true },
  opis: { type: String },
  slika: { type: String } 
});

export default mongoose.model('Delatnost', Delatnost);