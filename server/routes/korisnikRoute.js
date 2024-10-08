import express, { Router } from "express";
import {
  azurirajKorisnika,
  obrisiKorisnika,
  vratiKorisnika,
  vratiSveKorisnike,
  profilKorisnika,
  korisnikRezervacije,
} from "../controllers/korisnikController.js";
import {authentificate} from "../auth/verifyToken.js"
const router = express.Router();

router.put('/korisnik/:id', authentificate, azurirajKorisnika);
router.delete('/korisnik/:id', obrisiKorisnika);
router.get('/korisnik/:id', vratiKorisnika);
router.get('/korisnici', vratiSveKorisnike);
router.get('/profil', authentificate,  profilKorisnika); // Koristi auth middleware za korisnika
router.get('/rezervacije', authentificate, korisnikRezervacije); 

export default router;
