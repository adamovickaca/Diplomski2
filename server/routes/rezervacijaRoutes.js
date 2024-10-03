import express, { Router } from "express";
import {
    zakaziTermin,
    vratiSveRezervacije,
    otkaziRezervaciju,
    izmeniRezervaciju

} from "../controllers/rezervacijaController.js";

const router = express.Router();

// Ruta za zakazivanje termina
router.post('/rezervacije', zakaziTermin);

// Ruta za vraćanje svih rezervacija korisnika
router.get('/rezervacije', vratiSveRezervacije);

// Ruta za otkazivanje rezervacije
router.delete('/rezervacije/:rezervacijaId', otkaziRezervaciju);

// Ruta za izmenu rezervacije
router.put('/rezervacije/:rezervacijaId', izmeniRezervaciju);

export default router;
