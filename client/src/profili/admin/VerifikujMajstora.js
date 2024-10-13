import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, styled } from "@mui/material";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom"; // Uvezi useNavigate

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1A1C20",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function VerifikujMajstora() {
  const [majstori, setMajstori] = useState([]);
  const navigate = useNavigate(); // Inicijalizuj useNavigate

  useEffect(() => {
    const fetchMajstori = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/majstori/nacekanju`);
        const data = await response.json();

        if (response.ok) {
          setMajstori(data.data);
        } else {
          console.error("Greška prilikom učitavanja majstora:", data.message);
        }
      } catch (error) {
        console.error("Greška prilikom učitavanja majstora:", error);
      }
    };

    fetchMajstori();
  }, []);

  const handleAccept = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/majstori/odobri/${id}`, {
        method: "PUT",
      });

      if (response.ok) {
        setMajstori((prev) =>
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
        setMajstori((prev) =>
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
    <Box sx={{ overflowY: "auto", flexGrow: 1, p: 2, minHeight: "100vh" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Ime</StyledTableCell>
              <StyledTableCell>Delatnost</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Akcije</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {majstori.map((row) => (
              <TableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {row.ime} {row.prezime}
                </StyledTableCell>
                <StyledTableCell>{row.poddelatnost[0]?.naziv || "N/A"}</StyledTableCell>
                <StyledTableCell>{row.status}</StyledTableCell>
                <StyledTableCell>
                  <Button 
                    variant="outlined" 
                    onClick={() => handleAccept(row._id)}
                  >
                    Prihvati
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={() => handleReject(row._id)}
                    sx={{ ml: 2, color:"#F0A500", borderColor:"#F0A500" }}
                  >
                    Odbij
                  </Button>
                  <Button 
                    variant="contained" 
                    onClick={() => handleShowProfile(row._id)} 
                    sx={{ ml: 8 }}
                  >
                    Prikaži profil
                  </Button>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
