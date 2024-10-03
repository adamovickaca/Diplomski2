import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  naslov: {
    type: String,
    required: true,
  },
  tekst: {
    type: String,
    required: true,
  },
  slika: {
    type: String,
  },
  tag: {
    type: String,
    required: true,
    enum: ['Kuca', 'Dvoriste', 'Garderoba', 'Vozila'], // Možeš dodati i druge kategorije
  },
  kratakOpis:{
    type:String,
  }
}, { timestamps: true });


export default mongoose.model('Blog', blogSchema);