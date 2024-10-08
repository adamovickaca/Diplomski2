import { useEffect, useState } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography, styled, Button, Modal } from "@mui/material";
import { BASE_URL } from "../../../config";
import ZakaziTermin from "../../Forma/ZakaziTermin";

const SidePanel = ({ majstorId, role }) => {
  const [cenaUsluga, setCenaUsluga] = useState([]);
  const [error, setError] = useState(null);
  const [zakaziTermin, setZakaziTermin] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

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

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#F0A500",
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
                          sx={{
                            color: "#1A1C20",
                            border: "1px",
                            borderColor: "#ff8606",
                          }}
                          onClick={() => {
                            // Logika za izmenu cene
                          }}
                        >
                          Izmeni
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Button
                          sx={{ color: "#ff8606" }}
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
                        variant="contained"
                        sx={{ backgroundColor: "#F0A500", color: "white" }}
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
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default SidePanel;