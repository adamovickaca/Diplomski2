import mongoose from 'mongoose';

const Poddelatnost = new mongoose.Schema({
  naziv: { type: String, required: true, unique: true },
  slika: { type: String },
  delatnost: { type: mongoose.Schema.Types.ObjectId, ref: 'Delatnost', required: true }
});

export default mongoose.model('Poddelatnost', Poddelatnost);

