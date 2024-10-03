import Recenzija from "../models/Recenzija.js";
import Majstor from "../models/Majstor.js";

//get all reviews
export const sveRecenzije = async (req, res) => {
  try {
    const recenzije = await Recenzija.find({});
    res.status(200).json({
      success: true,
      message: "Uspesno",
      data: recenzije,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Greska",
    });
  }
};

//create review
export const novaRecenzija = async (req, res) => {
  if (!req.body.majstor) {
    req.body.majstor = req.params.majstorId;
  }
  if (!req.body.korisnik) {
    req.body.korisnik = req.korisnikId;
  }
  console.log(req.body.korisnik);
  const novaRec = new Recenzija(req.body);
  try {
    const sacuvajRec = await novaRec.save();

    await Majstor.findByIdAndUpdate(req.body.majstor, {
      $push: { recenzije: sacuvajRec._id },
    });

    res.status(200).json({
      success: true,
      message: "Uspesno!",
      data: sacuvajRec,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Neuspesno!",
    });
  }
};
