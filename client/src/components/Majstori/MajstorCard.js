import React from "react";
import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import cistacica from "../../assets/images/cistacica.jpg";
import { useNavigate } from "react-router-dom";

const MajstorCard = ({ majstor }) => {
  const navigate = useNavigate(); // Inicijalizujte useNavigate
  const { ime, prezime, email, brTelefona, slika, adresa, grad, poddelatnost, prosecnaOcena, sveOcene, bio, oMajstoru } = majstor;

  return (
    <Card
      sx={{ 
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "8px",
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.03)",
        },
        width:"320px",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={slika || cistacica} // Koristi sliku iz objekta ili default sliku
        alt={ime}
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h6"
            component="h3"
            color="#1A1C20"
            fontWeight="bold"
          >
            {ime} {prezime}
          </Typography>
          <Box display="flex" alignItems="center">
            <StarIcon sx={{ color: "#ff8606" }} />
            <Typography variant="body2" ml={0.5}>
              {prosecnaOcena.toFixed(2)}
            </Typography>
            <Typography variant="body2" ml={1} color="text.secondary">
              ({sveOcene})
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mt={1} mb={1}>
          <Typography
            variant="body2"
            sx={{
              color: "#1976d2",
              py: 0.5,
              px: 2,
              fontWeight: "bold",
              border: "1px solid #1976d2", // Dodavanje ivice
              borderRadius: "4px", // Opcionalno, za zaobljene ivice
              mr: 1,
            }}
          >
            {poddelatnost.naziv} {/* Možete zameniti sa stvarnom delatnošću */}
          </Typography>
        </Box>
        <Typography variant="body2" >
        <strong>{grad}</strong>
        </Typography>
        <Typography variant="body2" mt={1} >
          {bio}
        </Typography>
        {/* Dugme za navigaciju na MajstorPocetna */}
        <Button
          variant="contained"
          sx={{  mt: 4, backgroundColor: "#F0A500", "&:hover": { backgroundColor: "#CF7500" } }}
          onClick={() => navigate(`/majstor/${majstor._id}`)} // Zamenite sa tačnom putanjom
        >
          Vidi više
        </Button>
      </CardContent>
    </Card>
  );
};

export default MajstorCard;
