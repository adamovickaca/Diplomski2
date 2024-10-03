import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";

const DodajBlog = ({ onClose, onAdd }) => {
  const [naslov, setNaslov] = useState("");
  const [kratakOpis, setKratakOpis] = useState("");
  const [ceoTekst, setCeoTekst] = useState("");
  const [tagovi, setTagovi] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ccc",
      },
      "&:hover fieldset": {
        borderColor: "#999",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1A1C20",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#1A1C20", // Postavlja boju labela
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#3d353e", // Postavlja boju kada je polje fokusirano
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Podesi visinu na 100% visine pregleda
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: 3,
          gap: "1vh",
          width: "500px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Naslov"
            value={naslov}
            onChange={(e) => setNaslov(e.target.value)}
            required
            fullWidth
            sx={{ mb: 2 ,
                ...textFieldStyles, // Direktno u sx

            }}
          />
          <TextField
            label="Kratak opis"
            type="text"
            value={kratakOpis}
            onChange={(e) => setKratakOpis(e.target.value)}
            required
            fullWidth
            sx={{ mb: 2 ,
                ...textFieldStyles, // Direktno u sx
            }}
          />
          <TextField
            label="Ceo tekst"
            type="text"
            value={ceoTekst}
            onChange={(e) => setCeoTekst(e.target.value)}
            required
            sx={{ mb: 2 ,
                ...textFieldStyles, // Direktno u sx
            }}
            fullWidth
            multiline
            rows={4}
          />
          <TextField
            label="Tagovi"
            value={tagovi}
            onChange={(e) => setTagovi(e.target.value)}
            required
            fullWidth
            sx={{ 
                ...textFieldStyles, // Direktno u sx

            }}
          />
          <Button type="submit" variant="contained" 
            sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#1A1C20",
                color: "white",
                "&:hover": {
                  backgroundColor: "#3d353e",
                },
                width:"200px"
              }}>
            Dodaj Blog
          </Button>
          <Button onClick={onClose} variant="outlined" 
            sx={{
                mt: 3,
                mb: 2,
                ml:3,
                backgroundColor: "#1A1C20",
                color: "white",
                "&:hover": {
                  backgroundColor: "#3d353e",
                },
                width: "200px"
              }}>
            Otkaži
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default DodajBlog;
