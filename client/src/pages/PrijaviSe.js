import React, { useState, useContext } from "react";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavLink, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config.js";
import { toast } from "react-toastify";
import {authContext} from '../context/authContext.js';

const PrijaviSe = () => {

  const [formData, setFormData] = useState({
    email: "",
    sifra: "",
  });
  const navigate = useNavigate();
  const {dispatch} = useContext(authContext)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      color: "#1A1C20",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#1A1C20",
    },
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formData.email || !formData.sifra) {
      toast.error("Morate popuniti sva obavezna polja.");
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({
        type:"LOGIN_SUCCESS",
        payload:{
          user: result.data,
          token: result.token,
          role: result.role,
        },
      });
      console.log(result, "login data")

      toast.success(result.message);
      navigate("/pocetna");
    } catch (error) {
      toast.error(error.message);
    }
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "1rem",
          padding: "2rem",
          boxShadow: 3,
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <AccountCircleIcon
          sx={{ m: 1, width: 56, height: 56, color: "#1A1C20" }}
        />
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: 2, color: "#1A1C20" }}
        >
          Prijavi se
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={submitHandler}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleInputChange}
            sx={textFieldStyles}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="sifra"
            label="Lozinka"
            type="password"
            id="lozinka"
            autoComplete="current-password"
            value={formData.sifra}
            onChange={handleInputChange}
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
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink style={{ color: "#F0A500" }} to="/register">
                {"Nemate nalog? Registrujte se"}
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default PrijaviSe;
