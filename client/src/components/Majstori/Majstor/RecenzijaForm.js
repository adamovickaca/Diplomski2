import { useContext, useState } from "react";
import { authContext } from "../../../context/authContext.js"; // Prilagodite putanju
import { BASE_URL } from "../../../config.js";
import { Box, Button, Rating, TextField, Typography } from "@mui/material";

const RecenzijaForm = ({ majstorId, onClose }) => {
  const { user } = useContext(authContext); // Uzimanje korisnika iz konteksta
  console.log("User from context:", user);
  
  const [ratingValue, setRatingValue] = useState(null);
  const [comment, setComment] = useState("");
  const isDisabled = ratingValue === null || comment === "";

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!user) {
      console.error("Korisnik nije prijavljen.");
      return; // Ako korisnik nije prijavljen, obustavite proces
    }

    console.log(user._id);
    try {
      const response = await fetch(`${BASE_URL}/recenzije/recenzije/${majstorId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          majstor: majstorId,
          korisnik: user._id, // Koristite korisnički ID iz konteksta
          recenzijaText: comment,
          ocena: ratingValue,
        }),
      });

      const data = await response.json();
      if (data.success) {
        console.log("Recenzija uspešno dodata:", data.data);
        onClose(); // Zatvori formu
      } else {
        console.error("Greška pri dodavanju recenzije:", data.message);
      }
    } catch (error) {
      console.error("Greška pri slanju recenzije:", error);
    }
  };

  return (
    <Box
      sx={{
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
      }}
      component="form"
      onSubmit={handleSubmitReview}
    >
      <Typography variant="h6">
        Kakvo je Vase iskustvo? Ocenite majstora i pomozite ostalima.
      </Typography>
      <TextField
        multiline
        maxRows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Rating
        value={ratingValue}
        onChange={(_, value) => setRatingValue(value)}
      />
      <Button disabled={isDisabled} 
        type="submit" // Dodajte type="submit"
        variant="contained"
        sx={{
          backgroundColor: "#F0A500",
          color: "white",
          "&:hover": {
            backgroundColor: "#CF7500",
          },
        }}>
        Dodaj{" "}
      </Button>
    </Box>
  );
};

export default RecenzijaForm;
