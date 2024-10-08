import express, { Router } from "express";
import {
 odobriMajstora,
 odbijMajstora,
 vratiSveMajstore,
 vratiMajstoreNaCekanju,
 vratiMajstorePrihvacene
} from "../controllers/adminController.js";

const router = express.Router();

// Ruta za odobravanje majstora
router.put('/majstori/odobri/:majstorId', odobriMajstora);

// Ruta za odbijanje majstora
router.put('/majstori/odbij/:majstorId', odbijMajstora);

// Ruta za vraćanje svih majstora
router.get('/majstori', vratiSveMajstore);

// Ruta za vraćanje majstora na čekanju
router.get('/majstori/nacekanju', vratiMajstoreNaCekanju);

// Ruta za vraćanje prihvaćenih majstora
router.get('/majstori/prihvaceni', vratiMajstorePrihvacene);

export default router;
