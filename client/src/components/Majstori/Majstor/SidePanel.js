import { useEffect, useState } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography, styled, Button, Modal, TextField } from "@mui/material";
import { BASE_URL } from "../../../config";
import ZakaziTermin from "../../Forma/ZakaziTermin";

const SidePanel = ({ majstorId, role }) => {
  const [cenaUsluga, setCenaUsluga] = useState([]);
  const [error, setError] = useState(null);
  const [zakaziTermin, setZakaziTermin] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [editServiceModal, setEditServiceModal] = useState(false);
  const [editedService, setEditedService] = useState({});

  useEffect(() => {
    const fetchCeneUsluga = async () => {
      try {
        const response = await fetch(`${BASE_URL}/usluge/${majstorId}`);
        const data = await response.json();
        if (data.success) {
          setCenaUsluga(data.data);
        } else {
          setError("Nema pronađenih cena usluga.");
        }
      } catch (error) {
        console.error("Greška prilikom učitavanja cena usluga:", error);
        setError("Greška prilikom učitavanja cena usluga.");
      }
    };

    fetchCeneUsluga();
  }, [majstorId]);

  const handleDelete = async (id) => {
    if (
      window.confirm("Da li ste sigurni da želite da obrišete ovu cenu usluge?")
    ) {
      try {
        const response = await fetch(`${BASE_URL}/usluge/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (data.success) {
          setCenaUsluga((prev) => prev.filter((c) => c._id !== id));
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error("Greška prilikom brisanja cene usluge:", error);
        setError("Greška prilikom brisanja cene usluge.");
      }
    }
  };
  const handleUpdate = async () => {
    try {
      const response = await fetch(`${BASE_URL}/usluge/${editedService._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedService),
      });
      const data = await response.json();
      if (data.success) {
        setCenaUsluga((prev) =>
          prev.map((service) =>
            service._id === editedService._id ? { ...service, ...editedService } : service
          )
        );
        setEditServiceModal(false);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Greška prilikom ažuriranja cene usluge:", error);
      setError("Greška prilikom ažuriranja cene usluge.");
    }
  };

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1976d2",
      color: "white",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Cenovnik
      </Typography>
      <Box sx={{ overflowX: "scroll", maxWidth: "55vw", p: 2, mr: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Usluga</StyledTableCell>
                <StyledTableCell>Cena</StyledTableCell>
                <StyledTableCell>Tip cene</StyledTableCell>
                {role === "majstor" && (
                  <>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </>
                )}
                {role === "korisnik" && (
                  <>
                    <StyledTableCell></StyledTableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {cenaUsluga.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.usluga}
                  </StyledTableCell>
                  <StyledTableCell>{row.cena}</StyledTableCell>
                  <StyledTableCell>{row.tipCene}</StyledTableCell>
                  {role === "majstor" && (
                    <>
                      <StyledTableCell>
                        <Button
                          variant="outlined"
                         
                          onClick={() => {
                             setEditedService(row);
                             setEditServiceModal(true);
                          }}
                        >
                          Izmeni
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Button
                        variant="outlined"
                          sx={{ color: "#ff8606", borderColor:"#ff8606" }}
                          onClick={() => handleDelete(row._id)} // Poziva funkciju za brisanje
                        >
                          Obriši
                        </Button>
                      </StyledTableCell>
                    </>
                  )}
                  {role === "korisnik" && (
                    <StyledTableCell>
                      <Button
                        variant="outlined"
                        sx={{ color: "#F0A500", borderColor: "#F0A500", }}
                        onClick={() => {
                          setSelectedService(row); // Setovanje id usluge
                          setZakaziTermin(true); // Otvaranje modala
                        }}
                      >
                        Zakazi
                      </Button>
                      {/* Modal for scheduling an appointment */}
                      <Modal
                        open={zakaziTermin}
                        onClose={() => setZakaziTermin(false)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Box
                          sx={{
                            backgroundColor: "white",
                            padding: 2,
                            borderRadius: 1,
                            width: "400px",
                          }}
                        >
                          <ZakaziTermin
                            onClose={() => setZakaziTermin(false)}
                            onAdd={() => {
                              // Function for refreshing data
                            }}
                            selectedService={selectedService} // Prosledi ID usluge
                          />
                        </Box>
                      </Modal>
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              ))}
              <Modal
  open={editServiceModal}
  onClose={() => setEditServiceModal(false)}
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <Box
    sx={{
      backgroundColor: "white",
      padding: 3,
      borderRadius: 2,
      width: "400px",
      boxShadow: 3, // Dodajte senku
    }}
  >
    <Typography variant="h6" sx={{ mb: 2 }}>
      Izmeni cenu
    </Typography>
    <TextField
      type="text"
      value={editedService.cena || ""}
      onChange={(e) => setEditedService({ ...editedService, cena: e.target.value })}
      placeholder="Cena"
      fullWidth
      sx={{ mb: 2 }} // Razmak ispod
    />
    <TextField
      type="text"
      value={editedService.tipCene || ""}
      onChange={(e) => setEditedService({ ...editedService, tipCene: e.target.value })}
      placeholder="Tip cene"
      fullWidth
      sx={{ mb: 2 }} // Razmak ispod
    />
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button 
        onClick={handleUpdate} 
        variant="outlined" 
        color="primary"
        sx={{ width: "48%" }} // Širina dugmeta
      >
        Sačuvaj
      </Button>
      <Button 
        onClick={() => setEditServiceModal(false)} 
        variant="outlined" 
        
        sx={{ width: "48%" , color:"#F0A500", borderColor:"#F0A500" }} // Širina dugmeta
      >
        Otkaži
      </Button>
    </Box>
  </Box>
</Modal>

            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default SidePanel;