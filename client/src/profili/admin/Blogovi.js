import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, styled, Modal, FormControl, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import DodajBlog from "../../components/Forma/DodajBlog.js";
import { BASE_URL } from "../../config.js";
import IzmeniBlog from "../../components/Forma/IzmeniBlog.js"; // Importuj novu komponentu


const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1A1C20",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function Blogovi() {
  const [blogs, setBlogs] = useState([]);
  const [dodajBlog, setDodajBlog] = useState(false);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [izmeniBlog, setIzmeniBlog] = useState(false); // Dodaj stanje za izmenu
  const [currentBlog, setCurrentBlog] = useState(null); 
  
  const fetchBlogs = async (tag = "") => {
    try {
      const response = await fetch(`${BASE_URL}/blogovi/?tag=${tag}`);
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Greška prilikom učitavanja blogova:", error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch(`${BASE_URL}/blogovi/tags`);
      const data = await response.json();
      setTags(data);
    } catch (error) {
      console.error("Greška prilikom učitavanja tagova:", error);
    }
  };

  const handleAddBlog = async (newBlog) => {
    console.log("Blog koji se dodaje:", newBlog); // Dodaj ovo
    try {
      const response = await fetch(`${BASE_URL}/blogovi`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog),
      });
      const addedBlog = await response.json();
      setBlogs((prevBlogs) => [...prevBlogs, addedBlog]);
      setDodajBlog(false);
    } catch (error) {
      console.error("Greška prilikom dodavanja bloga:", error);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await fetch(`${BASE_URL}/blogovi/${id}`, {
        method: "DELETE",
      });
      setBlogs((prevBlogs) => prevBlogs.filter(blog => blog._id !== id));
    } catch (error) {
      console.error("Greška prilikom brisanja bloga:", error);
    }
  };
  const handleOpenEdit = (blog) => {
    setCurrentBlog(blog); // Postavi trenutni blog koji se menja
    setIzmeniBlog(true); // Otvori modal za izmenu
  };
  const handleUpdateBlog = async (id, updatedBlog) => {
    try {
      const response = await fetch(`${BASE_URL}/blogovi/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBlog),
      });
      const updatedData = await response.json();
      setBlogs((prevBlogs) => prevBlogs.map(blog => (blog._id === id ? updatedData : blog)));
    } catch (error) {
      console.error("Greška prilikom ažuriranja bloga:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchTags(); // Učitaj tagove prilikom mount-a
  }, []);

  const handleSearchByTag = () => {
    fetchBlogs(selectedTag); // Kada se klikne na dugme, pretražuje po odabranom tagu
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          mr: 7,
          mb: 2,
        }}
      >
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <Select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">
              <em>Odaberi tag</em>
            </MenuItem>
            {tags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleSearchByTag}>
          Pretraži
        </Button>
        <Button variant="contained" onClick={() => setDodajBlog(true)}>
          Dodaj Blog
        </Button>
      </Box>
      <Modal open={dodajBlog} onClose={() => setDodajBlog(false)}>
        <Box sx={{ backgroundColor: "white", padding: 2, borderRadius: 1 }}>
          <DodajBlog
            onClose={() => setDodajBlog(false)}
            onAdd={handleAddBlog}
            tags={tags}
          />
        </Box>
      </Modal>

      <Box sx={{ overflowX: "scroll", maxWidth: "95vw", minHeight: "80vh", p: 2, mr: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Naslov</StyledTableCell>
                <StyledTableCell>Tagovi</StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogs.map((row) => (
                <TableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.naslov}
                  </StyledTableCell>
                  <StyledTableCell>{row.tag}</StyledTableCell>
                  <StyledTableCell>
                    <Button onClick={() => handleOpenEdit(row)}>
                      Izmeni
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button onClick={() => handleDeleteBlog(row._id)}>Obriši</Button>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

       {/* Modal za izmenu */}
       <Modal open={izmeniBlog} onClose={() => setIzmeniBlog(false)}>
        <Box sx={{ backgroundColor: "white", padding: 2, borderRadius: 1 }}>
          {currentBlog && (
            <IzmeniBlog
              blog={currentBlog}
              onClose={() => setIzmeniBlog(false)}
              onUpdate={handleUpdateBlog}
            />
          )}
        </Box>
      </Modal>
    </>
  );
}
