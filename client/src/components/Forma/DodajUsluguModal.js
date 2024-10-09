import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { BASE_URL } from "../../config";

const DodajUsluguModal = ({ open, onClose, majstorId, poddelatnostId, onAddService }) => {
  const [newService, setNewService] = useState({
    majstor: majstorId,
    poddelatnost: poddelatnostId, // Unesi poddelatnost
    usluga: '',
    opis: '',
    cena: '',
    tipCene: ''
  });

  const handleAddService = async () => {
    try {
      const response = await fetch(`${BASE_URL}/usluge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newService),
      });
      const data = await response.json();
      if (data.success) {
        onAddService(data.novaCenaUsluge); // Proslijedi novu uslugu roditelju
        setNewService({ majstor: majstorId, poddelatnost: poddelatnostId, usluga: '', opis: '', cena: '', tipCene: '' });
        onClose(); // Zatvori modal
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Greška prilikom dodavanja usluge:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: 2,
          borderRadius: 1,
          width: "400px",
        }}
      >
        <Typography variant="h6">Dodaj Uslugu</Typography>
        <TextField
          fullWidth
          label="Usluga"
          value={newService.usluga}
          onChange={(e) => setNewService({ ...newService, usluga: e.target.value })}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Opis"
          value={newService.opis}
          onChange={(e) => setNewService({ ...newService, opis: e.target.value })}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Cena"
          type="number"
          value={newService.cena}
          onChange={(e) => setNewService({ ...newService, cena: e.target.value })}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Tip Cene"
          value={newService.tipCene}
          onChange={(e) => setNewService({ ...newService, tipCene: e.target.value })}
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: "#F0A500", color: "white", mt: 2 }}
          onClick={handleAddService}
        >
          Dodaj
        </Button>
      </Box>
    </Modal>
  );
};

export default DodajUsluguModal;
