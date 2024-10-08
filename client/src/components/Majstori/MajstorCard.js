import React from "react";
import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import cistacica from "../../assets/images/cistacica.jpg";
import { useNavigate } from "react-router-dom";

const MajstorCard = ({ majstor }) => {
  const navigate = useNavigate(); // Inicijalizujte useNavigate
  const { ime, prezime, email, brTelefona, slika, adresa, grad, prosecnaOcena, sveOcene, bio } = majstor;

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
              {prosecnaOcena}
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
              backgroundColor: "#1A1C20",
              color: "#b7a6b4",
              py: 0.5,
              px: 2,
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            {"delatnost"} {/* Možete zameniti sa stvarnom delatnošću */}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {grad}
        </Typography>
        <Typography variant="body2" mt={1} color="text.secondary">
          {bio}
        </Typography>
        {/* Dugme za navigaciju na MajstorPocetna */}
        <Button
          variant="contained"
          sx={{ mt: 2, backgroundColor: "#F0A500", "&:hover": { backgroundColor: "#CF7500" } }}
          onClick={() => navigate(`/majstor/${majstor._id}`)} // Zamenite sa tačnom putanjom
        >
          Vidi više
        </Button>
      </CardContent>
    </Card>
  );
};

export default MajstorCard;
