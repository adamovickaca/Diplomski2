import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, styled } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom"; // Uvezi useNavigate
import { authContext } from "../../context/authContext";
import { Select, MenuItem } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Uvezi ikonu za proširenje
import ExpandLessIcon from '@mui/icons-material/ExpandLess'; // Uvezi ikonu za smanjenje
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1A1C20",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function ZahteviRezervacije() {
  const [zahtevi, setZahtevi] = useState([]);
  const navigate = useNavigate(); // Inicijalizuj useNavigate
  const { user, role } = useContext(authContext); // Dodaj role ovde
  const [isResponseOpen, setIsResponseOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [expanded, setExpanded] = useState({}); // Ovaj objekat će čuvati stanje proširenja za svaku rezervaciju
  const [odgovor, setOdgovor] = useState(""); // Stanje za odgovor majstora
 
  useEffect(() => {
    const fetchZahtevi = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/majstori/majstori/${user._id}/zakazivanja`
        );
        const data = await response.json();

        if (response.ok) {
          setZahtevi(data.data);
        } else {
          console.error("Greška prilikom učitavanja majstora:", data.message);
        }
      } catch (error) {
        console.error("Greška prilikom učitavanja majstora:", error);
      }
    };

    fetchZahtevi();
  }, []);

  const handleOpenResponseForm = (request) => {
    setSelectedRequest(request);
    setIsResponseOpen(true);
  };
  
  const handleChangeStatus = async (id, status, korisnik, action) => {
    try {
      const response = await fetch(
        `${BASE_URL}/rezervacije/rezervacija/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status, odgovor }), // Poslati novi status
        }
      );

      if (response.ok) {
        setZahtevi((prev) =>
          prev.map((majstor) =>
            majstor._id === id ? { ...majstor, status } : majstor
          )
        );
        setOdgovor(""); // Resetovanje odgovora nakon uspešne izmene
        if (action === 'sendResponse') {
          toast.success("Uspešno ste dodali odgovor.");
        } else if (action === 'statusChange') {
          toast.success("Uspešno ste promenili status.");
        }
  
      } else {
        const errorData = await response.json();
        console.error("Greška prilikom izmene statusa:", errorData.message);
      }
    } catch (error) {
      console.error("Greška prilikom izmene statusa:", error);
    }
  };

  const handleAccept = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/majstori/odobri/${id}`, {
        method: "PUT",
      });

      if (response.ok) {
        setZahtevi((prev) =>
          prev.map((majstor) =>
            majstor._id === id ? { ...majstor, status: "prihvacen" } : majstor
          )
        );
      } else {
        const errorData = await response.json();
        console.error("Greška prilikom prihvatanja:", errorData.message);
      }
    } catch (error) {
      console.error("Greška prilikom prihvatanja:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/majstori/odbij/${id}`, {
        method: "PUT",
      });

      if (response.ok) {
        setZahtevi((prev) =>
          prev.map((majstor) =>
            majstor._id === id ? { ...majstor, status: "otkazan" } : majstor
          )
        );
      } else {
        const errorData = await response.json();
        console.error("Greška prilikom odbijanja:", errorData.message);
      }
    } catch (error) {
      console.error("Greška prilikom odbijanja:", error);
    }
  };

  const handleShowProfile = (id) => {
    navigate(`/majstor/${id}`); // Navigiraj do profila majstora
  };

  return (
    <Box sx={{ overflowY: "auto", flexGrow: 1, p: 2, minHeight: "100vh", mt: 10 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Ime i prezime</StyledTableCell>
              <StyledTableCell>Datum rezervacije</StyledTableCell>
              <StyledTableCell>Usluga</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Akcije</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {zahtevi.length === 0 ? (
              <TableRow>
                <StyledTableCell colSpan={5}>
                  Nema zakazivanja za prikazivanje.
                </StyledTableCell>
              </TableRow>
            ) : (
              zahtevi.map((row) => (
                <React.Fragment key={row._id}>
                  <TableRow>
                    <StyledTableCell component="th" scope="row">
                      {row.korisnik.ime} {row.korisnik.prezime}
                    </StyledTableCell>
                    <StyledTableCell>
                      {new Date(row.datumRezervacije).toLocaleString()}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.cena.usluga}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Select
                        value={row.status}
                        onChange={(e) => handleChangeStatus(row._id, e.target.value, row.korisnik._id, 'statusChange')}
                        variant="outlined"
                        sx={{ minWidth: 200, height: 40 }}
                      >
                        <MenuItem value="naCekanju">Na čekanju</MenuItem>
                        <MenuItem value="prihvacena">Prihvaćena</MenuItem>
                        <MenuItem value="otkazana">Otkazana</MenuItem>
                        <MenuItem value="zavrsena">Završena</MenuItem>
                        <MenuItem value="pomerena">Pomerena</MenuItem>
                      </Select>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button onClick={() => setExpanded(prev => ({ ...prev, [row._id]: !prev[row._id] }))}>
                        {expanded[row._id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        {expanded[row._id] ? " Sakrij napomenu" : " Prikaži napomenu"}

                      </Button>
                    </StyledTableCell>
                  </TableRow>
                  {expanded[row._id] && (
                    <TableRow>
                      <StyledTableCell colSpan={5}>
                        <Box sx={{ padding: 2 }}>
                          <strong>Napomena:</strong> {row.napomena || "Nema napomene."}
                          <Box sx={{ mt: 2 }}>
                            <textarea
                              rows={4}
                              placeholder="Unesite odgovor..."
                              value={odgovor}
                              onChange={(e) => setOdgovor(e.target.value)}
                              style={{ width: "100%" }}
                            />
                             <Button
                              onClick={() => handleChangeStatus(row._id, row.status, row.korisnik._id, 'sendResponse')} // Koristi trenutni status
                              disabled={!odgovor} // Onemogući dugme ako je odgovor prazan
                            >
                              Odgovori
                            </Button>
                            </Box>
                        </Box>
                      </StyledTableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
