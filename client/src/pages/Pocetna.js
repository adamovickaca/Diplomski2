import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Button, Grid2, Card, CardMedia, CardContent } from "@mui/material";
import Image from "../assets/images/craftsman.jpg";
import SearchIcon from "@mui/icons-material/Search";
import HandymanSharpIcon from "@mui/icons-material/HandymanSharp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import ReviewsIcon from "@mui/icons-material/Reviews";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import { Link } from "react-router-dom";
import { Search } from "@mui/icons-material";
import pozadina from "../assets/images/pozadina.jpeg";
import slika from "../assets/images/slika.jpg";
import nadjiM from "../assets/images/nadjiMajstora2.png";
import nadjiMajstora from "../assets/images/nadjiMajstora.png";
import recenzija from "../assets/images/recenzija2.jpg";
import zakazi from "../assets/images/zakazi2.jpg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // Dodaj ovu liniju
import majstor from "../assets/images/univerzalno.jpeg";
import {
  AccordionActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BASE_URL } from "../config";

const HomePage = () => {
  const [delatnosti, setDelatnosti] = useState([]);
  const fetchDelatnosti = async () => {
    try {
      const response = await fetch(`${BASE_URL}/delatnosti/delatnosti`);
      if (!response.ok) {
        throw new Error("Greška prilikom učitavanja delatnosti");
      }
      const data = await response.json();
      if (Array.isArray(data.data)) {
        setDelatnosti(data.data);
      } else {
        console.error("Podaci nisu u ispravnom formatu");
      }
    } catch (error) {
      console.error("Greška:", error.message);
    } 
  };
  useEffect(() => {
    fetchDelatnosti();
  }, []);
  return (
    <Box>
      {/* Prva sekcija */}
      <Box
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            minHeight: "80vh",
            display: "flex",
            flexDirection: "row", // Raspoređuje elemente u red
          }}
        >
          {/* Leva strana sa tekstom */}
          <Grid
            container
            item
            xs={12}
            sm={6} // Smanjuje širinu do 6 kolona
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: 4, // Padding po potrebi
              ml:15
            }}
          >
            <Typography
              variant="h2"
              gutterBottom
              style={{ color: "#1A1C20" }}
            >
              Nađi
              <span style={{ backgroundColor: "#1A1C20", color: "#1976d2" }}>
                {" "}
                Majstora{" "}
              </span>
            </Typography>
            <Typography
              variant="h5"
              style={{ color: "#1A1C20", marginBottom: 15 }}
            >
              <SearchIcon size="large" />
              Pretražujte, birajte i angažujte najbolje majstore sa potvrđenim ocenama i recenzijama.
            </Typography>
          </Grid>

          {/* Desna strana sa slikom */}
          <Grid
            item
            xs={12}
            sm={6} // Smanjuje širinu do 6 kolona
            sx={{
              display: "flex", // Flex za centriranje slike
              justifyContent: "center", // Centriranje horizontalno
              alignItems: "center", // Centriranje vertikalno
              padding: 4, // Padding po potrebi
            }}
          >
            <img
              src={majstor} // Putanja do slike
              alt="Majstor"
              style={{
                maxWidth: "100%", // Ograničava širinu slike
                height: "auto", // Održava proporcije
              }}
            />
          </Grid>
        </Box>

        {/* Statistika */}
        <Grid
          container
          sx={{
            marginTop: "5px",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#1A1C20",
            padding: 3,
            width: "80%",
            margin: "0 auto",
            maxWidth: "900px",
            boxShadow: 5,
          }}
        >
          {/* Prva statistika */}
          <Box sx={{ margin: "0 auto", textAlign: "center" }}>
            <HandymanSharpIcon sx={{ color: "#F4F4F4" }} />
            <Typography style={{ color: "#F4F4F4" }}>8+</Typography>
            <Typography style={{ color: "#F4F4F4" }}>
              Različitih delatnosti
            </Typography>
          </Box>
          {/* Druga statistika */}
          <Box sx={{ margin: "0 auto", textAlign: "center" }}>
            <AccountCircleIcon sx={{ color: "#F4F4F4" }} />
            <Typography style={{ color: "#F4F4F4" }}>10+</Typography>
            <Typography style={{ color: "#F4F4F4" }}>
              Registrovanih korisnika
            </Typography>
          </Box>
          {/* Treća statistika */}
          <Box sx={{ margin: "0 auto", textAlign: "center" }}>
            <HomeRepairServiceIcon sx={{ color: "#F4F4F4" }} />
            <Typography style={{ color: "#F4F4F4" }}>10+</Typography>
            <Typography style={{ color: "#F4F4F4" }}>
              Registrovanih majstora
            </Typography>
          </Box>
          {/* Četvrta statistika */}
          <Box sx={{ margin: "0 auto", textAlign: "center" }}>
            <ReviewsIcon sx={{ color: "#F4F4F4" }} />
            <Typography style={{ color: "#F4F4F4" }}>10+</Typography>
            <Typography style={{ color: "#F4F4F4" }}>
              Recenzija i ocena
            </Typography>
          </Box>
        </Grid>
      </Box>

      {/* Druga sekcija */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F0F0F0",
          flexDirection: "column",
        }}
      >
        <Box sx={{ mb: 10, width: "70%" }}>
          <Typography variant="h3">Obezbedite sebi najbolje usluge</Typography>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Od vodoinstalatera do električara, naš sistem vam pomaže da
            pronađete stručnjake sa iskustvom i preporukama. Osigurajte
            kvalitetnu uslugu za svaki projekat u vašem domu.
          </Typography>
        </Box>
        {/* Grid za slike */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4} textAlign="center">
            {" "}
            <Box
              component="img"
              src={nadjiM}
              alt="Opis slike"
              sx={{ maxWidth: "100%", height: "auto", objectFit: "cover" }}
            />
            <Typography variant="h5">Pronadji majstora</Typography>
            <Typography variant="body2">
              Najbolji majstori iz svih oblasti na jednom mestu.
            </Typography>
         
          </Grid>
          <Grid item xs={12} sm={6} md={4} textAlign="center">
            {" "}
            <Box
              component="img"
              src={recenzija}
              alt="Opis slike"
              sx={{ maxWidth: "100%", height: "auto", objectFit: "cover" }}
            />
            <Typography variant="h5">Oceni majstore</Typography>
            <Typography variant="body2">
              Podeli svoje iskustvo i pomozi ostalima pri odabiru.
            </Typography>
            
          </Grid>
          <Grid item xs={12} sm={6} md={4} textAlign="center">
            {" "}
            <Box
              component="img"
              src={zakazi}
              alt="Opis slike"
              sx={{ maxWidth: "100%", height: "auto", objectFit: "cover" }}
            />
            <Typography variant="h5">Zakazi termin</Typography>
            <Typography variant="body2">Brzo i jednostavno.</Typography>
            {" "}
          </Grid>
        </Grid>
      </Box>

      {/* Treća sekcija */}
      <Box
        sx={{
          minHeight: "120vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#E0E0E0",
          flexDirection:"column"
        }}
      >
        <Typography variant="h3" sx={{mb:5}}>Delatnosti</Typography>
       <Grid container spacing={1} justifyContent="center">
        {delatnosti.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card sx={{ maxWidth: 345, height:305, ml: 9, mt: 2, mb: 2 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={item.slika || Image}
                title={item.opis}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.naziv}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {item.opis}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Box>

      {/* Četvrta sekcija */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F4F4F4",
        }}
      >
        <Grid container>
          <Grid item xs={12} md={6} textAlign="center">
            {/* Slika levo */}
            <Box
              component="img"
              src={nadjiMajstora} // Ovde dodaj svoju sliku
              alt="Često postavljana pitanja"
              sx={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ mt: 2, spacing: 2 }}>
              <Typography variant="h4" sx={{ mb: 3 }}>
                Često postavljana pitanja
              </Typography>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography variant="h6">
                    Šta dobijam ako se registrujem kao korisnik?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Mogućnost da zakažeš svoj termin kod majstora koji ti je
                    potreban, kao i mogućnost da oceniš majstora na osnovu
                    ličnog iskustva. Takođe, dobijaš i mogućnost da na jednom
                    mestu imaš svoje rezervacije.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography variant="h6">
                    Šta dobijam ako se registrujem kao majstor?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Imate mogućnost da do Vašeg naloga i usluga dođe veći broj
                    korisnika, te će se traženost Vaših usluga zagarantovano
                    povećati.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography variant="h6">
                    Kako mogu da kontaktiram majstora?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Nakon što pronađeš majstora preko naše platforme, možeš ga
                    kontaktirati putem poruka ili direktno putem telefona, ako
                    je dostupan.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography variant="h6">
                    Da li majstori donose svoj alat?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Da, uvek handyman donosi svoj alat, ali je dobro da se
                    unapred dogovorite o specifičnim alatima koji su potrebni za
                    Vaš projekat.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography variant="h6">
                    Da li je moja lična informacija sigurna?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Da, štitimo tvoje lične podatke i ne delimo ih sa trećim
                    stranama bez tvoje saglasnosti.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography variant="h6">
                    Kako mogu da izvestim o lošem iskustvu?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Ako imaš problema ili loše iskustvo, slobodno nas
                    kontaktiraj i podeli detalje kako bismo mogli da reagujemo.{" "}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
