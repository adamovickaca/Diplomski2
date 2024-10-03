import { Fragment, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import DodajTerminForma from "../../components/Forma/DodajTerminForma.js";
import Modal from "@mui/material/Modal"; // Uvezi Modal iz MUI

const RasporedMajstor = () => {
  const rowGrupni = ["Usluga", "Vreme", "Klijent", "Adresa"];
  const rowNamesGrupni = ["Usluga", "vreme", "ImeK", "adresa"];

  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false); // Dodaj stanje za formu
  const [terminForm, setTerminForm] = useState(false);

  const Tabela = ({ row, niz, rowNames }) => {
    return (
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {row.map((r, i) => (
                <TableCell key={i} align="right">
                  {r}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {niz.map((el, i) => (
              <TableRow key={i}>
                {rowNames.map((r, index) => (
                  <TableCell key={index} align="right">
                    {el[r]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Fragment>
      <Box sx={{ display: "flex", alignItems: "center", margin: "2%" }}>
        <IconButton onClick={() => navigate("/majstor")} aria-label="back">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ marginLeft: 1 }}>
          Termini
        </Typography>
      </Box>
      <Tabela row={rowGrupni} niz={[]} rowNames={rowNamesGrupni} />

      <Box>
        <Button sx={{ mt: 2 }} onClick={() => setTerminForm(true)}>
          Dodaj termin
        </Button>
      </Box>
      <Modal open={terminForm} onClose={() => setTerminForm(false)}>
        <Box sx={{ backgroundColor: "white", padding: 2, borderRadius: 1 }}>
          <DodajTerminForma
            onClose={() => setTerminForm(false)}
            onAdd={() => {
              /* funkcija za osvežavanje podataka */
            }}
          />
        </Box>
      </Modal>

    </Fragment>
  );
};

export default RasporedMajstor;
