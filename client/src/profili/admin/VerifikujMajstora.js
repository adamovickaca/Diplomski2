import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TextField, Button, styled } from "@mui/material";
import { useState } from "react";
import { FormControl, Select } from "@mui/material";
import { MenuItem } from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1A1C20",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function VerifikujMajstora() {
  const [username, setUsername] = React.useState("");

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ccc",
      },
      "&:hover fieldset": {
        borderColor: "#999",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1A1C20",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#1A1C20",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#3d353e",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Postavlja visinu na 100% visine prozora
        overflow: "hidden", // Sprečava skrolovanje
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          alignItems: "baseline",
          mb: 2, // Razmak od donjeg dela
          p: 2,
        }}
      >
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={textFieldStyles}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#1A1C20",
            color: "white",
            "&:hover": {
              backgroundColor: "#3d353e",
            },
          }}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ overflowY: "auto", flexGrow: 1, p: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Ime i prezime</StyledTableCell>
                <StyledTableCell>Delatnost</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.title}
                  </StyledTableCell>
                  <StyledTableCell>{row.companyName}</StyledTableCell>
                  <StyledTableCell>
                    <FormControl variant="standard" sx={{ minWidth: 120 }} size="small">
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        sx={{ p: 0, m: 0 }}
                        value={row.status}
                      >
                        <MenuItem value={"Applied"}>Applied</MenuItem>
                        <MenuItem value={"Finished"}>Finished</MenuItem>
                        <MenuItem value={"Denied"}>Denied</MenuItem>
                        <MenuItem value={"Accepted"}>Accepted</MenuItem>
                      </Select>
                    </FormControl>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
