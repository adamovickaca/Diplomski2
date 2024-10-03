import express, { Router } from "express";
import {
    dodajCenuUsluge,
    vratiCeneUslugaZaMajstora,
    azurirajCenuUsluge,

} from "../controllers/CenaUslugeController.js";

const router = express.Router();

// Ruta za dodavanje nove cene usluge
router.post('/', dodajCenuUsluge);

// Ruta za vraćanje cena usluga za određenog majstora
router.get('/:majstorId', vratiCeneUslugaZaMajstora);

// Ruta za ažuriranje cene usluge
router.put('/:cenaUslugeId', azurirajCenuUsluge);

export default router;
