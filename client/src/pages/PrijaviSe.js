import React from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Grid2,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavLink } from "react-router-dom";
import pozadina from "../assets/images/pozadina.jpeg";

const PrijaviSe = () => {
  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ccc",
      },
      "&:hover fieldset": {
        borderColor: "#999",
      },
      "&.Mui-focused fieldset": {
        borderColor: "##1A1C20",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#1A1C20", // Postavlja boju labela
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#1A1C20", // Postavlja boju kada je polje fokusirano
    },
  };
  return (
    <Box
      sx={{
        minHeight: "100vh", // Postavljanje visine na 100vh
        display: 'flex', // Flex za centriranje sadržaja
        alignItems: 'center', // Vertikalno centriranje
        justifyContent: 'center', // Horizontalno centriranje
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backdropFilter: "blur(10px)", // Zamagljivanje pozadine
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Poluprovidna bela pozadina
          borderRadius: "1rem",
          padding: "2rem",
          boxShadow: 3, // Dodavanje senke
          maxWidth: '400px', // Maksimalna širina za formu
          width: '100%', // Širina forme
        }}
      >
        <AccountCircleIcon
          sx={{ m: 1, width: 56, height: 56, color: "##1A1C20" }}
        />
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: 2, color: "##1A1C20" }}
        >
          Prijavi se
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email"
            name="username"
            autoComplete="username"
            autoFocus
            sx={textFieldStyles}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Lozinka"
            type="password"
            id="password"
            autoComplete="current-password"
            sx={textFieldStyles}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#1A1C20",
              color: "white",
              "&:hover": {
                backgroundColor: "#3d353e",
              },
            }}
          >
            Prijavi se
          </Button>
          <Grid2 container justifyContent="flex-end">
            <Grid2 item>
              <NavLink style={{ color: "#F0A500" }} to="/register">
                {"Nemate nalog? Registrujte se"}
              </NavLink>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </Box>
  );
};

export default PrijaviSe;
