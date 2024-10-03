import express, { Router } from "express";
import {
    dodajPoddelatnost,
    vratiSvePoddelatnosti

} from "../controllers/poddelatnostController.js";

const router = express.Router();

// Dodavanje nove poddelatnosti
router.post('/poddelatnost', dodajPoddelatnost);

// Vraćanje svih poddelatnosti za određenu delatnost
router.get('/poddelatnost/:delatnostId', vratiSvePoddelatnosti);

export default router;
