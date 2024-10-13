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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useParams } from "react-router-dom";
import { authContext } from "../../context/authContext.js";
import { useContext } from "react";
import { BASE_URL } from "../../config.js";

const ZakaziTermin = ({ onClose, selectedService }) => {
  const { user } = useContext(authContext);
  const { majstorId } = useParams(); // Uzmi majstorId iz URL-a
  const [datum, setDatum] = useState(dayjs());
  const [slobodniTermini, setSlobodniTermini] = useState([]);
  const [izabranTermin, setIzabranTermin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [napomena, setNapomena] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket(`ws://localhost:8080/${user._id}`);

    newSocket.onopen = () => {
      console.log("WebSocket connection established");
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [user._id]);

  useEffect(() => {
    if (datum) {
      fetchSlobodniTermini(datum);
    }
  }, [datum, majstorId]);

  const fetchSlobodniTermini = async (selectedDate) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/majstori/majstori/${majstorId}/termini/datum?datum=${selectedDate.format(
          "YYYY-MM-DD"
        )}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
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

    const korisnik = user._id;
    const cena = selectedService._id;
    const datumRezervacije = izabranTermin;

    try {
      const response = await fetch(`${BASE_URL}/rezervacije/rezervacije`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ korisnik, cena, datumRezervacije, napomena }),
      });

      const data = await response.json();
      if (data.success) {
        socket.send(
          JSON.stringify({
            action: "sendRequest",
            recipientId: majstorId, // ID majstora
            data: { details: "Imate novi zahtev za rezervaciju." },
          })
        );

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
          renderInput={(params) => (
            <TextField {...params} fullWidth sx={{ mb: 2 }} />
          )}
        />

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {slobodniTermini.map((termin, index) => (
              <ListItem
                key={index}
                button
                onClick={() => setIzabranTermin(termin)}
              >
                <ListItemText primary={new Date(termin).toLocaleString()} />
              </ListItem>
            ))}
          </List>
        )}
        <TextField
          label="Posebne napomene (dodatne informacije)"
          value={napomena}
          onChange={(e) => setNapomena(e.target.value)}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />

        <Button variant="outlined" onClick={zakazi}>
          Zakazi termin
        </Button>
        <Button variant="outlined" sx={{color:"#F0A500", borderColor:"#F0A500", ml:3}} onClick={onClose}>
          Otkazi
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default ZakaziTermin;
