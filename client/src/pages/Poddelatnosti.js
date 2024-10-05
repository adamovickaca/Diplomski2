import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config.js';
import Loading from '../components/LoadError/Loading';
import ErrorMessage from '../components/LoadError/Error';
import { Box, Typography, List, ListItem, ListItemText, Container, CircularProgress } from '@mui/material';

const Poddelatnosti = () => {
  const { delatnostId } = useParams();
  const [poddelatnosti, setPoddelatnosti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <List>
        {poddelatnosti.map((poddelatnost) => (
          <ListItem 
            key={poddelatnost._id} 
            sx={{ border: '1px solid #ccc', borderRadius: '4px', mb: 2, padding: 2 }}
          >
            <ListItemText primary={poddelatnost.naziv} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Poddelatnosti;
