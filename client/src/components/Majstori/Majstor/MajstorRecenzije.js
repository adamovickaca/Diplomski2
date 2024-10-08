import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import Image from "../../../assets/images/bastovan.jpg";
import { formateDate } from "../../../utils/FormateDate.js";
import StarIcon from "@mui/icons-material/Star";
import RecenzijaForm from "./RecenzijaForm.js";
import { BASE_URL } from "../../../config.js"; // Ako već nemate, dodajte BASE_URL
import { authContext } from "../../../context/authContext.js";

const MajstorRecenzije = ({ majstorId, recenzije }) => {
  const [formaZaRecenziju, setFormaZaRecenziju] = useState(false);
  const [recenzijeData, setRecenzijeData] = useState(recenzije);

  const { user } = useContext(authContext);

  return (
    <Box>
      <Box sx={{ mb: "50px" }}>
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          Sve recenzije
        </Typography>
        {recenzijeData.map((recenzija) => (
          <Box
            key={recenzija._id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 10,
              mt: 5,
            }}
          >
            <Box sx={{ display: "flex", gap: 3 }}>
              <img
                src={recenzija.korisnik.slika || Image}
                alt="Preview"
                loading="lazy"
                style={{
                  width: 45,
                  height: 40,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <Box sx={{ textAlign: "left" }}>
                <Typography
                  variant="h5"
                  sx={{ fontSize: 16, fontWeight: "bold" }}
                >
                  {recenzija.korisnik.ime}
                </Typography>
                <Typography variant="caption">
                  {formateDate(recenzija.createdAt)}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {recenzija.recenzijaText}
                </Typography>
              </Box>
            </Box>
            <Box style={{ display: "flex", gap: "1px" }}>
              {[...Array(recenzija.ocena)].map((_, index) => (
                <StarIcon key={index} sx={{ color: "#F0A500" }} />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
      <Box>
        {!formaZaRecenziju && (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#F0A500",
              color: "white",
              "&:hover": {
                backgroundColor: "#CF7500",
              },
            }}
            onClick={() => setFormaZaRecenziju(true)}
            disabled={!user} // Dugme je onemogućeno ako korisnik nije prijavljen
          >
            Dodaj recenziju
          </Button>
        )}

        {formaZaRecenziju && (
          <RecenzijaForm
            majstorId={majstorId}
            onClose={() => {
              setFormaZaRecenziju(false);
              //fetchRecenzije(); // Osveži recenzije kada se forma zatvori
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default MajstorRecenzije;
