import Poddelatnost from "../models/Poddelatnost.js";
import Delatnost from "../models/Delatnost.js"; // Uverite se da je putanja ispravna

export const dodajPoddelatnost = async (req, res) => {
  const { naziv, delatnost, slika } = req.body;
  console.log("Request Body:", req.body);

  // Proverava da li su potrebni podaci prisutni
  if (!naziv || !delatnost) {
    return res.status(400).json({ success: false, message: "Naziv i delatnost su obavezni" });
  }

  try {
    // Proverava da li delatnost postoji
    const delatnostPostoji = await Delatnost.findById(delatnost);
    if (!delatnostPostoji) {
      return res.status(400).json({ success: false, message: "Delatnost ne postoji" });
    }

    // Proverava da li poddelatnost već postoji
    let poddelatnost = await Poddelatnost.findOne({ naziv, delatnost });
    if (poddelatnost) {
      return res.status(400).json({ success: false, message: "Poddelatnost već postoji" });
    }

    // Kreira novu poddelatnost
    poddelatnost = new Poddelatnost({ naziv, delatnost, slika });
    console.log("Naziv:", naziv);
    await poddelatnost.save();
    

    return res.status(201).json({ success: true, message: "Uspešno ste dodali poddelatnost!", poddelatnost });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Greška prilikom dodavanja poddelatnosti",
      error: err.message,
    });
  }
};


export const vratiSvePoddelatnosti = async (req, res) => {
    const { delatnostId } = req.params; // Uzimamo delatnostId iz parametara rute
  
    // Proverava da li je ID delatnosti validan
    if (!mongoose.Types.ObjectId.isValid(delatnostId)) {
      return res.status(400).json({ success: false, message: "Nevažeći ID delatnosti" });
    }
  
    try {
      // Pronalazi poddelatnosti za zadatu delatnost
      const poddelatnosti = await Poddelatnost.find({ delatnost: delatnostId });
  
      return res.status(200).json({
        success: true,
        data: poddelatnosti,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Greška prilikom vraćanja poddelatnosti",
        error: err.message,
      });
    }
  };