import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "../../../assets/images/bastovan.jpg";
import { formateDate } from "../../../utils/FormateDate.js";
import StarIcon from "@mui/icons-material/Star";
import RecenzijaForm from "./RecenzijaForm.js";

const MajstorRecenzije = () => {
  const [formaZaRecenziju, setFormaZaRecenziju] = useState(false);
  return (
    <Box>
      <Box sx={{ mb: "50px" }}>
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          Sve recenzije
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 10,
            mt: 5,
          }}
        >
          <Box sx={{ display: "flex", gap: 3 }}>
            <img
              src={`${Image}?w=248&fit=crop&auto=format`}
              alt="Preview"
              loading="lazy"
              style={{
                width: 45,
                height: 40,
                borderRadius: "50%", // Okrugle ivice
                objectFit: "cover", // Održava proporcije slike }}
              }}
            />
            <Box sx={{ textAlign: "left" }}>
              <Typography
                variant="h5"
                sx={{ fontSize: 16, fontWeight: "bold" }}
              >
                Aleksa Randjelovic
              </Typography>
              <Typography variant="caption">
                {formateDate("02-14-2024")}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                {" "}
                Ovde ide recenzija o majstoru bla bla
              </Typography>
            </Box>
          </Box>
          <Box style={{ display: "flex", gap: "1px" }}>
            {[...Array(4).keys()].map((_, index) => (
              <StarIcon key={index} sx={{ color: "#F0A500" }} />
            ))}
          </Box>
        </Box>
      </Box>
      {!formaZaRecenziju && (
        <Box>
          <Button  variant="contained"
          sx={{
            backgroundColor: "#F0A500",
            color: "white",
            "&:hover": {
              backgroundColor: "#CF7500",
            },
           }}
          onClick={() => setFormaZaRecenziju(true)}>
            Dodaj recenziju
          </Button>
        </Box>
      )}
      {formaZaRecenziju && <RecenzijaForm/>}
    </Box>
  );
};

export default MajstorRecenzije;
