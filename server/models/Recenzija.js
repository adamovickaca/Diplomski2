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
    select: "ime slika",
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
        brOcene: { $sum: 1 },
        prosOcena: { $avg: "$ocena" },
      },
    },
  ]);

  if (stats.length > 0) {
    // Ako postoje rezultati
    await Majstor.findByIdAndUpdate(majstorId, {
      sveOcene: stats[0].brOcene,  // Ovdje koristimo stats[0].numOfRating
      prosecnaOcena: stats[0].prosOcena, // Ovdje koristimo stats[0].avgRating
    });
  } else {
    // Ako nema ocena, postavimo nulte vrijednosti
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
