import { Box, Typography, Button, CircularProgress } from "@mui/material";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext.js";
import MojeRezervacije from "./MojeRezervacije.js";
import PodesavanjaProfila from "./PodesavanjaProfila.js";
import korisnikVratiProfil from "../../hooks/useFetchData.js";
import { BASE_URL } from "../../config.js";
import ErrorMessage from '../../../src/components/LoadError/Error.js'; // Uvezite ErrorMessage
import Loading from "../../components/LoadError/Loading.js";

const KorisnikProfil = () => {
  const { dispatch } = useContext(authContext);
  const { data: korisnikData, loading, error } = korisnikVratiProfil(`${BASE_URL}/korisnik/profil`);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const [tab, setTab] = useState("rezervacije");
  const navigate = useNavigate();

  const Image = korisnikData?.slika;

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        mt: 10,
        minHeight: "100vh",
      }}
    >
      {/* Loading state */}
      {loading && !error &&(
        <Loading/>
      )}

      {/* Error state */}
      {error && !loading && <ErrorMessage message={error} />}

      {/* User data */}
      {korisnikData && !loading && !error && (
        <>
          <Box sx={{ flex: 1, p: 2 }}>
          <Box sx={{ flex: 1, p: 2,  ml: 3, display: "flex", flexDirection: "column", mt:5 }}>
          <Box sx={{ flex: "0 0 30%", mr: 2 }}>
                <img
                  src={`${Image}?w=248&fit=crop&auto=format`}
                  alt="Preview"
                  loading="lazy"
                  style={{ width: "100%", maxWidth: "240px" }}
                />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {korisnikData?.ime} {korisnikData?.prezime}
                  </Typography>
                  <Typography variant="h6">{korisnikData?.email}</Typography>
                  <Typography variant="h6">{korisnikData?.brTelefona}</Typography>
                  <Typography variant="h6">{korisnikData?.adresa}, {korisnikData?.grad}</Typography>

                <Button
                  onClick={handleLogout}
                  variant="contained"
                  sx={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#CF7500",
                    },
                    mt: 2,
                    mr: 2,
                  }}
                >
                  Odjavi se
                </Button>
              </Box>
            </Box>
          </Box>

          <Box sx={{ flex: 1, p:2, mr:10 }}>
            <Box sx={{ flexDirection: "row", display: "flex", mt:2}}>
              <Button
                onClick={() => setTab("rezervacije")}
                variant="outlined"
                sx={{
                  backgroundColor: tab === "rezervacije" ? "#1976d2" : "white",
                  color: tab === "rezervacije" ? "white" : "#1976d2",
                  borderColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: tab === "rezervacije" ? "#1976d2" : "#1976d2",
                    color: "white",
                  },
                  mt: 2,
                  mr: 2,
                }}
              >
                Moje rezervacije
              </Button>
              <Button
                onClick={() => setTab("podesavanja")}
                variant="outlined"
                sx={{
                  backgroundColor: tab === "podesavanja" ? "#1976d2" : "white",
                  color: tab === "podesavanja" ? "white" : "#1976d2",
                  borderColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: tab === "podesavanja" ? "#1976d2" : "#1976d2",
                    color: "white",
                  },
                  mt: 2,
                }}
              >
                Podesavanja profila
              </Button>
            </Box>

            <Box sx={{ mt: 2 }}>
              {tab === "rezervacije" && <MojeRezervacije />}
              {tab === "podesavanja" && <PodesavanjaProfila korisnikPodaci={korisnikData}/>}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default KorisnikProfil;
