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
import DodajBlog from "../../components/Forma/DodajBlog.js";
import Modal from "@mui/material/Modal"; // Uvezi Modal iz MUI

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

export default function Blogovi() {
  const [username, setUsername] = React.useState("");
  const [currentName, setCurrentName] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [dodajBlog, setDodajBlog] = useState(false);

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
      color: "#1A1C20", // Postavlja boju labela
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#3d353e", // Postavlja boju kada je polje fokusirano
    },
  };
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between", // Razdvaja elemente na krajeve
          alignItems: "baseline",
          mr: 7,
          mb: 2, // Dodaj malo razmaka ispod
          
        }}
      >
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 2 }}>
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

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1A1C20",
            color: "white",
            "&:hover": {
              backgroundColor: "#3d353e",
            },
          }}
          onClick={() => setDodajBlog(true)}
        >
          Dodaj Blog
        </Button>
      </Box>
      <Modal open={dodajBlog} onClose={() => setDodajBlog(false)}>
        <Box sx={{ backgroundColor: "white", padding: 2, borderRadius: 1 }}>
          <DodajBlog
            onClose={() => setDodajBlog(false)}
            onAdd={() => {
              /* funkcija za osvežavanje podataka */
            }}
          />
        </Box>
      </Modal>

      <Box sx={{ overflowX: "scroll", maxWidth: "95vw", minHeight:"80vh",p: 2, mr: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Naslov</StyledTableCell>
                <StyledTableCell>Datum</StyledTableCell>
                <StyledTableCell>Tagovi</StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
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
                    <FormControl
                      variant="standard"
                      sx={{ p: 0, m: 0, minWidth: 120 }}
                      size="small"
                    >
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        //value={age}
                        // onChange={(e) => { handleChange(row.id, e.target.value) }}
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
                  <StyledTableCell>
                    <Button
                      sx={{
                        color: "#c928bd",
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
}
