import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import cistacica from "../../assets/images/cistacica.jpg";

const MajstorCard = ({ majstor }) => {
  const { name, city, averageRating, totalRating, delatnost } = majstor;

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
        image={cistacica}
        alt={name}
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h6"
            component="h3"
            color="#1A1C20"
            fontWeight="bold"
          >
            {name}
          </Typography>
          <Box display="flex" alignItems="center">
            <StarIcon sx={{ color: "#ff8606" }} />
            <Typography variant="body2" ml={0.5}>
              {averageRating}
            </Typography>
            <Typography variant="body2" ml={1} color="text.secondary">
              ({totalRating})
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
            {delatnost}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {city}
        </Typography>
        <Typography variant="body2" mt={1} color="text.secondary">
          Kratak opis ili dodatne informacije o majstoru.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MajstorCard;
