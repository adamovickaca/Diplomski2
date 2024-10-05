import express, { Router } from "express";
import {
    dodajDelatnost,
    vratiDelatnosti,
    obrisiDelatnost,
    azurirajDelatnost,
    vratiDelatnostiIPoddelatnosti

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
router.get('/delatnost/podelatnost', vratiDelatnostiIPoddelatnosti )

export default router;
