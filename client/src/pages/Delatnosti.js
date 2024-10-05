import React, { useEffect, useState } from 'react';
import Image from '../assets/images/fasader.jpg'; // Uvoz slike
import { Box, Grid, Typography, Card, CardActions, CardContent, CardMedia, Button, CircularProgress } from '@mui/material';
import { BASE_URL } from '../config.js';
import ErrorMessage from '../components/LoadError/Error.js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Delatnosti = () => {
  const [delatnosti, setDelatnosti] = useState([]); // Drži delatnosti
  const [loading, setLoading] = useState(true); // Za loading state
  const [error, setError] = useState(null); // Za greške
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchDelatnosti = async () => {
      try {
        const response = await fetch(`${BASE_URL}/delatnosti/delatnosti`);
        if (!response.ok) {
          throw new Error('Greška prilikom učitavanja delatnosti');
        }
        const data = await response.json();
        console.log(data); // Ovo je za debugovanje
        if (Array.isArray(data.data)) {
          setDelatnosti(data.data); // Postavi delatnosti na data
        } else {
          throw new Error('Podaci nisu u ispravnom formatu');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDelatnosti();
  }, []);

  const handlePoddelatnosti = (id) => {
    navigate(`/poddelatnosti/${id}`); // Navigira na stranicu poddelatnosti
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        mt: 15,
      }}
    >
      <Typography variant='h3'>Sve naše usluge na jednom mestu</Typography>

      {/* Loading state */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <CircularProgress /> {/* Prikazuje loading animaciju */}
        </Box>
      )}

      {/* Error state */}
      {error && <ErrorMessage message={error} />}

      <Grid container spacing={1} justifyContent="center">
        {delatnosti.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ maxWidth: 345, ml: 9, mt: 2, mb: 2 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={item.slika || Image} // Koristi default sliku ako slika nije dostupna
                title={item.opis}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.naziv}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.opis}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  sx={{ color: "#CF7500" }} 
                  onClick={() => handlePoddelatnosti(item._id)} // Dodaj onClick handler
                >
                  Poddelatnosti
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Delatnosti;
