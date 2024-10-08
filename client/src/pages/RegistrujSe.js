import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  Grid,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Grid2 from "@mui/material/Grid2"; // Make sure to import Grid2 correctly
import pozadina from "../assets/images/pozadina.jpeg"; // Import your background image
import { useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../utils/uploadCloudinary.js";
import { BASE_URL } from "../config.js";
import { toast } from "react-toastify";

const RegistrujSe = () => {
  const [role, setRole] = useState("korisnik");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");

  const [delatnosti, setDelatnosti] = useState([]);
  const [poddelatnosti, setPoddelatnosti] = useState([]);
  const [selectedDelatnost, setSelectedDelatnost] = useState("");
  const [selectedPoddelatnost, setSelectedPoddelatnost] = useState("");

  useEffect(() => {
    const fetchDelatnosti = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/delatnosti/delatnost/podelatnost`
        ); // Proveri URL
        const data = await response.json();
        if (data.success) {
          setDelatnosti(data.data);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Greška prilikom učitavanja delatnosti.");
      }
    };

    fetchDelatnosti();
  }, []);

  const handleDelatnostChange = (e) => {
    const delatnostId = e.target.value;
    setSelectedDelatnost(delatnostId);

    const selectedDelatnost = delatnosti.find((d) => d._id === delatnostId);
    if (selectedDelatnost) {
      setPoddelatnosti(selectedDelatnost.poddelatnosti);
    } else {
      setPoddelatnosti([]);
    }
  };

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
    slika: selectedFile,
    adresa: "",
    grad: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputFile = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setPreviewURL(data.url);
    setSelectedFile(data.url);
    console.log(" DATA URL" + data.url);
    setFormData({ ...formData, slika: data.url });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const dataToSend = { ...formData, role, delatnost: selectedDelatnost };
    if(role === "majstor")
    {
      dataToSend.poddelatnost = selectedPoddelatnost;
      dataToSend.kvalifikacija = formData.kvalifikacija;
      dataToSend.iskustvo = formData.iskustvo;
      dataToSend.bio = formData.bio;
      dataToSend.oMajstoru = formData.oMajstoru;
    }
    if (
      !dataToSend.ime ||
      !dataToSend.prezime ||
      !dataToSend.email ||
      !dataToSend.sifra ||
      !dataToSend.brTelefona
    ) {
      alert("Morate popuniti sva obavezna polja.");
      return; // Prekini funkciju ako nisu svi podaci uneti
    }
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      toast.success(message);
      navigate("/login");
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
            mt: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backdropFilter: "blur(10px)", // Blur effect
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
            borderRadius: "1rem",
            padding: "1rem",
            boxShadow: 3,
            width: "100%",
          }}
        >
          <HowToRegIcon sx={{ width: 56, height: 56, color: "#1A1C20" }} />
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
            <ToggleButton value="korisnik" aria-label="user role">
              Korisnik
            </ToggleButton>
            <ToggleButton value="majstor" aria-label="master role">
              Majstor
            </ToggleButton>
          </ToggleButtonGroup>

          {role === "korisnik" && (
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
                  {selectedFile && (
                    <figure
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        borderColor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={previewURL}
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
                      Upload photo
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
                  Prijavi se
                </Button>
              </Grid>
            </Grid>
          )}

          {role === "majstor" && (
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
                  select
                  label="Delatnost"
                  value={selectedDelatnost}
                  onChange={handleDelatnostChange}
                  fullWidth
                  sx={textFieldStyles}
                >
                  {delatnosti.map((delatnost) => (
                    <MenuItem key={delatnost._id} value={delatnost._id}>
                      {delatnost.naziv}
                    </MenuItem>
                  ))}
                </TextField>
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
                  select
                  label="Poddelatnost"
                  value={selectedPoddelatnost}
                  onChange={(e) => setSelectedPoddelatnost(e.target.value)}
                  fullWidth
                  sx={textFieldStyles}
                >
                  {poddelatnosti.map((poddelatnost) => (
                    <MenuItem key={poddelatnost._id} value={poddelatnost._id}>
                      {poddelatnost.naziv}
                    </MenuItem>
                  ))}
                </TextField>
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
              <Grid item xs={6}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  {selectedFile && (
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
                        src={previewURL}
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
                      Upload photo
                    </label>
                  </div>
                </div>
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
        </Box>
      </Container>
    </Box>
  );
};

export default RegistrujSe;
