import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const RecenzijaForm = () => {
  const [ratingValue, setRatingValue] = useState(null);
  const [comment, setComment] = useState("");
  const isDisabled = ratingValue === null || comment === "";

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    //ovde se posle pamti u bazi (api)
  };
  return (
    <Box
      sx={{
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6">
        Kakvo je Vase iskustvo? Ocenite majstora i pomozite ostalima.
      </Typography>
      <TextField
        multiline
        maxRows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></TextField>
      <Rating
        value={ratingValue}
        onChange={(_, value) => setRatingValue(value)}
      ></Rating>
      <Button disabled={isDisabled} 
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
