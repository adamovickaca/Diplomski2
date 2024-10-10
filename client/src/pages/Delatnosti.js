import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardActions, CardContent, CardMedia, Button, CircularProgress, Modal } from '@mui/material';
import { BASE_URL } from '../config.js';
import ErrorMessage from '../components/LoadError/Error.js';
import DodajDelatnost from '../components/Forma/DodajDelatnost.js';
import Image from '../assets/images/fasader.jpg';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Delatnosti = () => {
  const [delatnosti, setDelatnosti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchDelatnosti = async () => {
    try {
      const response = await fetch(`${BASE_URL}/delatnosti/delatnosti`);
      if (!response.ok) {
        throw new Error('Greška prilikom učitavanja delatnosti');
      }
      const data = await response.json();
      if (Array.isArray(data.data)) {
        setDelatnosti(data.data);
      } else {
        throw new Error('Podaci nisu u ispravnom formatu');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDelatnosti();
  }, []);

  const handlePoddelatnosti = (id) => {
    navigate(`/poddelatnosti/${id}`); // Navigira na stranicu poddelatnosti
  };

  const handleAddDelatnost = async (newDelatnost) => {
    try {
      const response = await fetch(`${BASE_URL}/delatnosti/delatnost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDelatnost),
      });

      if (!response.ok) {
        throw new Error('Greška prilikom dodavanja delatnosti');
      }
      // Ponovo učitaj delatnosti
      fetchDelatnosti();
    } catch (error) {
      console.error('Greška prilikom dodavanja delatnosti:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', mt: 15 }}>
      <Typography variant='h3'>Sve naše usluge na jednom mestu</Typography>

      <Button variant="contained" onClick={() => setOpenModal(true)} sx={{ mb: 4 }}>
        Dodaj Delatnost
      </Button>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ width: 400, bgcolor: 'white', p: 4, borderRadius: 2, margin: 'auto', mt: '10%' }}>
          <DodajDelatnost onClose={() => setOpenModal(false)} onAdd={handleAddDelatnost} />
        </Box>
      </Modal>

      {/* Loading state */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error state */}
      {error && <ErrorMessage message={error} />}

      <Grid container spacing={1} justifyContent="center">
        {delatnosti.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card sx={{ maxWidth: 345, ml: 9, mt: 2, mb: 2 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={item.slika || Image}
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
                <Button size="small" sx={{ color: "#CF7500" }} 
                onClick={() => handlePoddelatnosti(item._id)}
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
