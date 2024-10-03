import express, { Router } from "express";
import {
  azurirajKorisnika,
  obrisiKorisnika,
  vratiKorisnika,
  vratiSveKorisnike,
  profilKorisnika,
  korisnikRezervacije,
} from "../controllers/korisnikController.js";

const router = express.Router();

router.put('/korisnik/:id', azurirajKorisnika);
router.delete('/korisnik/:id', obrisiKorisnika);
router.get('/korisnik/:id', vratiKorisnika);
router.get('/korisnici', vratiSveKorisnike);
router.get('/profil', profilKorisnika); // Koristi auth middleware za korisnika
router.get('/rezervacije', korisnikRezervacije); 

export default router;
