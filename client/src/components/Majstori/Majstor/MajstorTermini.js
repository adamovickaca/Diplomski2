import { useState, useEffect } from "react";
import { Box, Typography, Tabs, Tab, Button, Modal, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../config";

const nadjiDan = (broj) => {
  const dani = ["Ned", "Pon", "Uto", "Sre", "Cet", "Pet", "Sub"];
  return dani[broj % 7];
};

const MajstorTermini = () => {
  const { majstorId } = useParams();
  const [value, setValue] = useState(0);
  const [dostupniTermini, setDostupniTermini] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [noviTermin, setNoviTermin] = useState("");
  const [terminId, setTerminId] = useState(null);
  const dan = new Date().getDay();

  useEffect(() => {
    prikaziTermine(new Date());
  }, []);

  const prikaziTermine = async (datum) => {
    const datumZaSlanje = datum.toISOString().split("T")[0];

    try {
      const response = await fetch(`${BASE_URL}/majstori/majstori/${majstorId}/termini/datum?datum=${datumZaSlanje}`);
      const data = await response.json();
      
      if (data.success) {
        setDostupniTermini(data.data);
      } else {
        console.error("Greška prilikom dobijanja termina:", data.message);
      }
    } catch (error) {
      console.error("Greška prilikom API poziva:", error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const pomDatum = new Date();
    pomDatum.setDate(new Date().getDate() + newValue);
    prikaziTermine(pomDatum);
  };

  const handleDodajTermin = async () => {
    const datumZaSlanje = new Date(noviTermin).toISOString();

    if (dostupniTermini.includes(datumZaSlanje)) {
      alert("Termin za ovo vreme već postoji.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/majstori/majstor/termin/${majstorId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ noviTermin: datumZaSlanje }),
      });

      const data = await response.json();
      if (data.success) {
        prikaziTermine(new Date(noviTermin));
        setModalOpen(false);
        setNoviTermin("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Greška prilikom API poziva:", error);
    }
  };

  const handleIzmeniTermin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/majstori/majstor/${majstorId}/termin`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stariTermin: terminId, noviTermin: noviTermin }),
      });
  
      const data = await response.json();
      if (data.success) {
        prikaziTermine(new Date(noviTermin));
        setModalOpen(false);
        setNoviTermin("");
        setTerminId(null); // Resetuj terminId nakon izmene

      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Greška prilikom API poziva:", error);
    }
  };
  
  
  
  const handleObrisiTermin = async (termin) => {
    try {
      const response = await fetch(`${BASE_URL}/majstori/majstor/${majstorId}/termin`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ termin }),
      });
  
      const data = await response.json();
      if (data.success) {
        prikaziTermine(new Date());
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Greška prilikom API poziva:", error);
    }
  };
  
  

  const Day = ({ broj }) => {
    const pomDatum = new Date();
    pomDatum.setDate(new Date().getDate() + broj);

    return (
      <Tab
        sx={{ minHeight: { xs: 10, sm: 50 } }}
        value={broj}
        label={`${nadjiDan((dan + broj) % 7)} ${pomDatum.getDate()}`}
        onClick={() => handleChange(null, broj)}
      />
    );
  };

  const datumi = Array.from({ length: 15 }, (_, i) => <Day key={i} broj={i} />);

  return (
    <Box sx={{ mt: 15, textAlign: "center", minHeight: "100vh" }}>
      <Tabs value={value} onChange={handleChange} variant="scrollable">
        {datumi}
      </Tabs>
      {dostupniTermini.length > 0 ? (
        <>
          <Typography variant="h6">Dostupni termini:</Typography>
          {dostupniTermini.map((termin, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', m:3 }}>
              <Typography>{new Date(termin).toLocaleString()}</Typography>
              <Box>
                <Button variant="outlined" sx={{ml:3}}onClick={() => { setNoviTermin(termin); setTerminId(termin); setModalOpen(true); }}>Izmeni</Button>
                <Button variant="outlined" sx={{ml:3}} color="error" onClick={() => handleObrisiTermin(termin)}>Izbriši</Button>
              </Box>
            </Box>
          ))}
        </>
      ) : (
        <Typography>Nema dostupnih termina za izabrani datum.</Typography>
      )}
      <Button variant="contained" onClick={() => setModalOpen(true)} sx={{ mt: 2 }}>
        Dodaj termin
      </Button>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1, width: 300, margin: 'auto', mt: '20%' }}>
          <Typography variant="h6" align="center">Dodaj novi termin</Typography>
          <TextField
            type="datetime-local"
            value={noviTermin}
            onChange={(e) => setNoviTermin(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Button variant="contained" onClick={terminId ? () => handleIzmeniTermin(terminId) : handleDodajTermin} sx={{ mt: 2, width: '100%' }}>
            {terminId ? "Izmeni" : "Potvrdi"}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default MajstorTermini;
