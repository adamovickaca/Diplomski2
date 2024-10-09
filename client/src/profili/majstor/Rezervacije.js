import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../../context/authContext';
import { BASE_URL } from '../../config';
import { Box } from '@mui/material';

const Rezervacije = ({ majstorId }) => {
  const [rezervacije, setRezervacije] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(authContext);

  useEffect(() => {
    const fetchZahtevi = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/majstori/majstori/${user._id}/rezervacije/prihvacene`
        );
        const data = await response.json();

        if (response.ok) {
          setRezervacije(data.rezervacije);
        } else {
          console.error("Greška prilikom učitavanja rezervacija:", data.message);
        }
      } catch (error) {
        console.error("Greška prilikom učitavanja rezervacija:", error);
      } finally {
        setLoading(false); // Postavi loading na false bez obzira na rezultat
      }
    };

    fetchZahtevi();
  }, [user._id]); // Dodaj majstorId kao zavisnost

  if (loading) {
    return <div>Učitavanje...</div>;
  }

  if (rezervacije.length === 0) {
    return <div>Nema prihvaćenih rezervacija.</div>;
  }

  return (
    <Box sx={{minHeight:"100vh"}}>
      <h2>Moje prihvaćene rezervacije</h2>
      <ul>
        {rezervacije.map((rezervacija, index) => (
          <li key={index}>
            {rezervacija.ime} {rezervacija.prezime} - {new Date(rezervacija.datum).toLocaleString()} 
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default Rezervacije;
