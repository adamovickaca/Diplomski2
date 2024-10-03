import express, { Router } from "express";
import {
    sveRecenzije,
    novaRecenzija

} from "../controllers/recenzijaController.js";

const router = express.Router();


// Ruta za dobijanje svih recenzija
router.get('/recenzije', sveRecenzije);

// Ruta za kreiranje nove recenzije
router.post('/recenzije/:majstorId', novaRecenzija);


export default router;
