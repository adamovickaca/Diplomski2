import React, { useState, useEffect } from "react";
import { Box, ToggleButton, ToggleButtonGroup, Typography, Button, TextField, Autocomplete } from "@mui/material";
import pozadina from "../assets/images/slika.jpg";
import MajstorCard from "../components/Majstori/MajstorCard"; // Import MajstorCard component

const Majstori = () => {
  const [value, setValue] = useState("1");
  const [query, setQuery] = useState("");
  const [majstori, setMajstori] = useState([]); // Holds the data about masters

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearch = () => {
    setQuery(query.trim());
    console.log("handle search");
    const filteredMajstori = mockMajstori.filter((majstor) =>
      majstor.name.toLowerCase().includes(query.toLowerCase())
    );
    setMajstori(filteredMajstori);
  };

  useEffect(() => {
    const fetchMajstori = async () => {
      try {
        const response = await fetch(`YOUR_API_ENDPOINT?query=${query}`);
        const data = await response.json();
        setMajstori(data); // Set fetched masters
      } catch (error) {
        console.error(error);
      }
    };
    fetchMajstori();
  }, [query]); // Reload when query changes

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
      color: "#1A1C20", // Label color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#3d353e", // Focused label color
    },
  };

  // Simulated masters data
  const mockMajstori = [
    {
      _id: "1",
      name: "Marko Marković",
      city: "Beograd",
      averageRating: 4.5,
      totalRating: 10,
      delatnost: "Moler",
    },
    {
      _id: "2",
      name: "Jovan Jovanović",
      city: "Novi Sad",
      averageRating: 4.8,
      totalRating: 20,
      delatnost: "Zidar",
    },
    {
      _id: "3",
      name: "Ana Anić",
      city: "Niš",
      averageRating: 4.2,
      totalRating: 5,
      delatnost: "Elektro",
    },
    {
      _id: "4",
      name: "Milena Milošević",
      city: "Kragujevac",
      averageRating: 4.6,
      totalRating: 15,
      delatnost: "Krovopokrivač",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          typography: "body1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          //borderRadius: "1rem",
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
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            mb: 2,
          }}
        >
          <ToggleButton
            value="1"
            aria-label="Search by name"
            sx={{
              flex: 1,
              padding: "7px 15px",
              borderColor: "#1A1C20",
              "&.Mui-selected": { color: "#F4F4F4", background: "#1A1C20" },
            }}
          >
            Po imenu
          </ToggleButton>
          <ToggleButton
            value="2"
            aria-label="Search by city"
            sx={{
              flex: 1,
              padding: "1px 15px",
              borderColor: "#1A1C20",
              "&.Mui-selected": { color: "#F4F4F4", background: "#1A1C20" },
            }}
          >
            Po gradu
          </ToggleButton>
          <ToggleButton
            value="3"
            aria-label="Search by specialization"
            sx={{
              flex: 1,
              padding: "1px 15px",
              borderColor: "#1A1C20",
              "&.Mui-selected": { color: "#F4F4F4", background: "#1A1C20" },
            }}
          >
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
              sx={textFieldStyles}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{
                backgroundColor: " #F0A500",
                color: "white",
                "&:hover": { backgroundColor: " #1A1C20" },
                height: 56,
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
              sx={textFieldStyles}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{
                backgroundColor: "#1A1C20",
                color: "white",
                "&:hover": { backgroundColor: "#3d353e" },
                height: 56,
              }}
            >
              Pretrazi
            </Button>
          </Box>
        )}

        {value === "3" && (
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
             // options={top100Films.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Pretraži po poddelatnosti"
                  sx={textFieldStyles}
                />
              )}
              sx={{ width: 216 }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{
                backgroundColor: "#1A1C20",
                color: "white",
                "&:hover": { backgroundColor: "#3d353e" },
                height: 56,
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
          width: "100%",
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
          {mockMajstori.map((majstor) => (
            <MajstorCard key={majstor._id} majstor={majstor} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Majstori;
