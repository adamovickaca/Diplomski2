import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TextField, Button, Typography, styled } from "@mui/material";
import { useState } from "react";
import { FormControl, Select } from "@mui/material";
import { MenuItem } from "@mui/material";

const SidePanel = () => {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData("Krecenje", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
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
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
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
                <StyledTableCell>Vreme(okvirno)</StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.fat}</StyledTableCell>
                  <StyledTableCell>{row.calories}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      sx={{
                        color: "#1A1C20",
                        border: "1px",
                        borderColor: "#ff8606",
                      }}
                    >
                      {" "}
                      Izmeni
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button sx={{ color: "#ff8606" }}> Obrisi</Button>
                  </StyledTableCell>
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
