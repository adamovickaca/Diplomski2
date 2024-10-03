import React, { useState, useEffect } from "react";
import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import BlogCard from "../components/Blog/BlogCard"; // Import the BlogCard component
import slika from "../assets/images/cistacica.jpg"
const Blog = () => {
  const [value, setValue] = useState("1");
  const [filteredBlog, setFilteredBlog] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const mockBlog = [
    {
      _id: "1",
      name: "Krečenje",
      city: "Grad 1",
      description: "Ovo je kratak opis teme krečenja.",
      image: slika,
      category: "Krečenje",
    },
    {
      _id: "2",
      name: "Zidarstvo",
      city: "Grad 2",
      description: "Ovo je kratak opis teme zidanja.",
      image: "putanja/do/slike2.jpg",
      category: "Zidarstvo",
    },
    {
      _id: "3",
      name: "Krovovi i njihovo održavanje",
      city: "Kragujevac",
      description: "Ovo je kratak opis teme krovova.",
      image: "putanja/do/slike3.jpg",
      category: "Krovopokrivač",
    },
    {
      _id: "4",
      name: "Još jedan blog o krovovima",
      city: "Beograd",
      description: "Ovo je još jedan kratak opis teme krovova.",
      image: "putanja/do/slike4.jpg",
      category: "Krovopokrivač",
    },
  ];

  useEffect(() => {
    const filterBlogs = () => {
      switch (value) {
        case "1":
          setFilteredBlog(mockBlog.filter(blog => blog.category === "Krečenje"));
          break;
        case "2":
          setFilteredBlog(mockBlog.filter(blog => blog.category === "Zidarstvo"));
          break;
        case "3":
          setFilteredBlog(mockBlog.filter(blog => blog.category === "Krovopokrivač"));
          break;
        default:
          setFilteredBlog(mockBlog);
      }
    };

    filterBlogs();
  }, [value]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        mt: 10,
      }}
    >
      <Box
        fullWidth
        sx={{
          typography: "body1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
        }}
      >
         <ToggleButtonGroup
          value={value}
          exclusive
          onChange={handleChange}
          aria-label="blog categories"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <ToggleButton
            value="1"
            aria-label="Krečenje"
            sx={{
              flex: 1,
              padding: "7px 15px",
              borderColor: "#1A1C20",
              "&.Mui-selected": { color: "#F4F4F4", background: "#1A1C20" },
            }}
          >
            Krečenje
          </ToggleButton>
          <ToggleButton
            value="2"
            aria-label="Zidarstvo"
            sx={{
              flex: 1,
              padding: "7px 15px",
              borderColor: "#1A1C20",
              "&.Mui-selected": { color: "#F4F4F4", background: "#1A1C20" },
            }}
          >
            Zidarstvo
          </ToggleButton>
          <ToggleButton
            value="3"
            aria-label="Krovopokrivač"
            sx={{
              flex: 1,
              padding: "7px 15px",
              borderColor: "#1A1C20",
              "&.Mui-selected": { color: "#F4F4F4", background: "#1A1C20" },
            }}
          >
            Krovopokrivač
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
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
          {filteredBlog.map((blog) => (
            <BlogCard key={blog._id} majstor={blog} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Blog;
