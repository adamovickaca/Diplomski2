import { Box, TextField, Button, FormControl } from "@mui/material";
import { useState } from "react";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";

const DodajDelatnost = ({ onClose, onAdd }) => {
  const [naziv, setNaziv] = useState("");
  const [opis, setOpis] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");

  const handleInputFile = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const data = await uploadImageToCloudinary(file);
      setSelectedFile(data.url);
      setPreviewURL(data.url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDelatnost = { naziv, opis, slika: selectedFile };

    try {
      await onAdd(newDelatnost);
      // Resetuj formu
      setNaziv("");
      setOpis("");
      setSelectedFile(null);
      setPreviewURL("");
      onClose(); // Zatvori modal nakon uspešnog dodavanja
    } catch (error) {
      console.error("Greška prilikom dodavanja delatnosti:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <TextField
        label="Naziv"
        value={naziv}
        onChange={(e) => setNaziv(e.target.value)}
        required
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Opis"
        value={opis}
        onChange={(e) => setOpis(e.target.value)}
        required
        fullWidth
        sx={{ mb: 2 }}
      />
      <input type="file" onChange={handleInputFile} accept=".jpg, .png" />
      {previewURL && (
        <img src={previewURL} alt="Preview" style={{ width: '100px', marginTop: '10px' }} />
      )}
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Dodaj Delatnost
      </Button>
      <Button onClick={onClose} variant="outlined" sx={{ mt: 2, ml: 2 }}>
        Otkaži
      </Button>
    </Box>
  );
};

export default DodajDelatnost;
