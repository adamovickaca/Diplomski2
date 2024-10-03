import React from "react";
import { Box, Typography } from "@mui/material";

const MajstorPodaci = () => {
  // Sample data for the master
  const masterData = {
    email: "pera.petrovic@example.com",
    brTelefona: "+381 64 123 4567",
    adresa: "Ulica 123",
    grad: "Beograd",
    kvalifikacija: "Visoka stručna sprema",
    iskustvo: "5 godina",
    bio: "Majstor sa iskustvom u različitim poslovima.",
    oMajstoru:
      "Stručnjak za sve vrste radova, poznat po kvalitetu i preciznosti.",
  };

  // Common style for Typography
  const textStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
  };

  return (
    <Box sx={{ textAlign: "left" }}>
      <Typography style={textStyle}>
        <span
          style={{ color: "#F0A500", fontWeight: "bold", marginRight: "4px" }}
        >
          Email:
        </span>{" "}
        {masterData.email}
      </Typography>
      <Typography style={textStyle}>
        <span style={{ color: "#F0A500", fontWeight: "bold", marginRight: "4px" }}>Broj telefona:</span>{" "}
        {masterData.brTelefona}
      </Typography>
      <Typography style={textStyle}>
        <span style={{ color: "#F0A500", fontWeight: "bold", marginRight: "4px" }}>Adresa:</span>{" "}
        {masterData.adresa}
      </Typography>
      <Typography style={textStyle}>
        <span style={{ color: "#F0A500", fontWeight: "bold", marginRight: "4px" }}>Grad:</span> {masterData.grad}
      </Typography>
      <Typography style={textStyle}>
        <span style={{ color: "#F0A500", fontWeight: "bold", marginRight: "4px" }}>Kvalifikacija:</span>{" "}
        {masterData.kvalifikacija}
      </Typography>
      <Typography style={textStyle}>
        <span style={{ color: "#F0A500", fontWeight: "bold", marginRight: "4px" }}>Iskustvo:</span>{" "}
        {masterData.iskustvo}
      </Typography>
      <Typography style={textStyle}>
        <span style={{ color: "#F0A500", fontWeight: "bold", marginRight: "4px" }}>Bio:</span> {masterData.bio}
      </Typography>
      <Typography style={textStyle}>
        <span style={{ color: "#F0A500", fontWeight: "bold", marginRight: "4px" }}>O majstoru:</span>{" "}
        {masterData.oMajstoru}
      </Typography>
    </Box>
  );
};

export default MajstorPodaci;
