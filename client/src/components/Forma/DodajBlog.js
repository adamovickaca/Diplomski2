import { Box, TextField, Button, FormControl, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";

const DodajBlog = ({ onClose, onAdd, tags }) => {
  const [naslov, setNaslov] = useState("");
  const [kratakOpis, setKratakOpis] = useState("");
  const [ceoTekst, setCeoTekst] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [tagovi, setTagovi] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = {
      naslov,
      kratakOpis,
      tekst: ceoTekst,
      tag: selectedTag, 
      slika: selectedFile,
    };
    console.log("Dodajemo blog:", newBlog); 
    try {
      await onAdd(newBlog);
      // Resetuj formu
      setNaslov("");
      setKratakOpis("");
      setCeoTekst("");
      setSelectedTag("");
      setSelectedFile(null);
      setPreviewURL("");
    } catch (error) {
      console.error("Greška prilikom dodavanja bloga:", error);
    }
  };

  const handleInputFile = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setSelectedFile(data.url);
    setPreviewURL(data.url);
    setSelectedFile(data.url);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: 3,
          gap: "1vh",
          width: "500px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Naslov"
            value={naslov}
            onChange={(e) => setNaslov(e.target.value)}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Kratak opis"
            value={kratakOpis}
            onChange={(e) => setKratakOpis(e.target.value)}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Ceo tekst"
            value={ceoTekst}
            onChange={(e) => setCeoTekst(e.target.value)}
            required
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
           {/* Dodaj Select za tagove */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)} displayEmpty>
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
          <Box>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.25rem",
              }}
            >
              {selectedFile && (
                <figure
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    borderColor: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={previewURL}
                    alt="Preview"
                    style={{ width: "100%", borderRadius: "40%" }}
                  />
                </figure>
              )}
              <div
                style={{ position: "relative", width: "130px", height: "50px" }}
              >
                <input
                  type="file"
                  onChange={handleInputFile}
                  accept=".jpg, .png"
                  id="customFile"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                />
                <label
                  htmlFor="customFile"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    fontSize: "15px",
                    lineHeight: "1.5",
                    overflow: "hidden",
                    backgroundColor: "#0066ff46",
                    color: "text.headingColor",
                    fontWeight: "600",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Upload photo
                </label>
              </div>
            </div>
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#1A1C20",
              color: "white",
              "&:hover": {
                backgroundColor: "#3d353e",
              },
              width: "200px",
            }}
          >
            Dodaj Blog
          </Button>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              mt: 3,
              mb: 2,
              ml: 3,
              backgroundColor: "#1A1C20",
              color: "white",
              "&:hover": {
                backgroundColor: "#3d353e",
              },
              width: "200px",
            }}
          >
            Otkaži
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default DodajBlog;
