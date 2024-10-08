import { Box, Typography, Tabs, Tab, Button, Modal } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Image from "../../../assets/images/bastovan.jpg"; // Default image
import StarIcon from "@mui/icons-material/Star";
import MajstorPodaci from "./MajstorPodaci.js";
import MajstorRecenzije from "./MajstorRecenzije.js";
import SidePanel from "./SidePanel.js";
import ZakaziTermin from "../../Forma/ZakaziTermin.js";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../config.js";
import { authContext } from "../../../context/authContext.js";

const MajstorPocetna = () => {
  const { majstorId } = useParams();
  const [value, setValue] = useState("podaci");
  const [zakaziTermin, setZakaziTermin] = useState(false);
  const [majstor, setMajstor] = useState(null);
  const [error, setError] = useState(null); // Dodavanje stanja za greške
  const navigate = useNavigate();

  const { user, role } = useContext(authContext); // Dodaj role ovde

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchMajstori = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/majstori/majstor/profil/${majstorId}`
        );
        const data = await response.json();
        if (data.success) {
          setMajstor(data.data); // Postavljanje podataka o majstoru
        } else {
          setError("Nema pronađenih majstora.");
        }
      } catch (error) {
        console.error("Greška prilikom učitavanja majstora:", error);
        setError("Greška prilikom učitavanja majstora.");
      }
    };

    fetchMajstori();
  }, [majstorId]);

  // Prikazivanje greške ili učitanih podataka
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!majstor) {
    return <Typography>Učitavanje...</Typography>; // Loading state
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        mt: 10,
        minHeight: "100vh",
      }}
    >
      {/* Left panel with master information */}
      <Box sx={{ flex: 1, p: 2 }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flex: "0 0 auto", mr: 2 }}>
            <img
              src={majstor.slika || Image} // Koristi sliku iz objekta ili default sliku
              alt="Preview"
              loading="lazy"
              style={{ width: "100%", maxWidth: "240px" }}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              display="flex"
              flexDirection={"column"}
              alignItems="self-start"
              mb={1}
            >
              <Typography
                variant="body2"
                sx={{
                  backgroundColor: "#F0A500",
                  color: "#1A1C20",
                  py: 0.5,
                  px: 2,
                  fontWeight: "bold",
                  mr: 1,
                }}
              >
                {"delatnost"} {/* Zamenite sa stvarnom delatnošću */}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {majstor.ime} {majstor.prezime}
              </Typography>
              <Typography variant="body2">{majstor.email}</Typography>
              <Typography variant="body2">{majstor.brTelefona}</Typography>
              <Typography variant="body2">{majstor.adresa}</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <StarIcon style={{ color: "#ff8606" }} />
              <Typography variant="body2" ml={0.5}>
                {majstor.prosecnaOcena}
              </Typography>
              <Typography variant="body2" ml={1} color="text.secondary">
                ({majstor.sveOcene})
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Tabs Section */}
        <Box
          sx={{
            mt: 3,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            p: 2,
            borderRadius: "8px",
            boxShadow: 2,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{
              "& .MuiTab-root": {
                color: "text.secondary",
              },
              "& .Mui-selected": {
                borderBottom: "2px solid #F0A500",
                color: "#F0A500",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Tab label="Podaci o majstoru" value="podaci" />
            <Tab label="Recenzije" value="recenzije" />
          </Tabs>
          <Box sx={{ p: 2 }}>
            {value === "podaci" && (
              <MajstorPodaci majstor={majstor} user={user} />
            )}
            {value === "recenzije" && (
              <MajstorRecenzije
                majstorId={majstorId}
                recenzije={majstor.recenzije}
              />
            )}
          </Box>
        </Box>
      </Box>

      {/* Right panel with side options */}
      <Box sx={{ flex: 1, ml: 2, display: "flex", flexDirection: "column" }}>
        <SidePanel majstorId={majstorId} role={role} sx={{ flexGrow: 1 }} />
        <Box sx={{ width: "30%", alignContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#F0A500",
              color: "white",
              "&:hover": {
                backgroundColor: "#CF7500",
              },
              mt: 2,
              mr: 2,
            }}
            onClick={() => setZakaziTermin(true)}
          >
            Zakazi termin
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#F0A500",
              color: "white",
              "&:hover": {
                backgroundColor: "#CF7500",
              },
              mt: 2,
            }}
            onClick={() => navigate(`/termini/${majstorId}`)} // Promena rute
          >
            Prikazi termine
          </Button>
        </Box>
      </Box>

      
    </Box>
  );
};

export default MajstorPocetna;
