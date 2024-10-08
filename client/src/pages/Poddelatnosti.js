import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../config.js';
import Loading from '../components/LoadError/Loading';
import ErrorMessage from '../components/LoadError/Error';
import { Box, Button, Typography, Grid, Container,Card, CardActions, CardContent, CardMedia, CircularProgress } from '@mui/material';

const Poddelatnosti = () => {
  const { delatnostId } = useParams();
  const [poddelatnosti, setPoddelatnosti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPoddelatnosti = async () => {
      try {
        const response = await fetch(`${BASE_URL}/poddelatnosti/poddelatnost/${delatnostId}`);
        if (!response.ok) {
          throw new Error('Greška prilikom učitavanja poddelatnosti');
        }
        const data = await response.json();
        setPoddelatnosti(data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPoddelatnosti();
  }, [delatnostId]);

  const handleMajstori = (id) => {
    navigate(`/majstori/${id}`); // Navigira na stranicu poddelatnosti
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <CircularProgress /> {/* Prikazuje loading animaciju */}
    </Box>
  );

  if (error) return <ErrorMessage message={error} />;

  return (
    <Container sx={{ mt: 15 }}>
      <Typography variant='h3' align="center" gutterBottom>
        Poddelatnosti 
      </Typography>
      <Grid container spacing={1} justifyContent="center">
        {poddelatnosti.map((poddelatnost) => (
          <Grid item xs={12} sm={6} md={4} key={poddelatnost.id}>
          <Card sx={{ maxWidth: 345, ml: 9, mt: 2, mb: 2 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={poddelatnost.slika || Image} // Koristi default sliku ako slika nije dostupna
              title={poddelatnost.opis}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {poddelatnost.naziv}
              </Typography>
             
            </CardContent>
            <CardActions>
            <Button 
                  size="small" 
                  sx={{ color: "#CF7500" }} 
                  onClick={() => handleMajstori(poddelatnost._id)} // Dodaj onClick handler
                >
                  Vidi majstore
                </Button>
            </CardActions>
          </Card>
        </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Poddelatnosti;
