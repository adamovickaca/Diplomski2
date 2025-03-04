import Delatnost from "../models/Delatnost.js";
import Poddelatnost from "../models/Poddelatnost.js";

export const dodajDelatnost = async (req, res) => {
  const { naziv, opis, slika } = req.body;

  try {
    let delatnost = await Delatnost.findOne({ naziv });

    if (delatnost) {
      return res.status(400).json({ message: "Delatnost vec postoji" });
    }

    delatnost = new Delatnost({ naziv, opis, slika });
    await delatnost.save();
    res
      .status(200)
      .json({ success: true, message: "Uspesno ste dodali delatnost!" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Neuspesno, pokusajte ponovo",
      error: err.message,
    });
  }
};

export const azurirajDelatnost = async (req, res) => {
  const id = req.params.id;
  try {
    const azuriran = await Delatnost.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Uspesno azuriran!",
      data: azuriran,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Neuspesno azuriran",
    });
  }
};

export const obrisiDelatnost = async (req, res) => {
  const id = req.params.id;
  try {
    const obrisan = await Delatnost.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Uspesno obrisan!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Neuspesno brisanje!",
    });
  }
};

export const vratiDelatnosti = async (req, res) => {
  try {
    const delatnosti = await Delatnost.find(); // Preuzima sve delatnosti

    return res.status(200).json({
      success: true,
      data: delatnosti,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Greška prilikom vraćanja delatnosti",
      error: err.message,
    });
  }
};

export const vratiDelatnostiIPoddelatnosti = async (req, res) => {
  try {
    // Preuzmi sve delatnosti
    const delatnosti = await Delatnost.find();

    // Preuzmi sve poddelatnosti
    const poddelatnosti = await Poddelatnost.find();

    // Grupišemo poddelatnosti po delatnostima
    const delatnostiSaPoddelatnostima = delatnosti.map(delatnost => {
      // Filtriramo poddelatnosti koje pripadaju trenutnoj delatnosti
      const relevantPoddelatnosti = poddelatnosti.filter(p => p.delatnost.equals(delatnost._id));

      // Vraćamo delatnost sa svim relevantnim poddelatnostima
      return {
        ...delatnost._doc,
        poddelatnosti: relevantPoddelatnosti, // Uključujemo sve informacije iz poddelatnosti
      };
    });

    res.status(200).json({
      success: true,
      data: delatnostiSaPoddelatnostima,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
