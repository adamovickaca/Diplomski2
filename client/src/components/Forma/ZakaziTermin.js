import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useParams } from "react-router-dom";
import {authContext} from "../../context/authContext.js"
import { useContext } from "react";
import { BASE_URL } from "../../config.js";

const ZakaziTermin = ({ onClose, selectedService  }) => {
  const { user } = useContext(authContext); 
  const { majstorId } = useParams(); // Uzmi majstorId iz URL-a
  const [datum, setDatum] = useState(dayjs());
  const [slobodniTermini, setSlobodniTermini] = useState([]);
  const [izabranTermin, setIzabranTermin] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (datum) {
      fetchSlobodniTermini(datum);
    }
  }, [datum, majstorId]);

  const fetchSlobodniTermini = async (selectedDate) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/majstori/majstori/${majstorId}/termini/datum?datum=${selectedDate.format('YYYY-MM-DD')}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("API response:", data);

      if (data.success) {
        setSlobodniTermini(data.data);
      } else {
        console.error("Nema slobodnih termina:", data.message);
        setSlobodniTermini([]);
      }
    } catch (error) {
      console.error("Greška prilikom učitavanja slobodnih termina:", error);
    } finally {
      setLoading(false);
    }
  };

  const zakazi = async () => {
    if (!izabranTermin) {
      alert("Morate izabrati termin.");
      return;
    }

    const korisnik = user._id; // Zameni sa pravim ID korisnika
    const cena = selectedService._id; // Zameni sa pravim ID cene
    const datumRezervacije = izabranTermin; // ili new Date(izabranTermin)
  
    try {
      const response = await fetch(`${BASE_URL}/rezervacije/rezervacije`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ korisnik, cena, datumRezervacije }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        alert(data.message); // Prikazuje poruku o uspehu
        onClose(); // Zatvori modal
      } else {
        alert(data.message); // Prikazuje poruku o grešci
      }
    } catch (error) {
      console.error("Greška prilikom zakazivanja:", error);
      alert("Došlo je do greške prilikom zakazivanja.");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 2 }}>
        <Typography variant="body2">Slobodni termini:</Typography>
        {selectedService && (
          <Typography variant="h6" sx={{ mb: 2 }}>
            Izabrana usluga: {selectedService.usluga}
          </Typography>
        )}
        <DatePicker
          label="Izaberite datum"
          value={datum}
          onChange={(newValue) => {
            setDatum(newValue);
            setSlobodniTermini([]); // Resetuj slobodne termine pri novom datumu
            setIzabranTermin(null); // Resetuj izabrani termin
          }}
          renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
        />
        
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {slobodniTermini.map((termin, index) => (
              <ListItem key={index} button onClick={() => setIzabranTermin(termin)}>
                <ListItemText primary={new Date(termin).toLocaleString()} />
              </ListItem>
            ))}
          </List>
        )}

        <Button variant="contained" onClick={zakazi}>Zakazi termin</Button>
      </Box>
    </LocalizationProvider>
  );
};

export default ZakaziTermin;