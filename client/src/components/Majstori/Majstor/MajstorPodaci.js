import React, { useState } from "react";
import { Box, Button, Typography, Modal, TextField } from "@mui/material";
import { BASE_URL } from "../../../config";

const MajstorPodaci = ({ majstor, user }) => {
  const [openIzmena, setOpenIzmena] = useState(false);
  const [formData, setFormData] = useState(majstor);

  const textStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
  };
  // Proverite da li su podaci o majstoru dostupni
  if (!majstor) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/majstori/majstor/${majstor._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        // Ako je ažuriranje uspešno, osveži podatke
        setOpenIzmena(false);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Greška prilikom ažuriranja:", error);
    }
  };

  return (
    <Box sx={{ textAlign: "left" }}>
      <Typography style={textStyle} variant="h6">Podaci o majstoru:</Typography>
      <Typography style={textStyle}>
        <span style={{ color: "#F0A500", fontWeight: "bold", marginRight: "4px" }}>Email:</span>{" "}
        {majstor.email}
      </Typography>
      <Typography style={textStyle}>
        <span style={{ color: "#F0A500", fontWeight: "bold", marginRight: "4px" }}>Broj telefona:</span>{" "}
        {majstor.brTelefona}
      </Typography>
      <Typography style={textStyle}>
        <span style={{ color: "#F0A500", fontWeight: "bold", marginRight: "4px" }}>Adresa:</span>{" "}
        {majstor.adresa}
      </Typography>
      <Typography style={textStyle}>
        <span style={{ color: "#F0A500", fontWeight: "bold", marginRight: "4px" }}>Grad:</span> {majstor.grad}
      </Typography>
      <Typography style={textStyle}>
        <span style={{ color: "#F0A500", fontWeight: "bold", marginRight: "4px" }}>Kvalifikacija:</span>{" "}
        {majstor.kvalifikacija}
      </Typography>
      <Typography style={textStyle}>
        <span style={{ color: "#F0A500", fontWeight: "bold", marginRight: "4px" }}>Iskustvo:</span>{" "}
        {majstor.iskustvo}
      </Typography>
      <Typography style={textStyle}>
        <span style={{ color: "#F0A500", fontWeight: "bold", marginRight: "4px" }}>Bio:</span> {majstor.bio}
      </Typography>
      <Typography style={textStyle}>
        <span style={{ color: "#F0A500", fontWeight: "bold", marginRight: "4px" }}>O majstoru:</span>{" "}
        {majstor.oMajstoru}
      </Typography>

      {/* Dugme za izmenu, samo ako se ID poklapa */}
      {user && user._id === majstor._id && (
        <Button
          variant="contained"
          sx={{ marginTop: "16px", backgroundColor: "#F0A500", color: "white" }}
          onClick={() => setOpenIzmena(true)}
        >
          Izmeni
        </Button>
      )}
      
      {/* Modal za izmenu */}
      <Modal
        open={openIzmena}
        onClose={() => setOpenIzmena(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: 2,
            borderRadius: 1,
            width: "400px",
          }}
        >
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              name="ime"
              label="Ime"
              value={formData.ime}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="prezime"
              label="Prezime"
              value={formData.prezime}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="brTelefona"
              label="Broj telefona"
              value={formData.brTelefona}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="adresa"
              label="Adresa"
              value={formData.adresa}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: "16px" }}>
              Sačuvaj izmene
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default MajstorPodaci;
