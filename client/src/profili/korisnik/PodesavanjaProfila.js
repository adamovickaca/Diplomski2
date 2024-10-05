import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../../utils/uploadCloudinary.js";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";


const PodesavanjaProfila = ({ korisnikPodaci }) => {
    
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    ime: "",
    prezime: "",
    email: "",
    sifra: "",
    brTelefona: "",
    slika: null,
    adresa: "",
    grad: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      ime: korisnikPodaci.ime,
      prezime: korisnikPodaci.prezime,
      email: korisnikPodaci.email,
      brTelefona: korisnikPodaci.brTelefona,
      slika: korisnikPodaci.slika,
      adresa: korisnikPodaci.adresa,
      grad: korisnikPodaci.grad,
    });
  }, [korisnikPodaci]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputFile = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const data = await uploadImageToCloudinary(file);
        setSelectedFile(file);
        setFormData({ ...formData, slika: data.url });
      } catch (error) {
        toast.error("Došlo je do greške prilikom učitavanja slike.");
      }
    }
  };
  

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
        const res = await fetch(`${BASE_URL}/korisnik/korisnik/${korisnikPodaci._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData),
        });

        // Proveri da li je odgovor uspešan
        if (!res.ok) {
            const errorResponse = await res.json(); // Pokušaj da uzmeš JSON odgovor
            throw new Error(errorResponse.message || "Došlo je do greške!");
        }

        // Samo ovde uzimamo JSON odgovor
        const jsonResponse = await res.json();
        toast.success(jsonResponse.message);
        navigate("/korisnik/profil");
    } catch (error) {
        toast.error(error.message);
    }
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
      color: "#1A1C20", // Postavlja boju labela
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#3d353e", // Postavlja boju kada je polje fokusirano
    },
  };
  return (
    <Box>
      <Grid
        container
        component="form"
        noValidate
        sx={{ mt: 1 }}
        spacing={2}
        onSubmit={submitHandler} // Dodaj ovu liniju
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
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            sx={textFieldStyles}
          />
        </Grid>
        <Grid item xs={6}>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.25rem",
            }}
          >
            {formData.slika && (
              <figure
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  border: "2px solid",
                  borderColor: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={formData.slika}
                  alt="Preview"
                  style={{ width: "100%", borderRadius: "50%" }}
                />
              </figure>
            )}

            <div
              style={{
                position: "relative",
                width: "130px",
                height: "50px",
              }}
            >
              <input
                type="file"
                onChange={handleInputFile}
                name="slika"
                accept=".jpg, .png"
                id="customFile"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
              <label
                htmlFor="customFile"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                  fontSize: "15px",
                  lineHeight: "1.5",
                  overflow: "hidden",
                  backgroundColor: "#0066ff46",
                  color: "text.headingColor",
                  fontWeight: "600",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                {selectedFile ? selectedFile.name : "Upload Photo"}
              </label>
            </div>
          </div>
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
            type="submit" // Postavi tip dugmeta na "submit"
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
            Azuriraj
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PodesavanjaProfila;
