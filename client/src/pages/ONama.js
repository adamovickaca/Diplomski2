import React from "react";
import { Box, Typography, Grid, Button, Grid2 } from "@mui/material";
import Image from "../assets/images/craftsman.jpg";
import SearchIcon from "@mui/icons-material/Search";
import HandymanSharpIcon from "@mui/icons-material/HandymanSharp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import ReviewsIcon from "@mui/icons-material/Reviews";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import { Link } from "react-router-dom";
import { Person, Search } from "@mui/icons-material";
import pozadina from "../assets/images/pozadina.jpeg";
import slika from "../assets/images/slika.jpg";
import nadjiM from "../assets/images/nadjiMajstora2.png";
import nadjiMajstora from "../assets/images/nadjiMajstora.png";
import recenzija from "../assets/images/recenzija2.jpg";
import zakazi from "../assets/images/zakazi2.jpg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // Dodaj ovu liniju
import majstor from "../assets/images/univerzalno3.jpg";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import {
  AccordionActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ONama = () => {
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
              O nama
              
            </Typography>
            <Typography
              variant="h6"
              style={{ color: "#1A1C20", marginBottom: 15 }}
            >
              Naša inovativna platforma stvorena je da unapredi način na koji korisnici pronalaze majstore za sve svoje potrebe. Bilo da vam je potreban vodoinstalater, električar, stolarski ili građevinski majstor, naša aplikacija omogućava jednostavno povezivanje s kvalifikovanim stručnjacima..
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
                maxWidth: "65%", // Ograničava širinu slike
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
              ml: 10,
              mt:10
            }}
          >
            <Typography variant="h2" gutterBottom style={{ color: "#1A1C20" }}>
              Nađi
              <span style={{ backgroundColor: "#1A1C20", color: "#F0A500" }}>
                {" "}
                Majstora{" "}
              </span>
            </Typography>
            <Typography
              variant="h5"
              style={{ color: "#1A1C20", marginBottom: 15 }}
            >
              Naš cilj je da olakšamo proces pronalaženja kvalifikovanih majstora za sve vrste poslova, od popravki i renoviranja do različitih zanatskih usluga.
            </Typography>
            <Typography
              variant="h5"
              style={{ color: "#1A1C20", marginBottom: 15 }}
            >
              Sa našom platformom, korisnici mogu jednostavno pregledati profile majstora, pročitati recenzije drugih korisnika, i kontaktirati odabrane majstore direktno putem platforme.
            </Typography>
            <Typography
              variant="h5"
              style={{ color: "#1A1C20", marginBottom: 15 }}
            >
              Takođe, omogućujemo majstorima da promovišu svoje usluge i pruže informacije o svom radu na jednom mestu.
            </Typography>
          </Grid>

          {/* Desna strana  */}
          {/* Desna strana  */}
          <Grid
            xs={12}
            sm={6} // Smanjuje širinu do 6 kolona
            sx={{
              display: "flex", // Flex za centriranje sadržaja
              justifyContent: "flex-start", // Levo poravnanje
              alignItems: "flex-start", // Vertikalno poravnanje na vrh
              padding: 4, // Padding po potrebi
              flexDirection: "column",
              mt:25
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom:4}}
            >
              <AccountCircleIcon fontSize="large" />
              <Typography variant="h5" sx={{ marginLeft: 1, fontWeight:"bold"}}>
                Napravite nalog jednostavno i brzo!
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom:4}}
            >
              <PersonSearchIcon fontSize="large" />
              <Typography variant="h5" sx={{ marginLeft: 1, fontWeight:"bold" }}>
                Filtrirajte majstore i izaberite pravog!
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom:4}}
            >
              <EventAvailableIcon fontSize="large"/>
              <Typography variant="h5" sx={{ marginLeft: 1, fontWeight:"bold" }}>
                Zakažite svoj termin!
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 4 }}
            >
              <ChromeReaderModeIcon fontSize="large"/>
              <Typography variant="h5" sx={{ marginLeft: 1, fontWeight:"bold" }}>
                Čitajte naše blogove i iskoristite ideje!
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom:4}}
            >
              <ReviewsIcon fontSize="large" />
              <Typography variant="h5" sx={{ marginLeft: 1, fontWeight:"bold" }}>
                Ostavite recenziju!
              </Typography>
            </Box>
          </Grid>
        </Box>
      </Box>

    </Box>
  );
};

export default ONama;
