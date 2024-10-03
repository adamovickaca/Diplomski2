import { Box, Typography, Tabs, Tab, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import Image from "../../../assets/images/bastovan.jpg";
import StarIcon from "@mui/icons-material/Star";
import MajstorPodaci from "./MajstorPodaci.js";
import MajstorRecenzije from "./MajstorRecenzije.js";
import SidePanel from "./SidePanel.js";
import ZakaziTermin from "../../Forma/ZakaziTermin.js";
import { useNavigate } from "react-router-dom";

const MajstorPocetna = () => {
  const [value, setValue] = useState("podaci");
  const [zakaziTermin, setZakaziTermin] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
              src={`${Image}?w=248&fit=crop&auto=format`}
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
                {"delatnost"}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Ime i prezime
              </Typography>
              <Typography variant="body2">email@gmail.com</Typography>
              <Typography variant="body2">0662333666</Typography>
              <Typography variant="body2">1.maj 13, Babusnica</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <StarIcon style={{ color: "#ff8606" }} />
              <Typography variant="body2" ml={0.5}>
                {"4.6"}
              </Typography>
              <Typography variant="body2" ml={1} color="text.secondary">
                ({"10"})
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
                color: "text.secondary", // Boja neizabranih tabova
              },
              "& .Mui-selected": {
                borderBottom: "2px solid #F0A500",
                color: "#F0A500", // Boja teksta izabranog taba
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "transparent", // Uklanjanje ili promena boje indikatora
              },
            }}
          >
            <Tab label="Podaci o majstoru" value="podaci" />
            <Tab label="Recenzije" value="recenzije" />
          </Tabs>
          <Box sx={{ p: 2 }}>
            {value === "podaci" && <MajstorPodaci />}
            {value === "recenzije" && <MajstorRecenzije />}
          </Box>
        </Box>
      </Box>

      {/* Right panel with side options */}
      <Box sx={{ flex: 1, ml: 2, display: "flex", flexDirection: "column" }}>
        <SidePanel sx={{ flexGrow: 1 }} />
        <Box sx={{Width:"30%", alignContent:"center"}}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#F0A500",
            color: "white",
            "&:hover": {
              backgroundColor: "#CF7500",
            },
            mt: 2,
            mr:2
    
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
          onClick={() => navigate("/termini")}
        >
          Prikazi termine
        </Button>
        </Box>

      </Box>

      {/* Modal for scheduling an appointment */}
      <Modal
        open={zakaziTermin}
        onClose={() => setZakaziTermin(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} // Center modal
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: 2,
            borderRadius: 1,
            width: "400px",
          }}
        >
          <ZakaziTermin
            onClose={() => setZakaziTermin(false)}
            onAdd={() => {
              // Function for refreshing data
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default MajstorPocetna;
