import React, { useState, useEffect } from "react";
import { Box, ToggleButton, ToggleButtonGroup, Typography, CircularProgress } from "@mui/material";
import BlogCard from "../components/Blog/BlogCard"; // Import the BlogCard component
import { BASE_URL } from "../config"; // Uveri se da imaš BASE_URL definisan

const Blog = () => {
  const [value, setValue] = useState("1");
  const [filteredBlog, setFilteredBlog] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]); // Drži sve blogove
  const [loading, setLoading] = useState(true); // Za loading state
  const [error, setError] = useState(null); // Za greške

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/blogovi`);
        if (!response.ok) {
          throw new Error("Greška prilikom učitavanja blogova");
        }
        const blogs = await response.json();
        setAllBlogs(blogs);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const filterBlogs = () => {
      switch (value) {
        case "1":
          setFilteredBlog(allBlogs.filter((blog) => blog.tag === "Kuca"));
          break;
        case "2":
          setFilteredBlog(allBlogs.filter((blog) => blog.tag === "Dvoriste"));
          break;
        case "3":
          setFilteredBlog(allBlogs.filter((blog) => blog.tag === "Garderoba"));
          break; // Dodaj break ovde
        case "4":
          setFilteredBlog(allBlogs.filter((blog) => blog.tag === "Vozila"));
          break; // Dodaj break ovde
        default:
          setFilteredBlog(allBlogs);
      }
    };

    filterBlogs();
  }, [value, allBlogs]); // Dodaj allBlogs kao zavisnost

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress /> {/* Prikazuje loading animaciju */}
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" sx={{ mt: 10 }}>
        Error: {error} {/* Prikazuje grešku */}
      </Typography>
    );
  }

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
            aria-label="Kuća"
            sx={{
              flex: 1,
              padding: "7px 15px",
              borderColor: "#1A1C20",
              "&.Mui-selected": { color: "#F4F4F4", background: "#1A1C20" },
            }}
          >
            Kuća
          </ToggleButton>
          <ToggleButton
            value="2"
            aria-label="Dvorište"
            sx={{
              flex: 1,
              padding: "7px 15px",
              borderColor: "#1A1C20",
              "&.Mui-selected": { color: "#F4F4F4", background: "#1A1C20" },
            }}
          >
            Dvorište
          </ToggleButton>
          <ToggleButton
            value="3"
            aria-label="Garderoba"
            sx={{
              flex: 1,
              padding: "7px 15px",
              borderColor: "#1A1C20",
              "&.Mui-selected": { color: "#F4F4F4", background: "#1A1C20" },
            }}
          >
            Garderoba
          </ToggleButton>
          <ToggleButton
            value="4"
            aria-label="Vozila"
            sx={{
              flex: 1,
              padding: "7px 15px",
              borderColor: "#1A1C20",
              "&.Mui-selected": { color: "#F4F4F4", background: "#1A1C20" },
            }}
          >
            Vozila
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
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Blog;
