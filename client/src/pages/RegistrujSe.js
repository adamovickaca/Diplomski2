import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Grid2 from "@mui/material/Grid2"; // Make sure to import Grid2 correctly
import pozadina from "../assets/images/pozadina.jpeg"; // Import your background image

const RegistrujSe = () => {
  const [role, setRole] = useState("user");

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setRole(newRole);
    }
  };

  const [formData, setFormData] = useState({
    ime: "",
    prezime: "",
    email: "",
    sifra: "",
    brTelefona: "",
    slika: "",
    adresa: "",
    grad: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        borderColor: "##1A1C20",
      },
    },
    "& .MuiInputLabel-root": {
      color: "##1A1C20", // Postavlja boju labela
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#3d353e", // Postavlja boju kada je polje fokusirano
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",      
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            mt:12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backdropFilter: "blur(10px)", // Blur effect
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
            borderRadius: "1rem",
            padding: "1rem",
            boxShadow: 3,
            width: '100%',
          }}
        >
          <HowToRegIcon
            sx={{  width: 56, height: 56, color: "#1A1C20" }}
          />
          <Typography component="h1" variant="h5">
            Registruj se
          </Typography>

          <ToggleButtonGroup
            value={role}
            exclusive
            onChange={handleRoleChange}
            aria-label="role toggler"
            sx={{ mt: 2 }}
          >
            <ToggleButton value="user" aria-label="user role">
              Korisnik
            </ToggleButton>
            <ToggleButton value="master" aria-label="master role">
              Majstor
            </ToggleButton>
          </ToggleButtonGroup>

          {role === "user" && (
            <Grid
              container
              component="form"
              noValidate
              sx={{ mt: 1 }}
              spacing={2}
            >
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="ime"
                  label="Ime"
                  value={formData.ime}
                  onChange={handleChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="prezime"
                  label="Prezime"
                  value={formData.prezime}
                  onChange={handleChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Email"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={formData.email}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Lozinka"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.sifra}
                  onChange={handleChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="brTelefona"
                  label="Broj telefona"
                  value={formData.brTelefona}
                  onChange={handleChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="slika"
                  label="URL slike"
                  value={formData.slika}
                  onChange={handleChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="adresa"
                  label="Adresa"
                  value={formData.adresa}
                  onChange={handleChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="grad"
                  label="Grad"
                  value={formData.grad}
                  onChange={handleChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
          )}

          {role === "master" && (
            <Grid
              container
              component="form"
              noValidate
              sx={{ mt: 1 }}
              spacing={2}
            >
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="ime"
                  label="Ime"
                  value={formData.ime}
                  onChange={handleChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="prezime"
                  label="Prezime"
                  value={formData.prezime}
                  onChange={handleChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Email"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={formData.email}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Lozinka"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.sifra}
                  onChange={handleChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="brTelefona"
                  label="Broj telefona"
                  value={formData.brTelefona}
                  onChange={handleChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="slika"
                  label="URL slike"
                  value={formData.slika}
                  onChange={handleChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="adresa"
                  label="Adresa"
                  value={formData.adresa}
                  onChange={handleChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="grad"
                  label="Grad"
                  value={formData.grad}
                  onChange={handleChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="poddelatnost"
                  label="Poddelatnost"
                  value={formData.poddelatnost}
                  onChange={handleChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="kvalifikacija"
                  label="Kvalifikacija"
                  value={formData.kvalifikacija}
                  onChange={handleChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="iskustvo"
                  label="Iskustvo"
                  value={formData.iskustvo}
                  onChange={handleChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="bio"
                  label="Bio"
                  value={formData.bio}
                  onChange={handleChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="oMajstoru"
                  label="O Majstoru"
                  value={formData.oMajstoru}
                  onChange={handleChange}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "##1A1C20",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#3d353e",
                    },
                  }}
                >
                  Prijavi se
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default RegistrujSe;
