import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, CardMedia, Button } from '@mui/material';

const BlogDetail = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const { blog } = location.state || {};

  if (!blog) return <Typography>Loading...</Typography>;

  const handleBack = () => {
    navigate('/blog'); // Navigira nazad na listu blogova
  };

  return (
    <Box sx={{ padding: '2rem', mt:10, minHeight:"100vh" }}>
      <Typography variant="h4" sx={{mb:4}}>{blog.naslov}</Typography>
      <CardMedia 
        component="img"  
        image={blog.slika} 
        alt={blog.naslov} 
        sx={{ maxWidth: '400px', height: 'auto', margin: '0 auto' }} // Stil za smanjenje veličine slike
      />
      <Typography variant="body1" sx={{ marginTop: '1rem' }}>
        {blog.tekst}
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        sx={{ marginTop: '2rem' }} 
        onClick={handleBack} // OnClick handler za povratak
      >
        Povratak na blogove
      </Button>
    </Box>
  );
};

export default BlogDetail;
