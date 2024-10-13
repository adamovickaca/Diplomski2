import React, { useState } from 'react';
import { Box, TextField, Button } from "@mui/material";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";

const DodajPoddelatnost = ({ onClose, onAdd, delatnostId }) => {
  const [naziv, setNaziv] = useState("");
  const [slika, setSlika] = useState(null);
  const [previewURL, setPreviewURL] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPoddelatnost = { naziv, delatnost: delatnostId, slika };
    try {
      await onAdd(newPoddelatnost);
      onClose(); // Zatvori modal
    } catch (error) {
      console.error("Greška prilikom dodavanja poddelatnosti:", error);
    }
  };

  const handleInputFile = async (event) => {
    const file = event.target.files[0];
    if (!file) {
        console.error("Nije izabrana nijedna slika.");
        return; // Prekini ako nije izabrana slika
    }
    const data = await uploadImageToCloudinary(file);
    setSlika(data.url);
    setPreviewURL(data.url);
  };

  return (
    <Box
    sx={{
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      //height: "100vh", // Puni visinu ekrana
    }}
  >
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
        <TextField
          label="Naziv"
          value={naziv}
          onChange={(e) => setNaziv(e.target.value)}
          required
          sx={{ mb: 2, maxWidth: "300px" }} // Postavi maxWidth na 300px
        />
        <input type="file" onChange={handleInputFile} accept=".jpg, .png" />
        {previewURL && <img src={previewURL} alt="Preview" style={{ width: "100px", margin: "10px 0" }} />}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button type="submit" variant="contained" sx={{ mt: 2, mr: 2 }}>
          Dodaj Poddelatnost
        </Button>
        <Button onClick={onClose} variant="outlined" sx={{ mt: 2 }}>
          Otkaži
        </Button>
      </Box>
    </form>
  </Box>
  );
};

export default DodajPoddelatnost;
