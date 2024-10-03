import express, { Router } from "express";
import {
    dodajDelatnost,
    vratiDelatnosti,
    obrisiDelatnost,
    azurirajDelatnost

} from "../controllers/delatnostController.js";

const router = express.Router();

// Ruta za dodavanje nove delatnosti
router.post('/delatnost', dodajDelatnost);

// Ruta za ažuriranje delatnosti
router.put('/delatnost/:id', azurirajDelatnost);

// Ruta za brisanje delatnosti
router.delete('/delatnost/:id', obrisiDelatnost);

// Ruta za vraćanje svih delatnosti
router.get('/delatnosti', vratiDelatnosti)

export default router;
