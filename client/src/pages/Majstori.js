import React, { useState, useEffect } from "react";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import MajstorCard from "../components/Majstori/MajstorCard"; // Import MajstorCard component
import { BASE_URL } from "../config.js";

const Majstori = () => {
  const [value, setValue] = useState("1");
  const [query, setQuery] = useState("");
  const [majstori, setMajstori] = useState([]); // Holds the data about masters
  const [poddelatnosti, setPoddelatnosti] = useState([]);
  const [selectedPoddelatnost, setSelectedPoddelatnost] = useState(""); // Držimo samo jedan izabrani ID

  const handlePoddelatnostChange = (event) => {
    setSelectedPoddelatnost(event.target.value); // Postavlja izabrani ID
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setQuery(""); // Reset query when filter changes
  };

  const handleSearch = async () => {
    setQuery(query.trim());

    let endpoint = ""; // Initialize endpoint

    if (value === "1") {
      endpoint = `${BASE_URL}/majstori/majstor/filter/ime?ime=${query}`;
    } else if (value === "2") {
      endpoint = `${BASE_URL}/majstori/majstor/filter/grad?grad=${query}`;
    } else if (value === "3" && selectedPoddelatnost) { // Proveri da li je poddelatnost izabrana
      endpoint = `${BASE_URL}/majstori/majstor/filter/poddelatnost?poddelatnost=${selectedPoddelatnost}`;
    }

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      if (data.success) {
        setMajstori(data.data || []); // Set to empty array if no data found
      } else {
        setMajstori([]); // Handle no results found
      }
    } catch (error) {
      console.error(error);
      setMajstori([]); // Reset majstori in case of error
    }
  };

  useEffect(() => {
    const fetchMajstori = async () => {
      try {
        const response = await fetch(`${BASE_URL}/majstori/majstor`);
        const data = await response.json();
        setMajstori(data.data || []); // Set fetched masters
      } catch (error) {
        console.error(error);
      }
    };
    fetchMajstori();
  }, []); // Fetch all masters on initial load

  useEffect(() => {
    const fetchPoddelatnosti = async () => {
      try {
        const response = await fetch(`${BASE_URL}/poddelatnosti/sve`);
        const data = await response.json();
        if (data.success) {
          setPoddelatnosti(data.data); // set poddelatnosti in state
        }
      } catch (error) {
        console.error("Error fetching poddelatnosti:", error);
      }
    };

    fetchPoddelatnosti();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "120vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          boxShadow: 3,
          maxWidth: "900px",
          mt: 10,
        }}
      >
        <ToggleButtonGroup
          value={value}
          exclusive
          onChange={handleChange}
          aria-label="majstori filter"
        >
          <ToggleButton value="1" aria-label="Search by name">
            Po imenu
          </ToggleButton>
          <ToggleButton value="2" aria-label="Search by city">
            Po gradu
          </ToggleButton>
          <ToggleButton value="3" aria-label="Search by specialization">
            Po poddelatnosti
          </ToggleButton>
        </ToggleButtonGroup>

        {value === "1" && (
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <TextField
              variant="outlined"
              label="Pretrazi majstore po imenu"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ccc" },
                  "&:hover fieldset": { borderColor: "#999" },
                  "&.Mui-focused fieldset": { borderColor: "#1A1C20" },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{
                backgroundColor: "#F0A500",
                color: "white",
                "&:hover": { backgroundColor: "#CF7500" },
                ml: 5,
              }}
            >
              Pretrazi
            </Button>
          </Box>
        )}

        {value === "2" && (
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <TextField
              variant="outlined"
              label="Pretrazi majstore po gradu"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ccc" },
                  "&:hover fieldset": { borderColor: "#999" },
                  "&.Mui-focused fieldset": { borderColor: "#1A1C20" },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{
                backgroundColor: "#F0A500",
                color: "white",
                "&:hover": { backgroundColor: "#CF7500" },
                ml: 5,
              }}
            >
              Pretrazi
            </Button>
          </Box>
        )}

        {value === "3" && (
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <InputLabel id="poddelatnost-label">Izaberite poddelatnost</InputLabel>
            <Select
              labelId="poddelatnost-label"
              value={selectedPoddelatnost}
              onChange={handlePoddelatnostChange}
              sx={{ minWidth: 200 }}
            >
              {poddelatnosti.map((poddelatnost) => (
                <MenuItem key={poddelatnost._id} value={poddelatnost._id}>
                  {poddelatnost.naziv}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{
                backgroundColor: "#F0A500",
                color: "white",
                "&:hover": { backgroundColor: "#CF7500" },
                ml: 5,
              }}
            >
              Pretrazi
            </Button>
          </Box>
        )}
      </Box>

      {/* Render MajstorCard components */}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {majstori.length > 0 ? (
            majstori.map((majstor) => (
              <MajstorCard key={majstor._id} majstor={majstor} />
            ))
          ) : (
            <Typography>Nema pronađenih majstora.</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Majstori;
