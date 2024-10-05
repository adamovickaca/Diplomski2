import express, { Router } from "express";
import {
    dodajPoddelatnost,
    vratiSvePoddelatnosti,
    poddelatnosti
    
} from "../controllers/poddelatnostController.js";

const router = express.Router();

// Dodavanje nove poddelatnosti
router.post('/poddelatnost', dodajPoddelatnost);

// Vraćanje svih poddelatnosti za određenu delatnost
router.get('/poddelatnost/:delatnostId', vratiSvePoddelatnosti);

router.get('/sve', poddelatnosti)
export default router;
