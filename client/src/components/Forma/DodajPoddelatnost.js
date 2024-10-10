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
    <Box sx={{ padding: "2rem" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Naziv"
          value={naziv}
          onChange={(e) => setNaziv(e.target.value)}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <input type="file" onChange={handleInputFile} accept=".jpg, .png" />
        {previewURL && <img src={previewURL} alt="Preview" style={{ width: "100px", margin: "10px 0" }} />}
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Dodaj Poddelatnost
        </Button>
        <Button onClick={onClose} variant="outlined" sx={{ mt: 2, ml: 2 }}>
          Otkaži
        </Button>
      </form>
    </Box>
  );
};

export default DodajPoddelatnost;
