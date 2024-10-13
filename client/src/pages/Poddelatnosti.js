import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../config.js';
import Loading from '../components/LoadError/Loading';
import ErrorMessage from '../components/LoadError/Error';
import DodajPoddelatnost from '../components/Forma/DodajPoddelatnost.js';
import { Box, Button, Typography, Grid, Container, Card, CardActions, CardContent, CardMedia, CircularProgress } from '@mui/material';
import { authContext } from '../context/authContext.js';

const Poddelatnosti = () => {
  const { delatnostId } = useParams();
  const [poddelatnosti, setPoddelatnosti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const {user, role} = useContext(authContext);

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
    navigate(`/majstori/${id}`);
  };

  const handleAddPoddelatnost = async (newPoddelatnost) => {
    try {
      const response = await fetch(`${BASE_URL}/poddelatnosti/poddelatnost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPoddelatnost),
      });

      if (!response.ok) {
        throw new Error('Greška prilikom dodavanja poddelatnosti');
      }
      const updatedPoddelatnosti = await response.json();
      setPoddelatnosti((prev) => [...prev, updatedPoddelatnosti.poddelatnost]);
    } catch (error) {
      console.error('Greška prilikom dodavanja poddelatnosti:', error);
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <CircularProgress />
    </Box>
  );

  if (error) return <ErrorMessage message={error} />;

  return (
    <Container sx={{ mt: 15, minHeight:"100vh" }}>
      <Typography variant='h3' align="center" gutterBottom>
        Poddelatnosti 
      </Typography>

      {user && role === "admin" && (
      <Button variant="contained" sx={{mb:2}} onClick={() => setOpenModal(true)}>
        Dodaj Poddelatnost
      </Button>
      )}
      {openModal && (
        <DodajPoddelatnost
          onClose={() => setOpenModal(false)}
          onAdd={handleAddPoddelatnost}
          delatnostId={delatnostId} // Prosledi delatnostId
        />
      )}
      <Grid container spacing={1} justifyContent="center">
        {poddelatnosti.map((poddelatnost) => (
          <Grid item xs={12} sm={6} md={4} key={poddelatnost.id}>
            <Card sx={{ maxWidth: 345, ml: 9, mt: 2, mb: 2 }}>
              <CardMedia
                sx={{ height: 200 }}
                image={poddelatnost.slika || Image}
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
                  onClick={() => handleMajstori(poddelatnost._id)} 
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
