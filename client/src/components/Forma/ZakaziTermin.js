import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    TextField,
    FormControlLabel,
    Checkbox,
    Select,
    MenuItem,
    Button,
  } from "@mui/material";
  import React, { useState } from "react";
  import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers"; // Adjusted imports
  import dayjs from "dayjs";
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Adapter for dayjs
  
  const izracunajCenu = (povrsina, gletovanje, brusenje, vrstaBoje, zastita) => {
    const osnovnaCena = 10; // osnovna cena po kvadratu
    const gletovanjeCena = gletovanje ? 2 : 0; // dodatak za gletovanje
    const brusenjeCena = brusenje ? 1 : 0; // dodatak za brušenje
  
    const bojaCene = {
      standardna: 0,
      pastelne: 1,
      jarke: 2,
      akvarel: 3,
    };
  
    const zastitaCena = zastita ? 50 : 0; // fiksna cena za zaštitu
  
    const ukupnaCena = povrsina * (osnovnaCena + gletovanjeCena + brusenjeCena + bojaCene[vrstaBoje]) + zastitaCena;
  
    return ukupnaCena;
  };
  
  const izracunajVreme = (povrsina, gletovanje, brusenje) => {
    const osnovnoVreme = povrsina / 10; // 1 sat po 10 kvadrata
    const gletovanjeVreme = gletovanje ? povrsina / 5 : 0; // 1 sat po 5 kvadrata
    const brusenjeVreme = brusenje ? povrsina / 8 : 0; // 1 sat po 8 kvadrata
  
    const ukupnoVreme = osnovnoVreme + gletovanjeVreme + brusenjeVreme;
  
    return ukupnoVreme; // Vreme u satima
  };
  
  const ZakaziTermin = () => {
    const [povrsina, setPovrsina] = useState(30);
    const [gletovanje, setGletovanje] = useState(false);
    const [brusenje, setBrusenje] = useState(false);
    const [vrstaBoje, setVrstaBoje] = useState('pastelne');
    const [zastita, setZastita] = useState(false);
    const [cena, setCena] = useState(izracunajCenu(30, gletovanje, brusenje, vrstaBoje, zastita));
    const [vreme, setVreme] = useState(izracunajVreme(30, gletovanje, brusenje));
    const [datum, setDatum] = useState(dayjs());
  
    const izracunaj = () => {
      const novaCena = izracunajCenu(povrsina, gletovanje, brusenje, vrstaBoje, zastita);
      const novoVreme = izracunajVreme(povrsina, gletovanje, brusenje);
      setCena(novaCena);
      setVreme(novoVreme);
    };
  
    const slobodniTermini = [
      "01.10.2023, 10:00",
      "01.10.2023, 14:00",
      "02.10.2023, 09:00",
      "02.10.2023, 13:00",
      "03.10.2023, 11:00",
    ];
  
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}> {/* Wrap with LocalizationProvider */}
        <Box sx={{ p: 2, overflowY: "scroll" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", m: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Cena usluge:
            </Typography>
            <span style={{ fontWeight: "bold" }}>${cena}</span>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", m: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Potrebno vreme:
            </Typography>
            <span style={{ fontWeight: "bold" }}>{vreme.toFixed(2)} sati</span>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography sx={{ fontWeight: 600 }}>Slobodni termini</Typography>
            <List>
              {slobodniTermini.map((termin, index) => (
                <ListItem key={index}>
                  <ListItemText primary={termin} />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography sx={{ fontWeight: 600 }}>Unesite podatke</Typography>
            <TextField
              label="Kvadratura (m²)"
              type="number"
              value={povrsina}
              onChange={(e) => setPovrsina(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={<Checkbox checked={gletovanje} onChange={(e) => { setGletovanje(e.target.checked); izracunaj(); }} />}
              label="Gletovanje"
            />
            <FormControlLabel
              control={<Checkbox checked={brusenje} onChange={(e) => { setBrusenje(e.target.checked); izracunaj(); }} />}
              label="Brušenje"
            />
            <Select
              value={vrstaBoje}
              onChange={(e) => { setVrstaBoje(e.target.value); izracunaj(); }}
              fullWidth
              sx={{ mb: 2 }}
            >
              <MenuItem value="standardna">Standardna bela</MenuItem>
              <MenuItem value="pastelne">Pastelne boje</MenuItem>
              <MenuItem value="jarke">Jarke boje</MenuItem>
              <MenuItem value="akvarel">Akvarel</MenuItem>
            </Select>
            <FormControlLabel
              control={<Checkbox checked={zastita} onChange={(e) => { setZastita(e.target.checked); izracunaj(); }} />}
              label="Zaštita nameštaja i poda"
            />
  
            {/* DatePicker Component */}
            <DatePicker
              label="Izaberite datum"
              value={datum}
              onChange={(newValue) => {
                setDatum(newValue);
              }}
              renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
            />
            
            <Button variant="contained" onClick={izracunaj} sx={{ mt: 2 }}>
              Izračunaj cenu
            </Button>
          </Box>
        </Box>
      </LocalizationProvider>
    );
  };
  
  export default ZakaziTermin;
  