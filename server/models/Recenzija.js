import mongoose from "mongoose";
import Majstor from "./Majstor.js";

const Recenzija = new mongoose.Schema(
  {
    majstor: {
      type: mongoose.Types.ObjectId,
      ref: "Majstor",
    },
    korisnik: {
      type: mongoose.Types.ObjectId,
      ref: "Korisnik",
    },
    recenzijaText: {
      type: String,
      required: true,
    },
    ocena: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

Recenzija.pre(/^find/, function(next){
  this.populate({
    path:'korisnik',
    select: "name photo",
  });
  next();
})

Recenzija.statics.calcAverageRating = async function (majstorId) {
  // Ova funkcija se koristi za izračunavanje prosečne ocene
  const stats = await this.aggregate([
    {
      $match: { majstor: majstorId },
    },
    {
      $group: {
        _id: "$majstor",
        sveOcene: { $sum: 1 },
        prosecnaOcena: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    // Ako postoje rezultati
    await Majstor.findByIdAndUpdate(majstorId, {
      sveOcene: stats[0].numOfRating,  // Ovdje koristimo stats[0].numOfRating
      prosecnaOcena: stats[0].avgRating, // Ovdje koristimo stats[0].avgRating
    });
  } else {
    // Ako nema ocjena, postavimo nulte vrijednosti
    await Majstor.findByIdAndUpdate(majstorId, {
      sveOcene: 0,
      prosecnaOcena: 0,
    });
  }
};


Recenzija.post("save", function () {
  this.constructor.calcAverageRating(this.majstor);
});


export default mongoose.model("Recenzija", Recenzija);
