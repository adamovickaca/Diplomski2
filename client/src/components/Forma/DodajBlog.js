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
    component="form"
    onSubmit={handleSubmit}
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2,
      width: "40%",
      height: "90%",
      justifyContent: "center",
      alignItems: "center",
      margin: "auto", // Centriranje na horizontalnoj osi
      position: "absolute", // Pozicija apsolutno
      top: "50%", // 50% od vrha
      left: "50%", // 50% od leve strane
      transform: "translate(-50%, -50%)", // Pomeri na sredinu
      backgroundColor: "white",
      padding: 4,
      boxShadow: 3,
    }}
  >
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
          <Box sx={{flexDirection:"column"}}>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            
          >
            Dodaj Blog
          </Button>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{color:"#F0A500", borderColor:"#F0A500", ml:5}}
          >
            Otkaži
          </Button>
          </Box>
    </Box>
  );
};

export default DodajBlog;
