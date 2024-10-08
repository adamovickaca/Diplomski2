// components/Forma/IzmeniBlog.js

import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";

const IzmeniBlog = ({ blog, onClose, onUpdate }) => {
  const [naslov, setNaslov] = useState(blog.naslov);
  const[kratakOpis, setKratakOpis] = useState(blog.kratakOpis);
  const [tekst, setTekst] = useState(blog.tekst);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(blog._id, { naslov, kratakOpis, tekst });
  };

  useEffect(() => {
    setNaslov(blog.naslov);
    setKratakOpis(blog.kratakOpis);
    setTekst(blog.tekst);
  }, [blog]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto", // Centriranje na horizontalnoj osi
        position: "absolute", // Pozicija apsolutno
        top: "40%", // 50% od vrha
        left: "50%", // 50% od leve strane
        transform: "translate(-50%, -50%)", // Pomeri na sredinu
        backgroundColor: "white",
        padding: 10,
        borderRadius: 1,
        boxShadow: 3,
      }}
    >
      <TextField
        label="Naslov"
        variant="outlined"
        value={naslov}
        onChange={(e) => setNaslov(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Kratak opis"
        variant="outlined"
        value={kratakOpis}
        onChange={(e) => setKratakOpis(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Tekst"
        variant="outlined"
        value={tekst}
        onChange={(e) => setTekst(e.target.value)}
        required
        fullWidth // Maksimalna širina
        multiline // Omogućava više redova
        rows={3} // Broj redova
      />
      <Button variant="contained" type="submit">
        Ažuriraj
      </Button>
      <Button variant="outlined" onClick={onClose}>
        Otkaži
      </Button>
    </Box>
  );
};

export default IzmeniBlog;
