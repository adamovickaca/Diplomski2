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
            <Box sx={{ display: "flex" }}>
              <Box sx={{ flex: "0 0 auto", mr: 2 }}>
                <img
                  src={`${Image}?w=248&fit=crop&auto=format`}
                  alt="Preview"
                  loading="lazy"
                  style={{ width: "100%", maxWidth: "240px" }}
                />
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box display="flex" flexDirection={"column"} alignItems="self-start" mb={1}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {korisnikData?.ime} {korisnikData?.prezime}
                  </Typography>
                  <Typography variant="body2">{korisnikData?.email}</Typography>
                  <Typography variant="body2">{korisnikData?.brTelefona}</Typography>
                  <Typography variant="body2">{korisnikData?.adresa}, {korisnikData?.grad}</Typography>
                </Box>

                <Button
                  onClick={handleLogout}
                  variant="contained"
                  sx={{
                    backgroundColor: "#F0A500",
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

          <Box sx={{ flex: 1, ml: 2 }}>
            <Box sx={{ flexDirection: "row", display: "flex", height: "10%" }}>
              <Button
                onClick={() => setTab("rezervacije")}
                variant="outlined"
                sx={{
                  backgroundColor: tab === "rezervacije" ? "#F0A500" : "white",
                  color: tab === "rezervacije" ? "white" : "#F0A500",
                  borderColor: "#F0A500",
                  "&:hover": {
                    backgroundColor: tab === "rezervacije" ? "#F0A500" : "#F0A500",
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
                  backgroundColor: tab === "podesavanja" ? "#F0A500" : "white",
                  color: tab === "podesavanja" ? "white" : "#F0A500",
                  borderColor: "#F0A500",
                  "&:hover": {
                    backgroundColor: tab === "podesavanja" ? "#F0A500" : "#F0A500",
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
