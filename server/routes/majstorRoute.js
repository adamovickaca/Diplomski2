import express, { Router } from "express";
import {
  azurirajMajstora,
  obrisiMajstora,
  vratiMajstora,
  filterMajstorGrad,
  filterMajstorIme,
  majstorProfil,
  dodajTermin,
  filterMajstorPoddelatnost

} from "../controllers/majstorController.js";

const router = express.Router();


// Ažuriranje majstora
router.put('/majstor/:id', azurirajMajstora);

// Brisanje majstora
router.delete('/majstor/:id', obrisiMajstora);

// Vraćanje majstora po ID-u
router.get('/majstor/:id', vratiMajstora);

// Filtriranje majstora po imenu
router.get('/majstor/filter/ime', filterMajstorIme);

// Filtriranje majstora po gradu
router.get('/majstor/filter/grad', filterMajstorGrad);

// Prikaz profila majstora
router.get('/majstor/profil', majstorProfil); // Ovde se očekuje da imate middleware koji postavlja req.userId

// Dodavanje termina
router.post('/majstor/termin/:id', dodajTermin); // Ovde takođe postaviti middleware za autentifikaciju

router.get("/majstor/filter/poddelatnost", filterMajstorPoddelatnost )
export default router;
