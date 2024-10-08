import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config.js';
import MajstorCard from '../components/Majstori/MajstorCard'; // Uverite se da ste importovali komponentu za prikaz majstora
import { Box, Typography, CircularProgress } from '@mui/material';
import ErrorMessage from '../components/LoadError/Error'; // Ako imate komponentu za greške

const MajstoriList = () => {
    const { poddelatnostId } = useParams(); // Preuzimanje ID-a poddelatnosti iz URL-a
    const [majstori, setMajstori] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMajstori = async () => {
            try {
                const response = await fetch(`${BASE_URL}/majstori/majstor/filter/poddelatnost?poddelatnost=${poddelatnostId}`);
                const data = await response.json();
                if (data.success) {
                    setMajstori(data.data || []);
                } else {
                    setError('Nema pronađenih majstora.');
                }
            } catch (error) {
                console.error("Greška prilikom učitavanja majstora:", error);
                setError('Greška prilikom učitavanja majstora.');
            } finally {
                setLoading(false);
            }
        };

        fetchMajstori();
    }, [poddelatnostId]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <CircularProgress /> {/* Prikazuje loading animaciju */}
            </Box>
        );
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <Box sx={{ mt: 15, minHeight:"100vh" }}>
            <Typography variant='h4' align="center" gutterBottom>
                Majstori za odabranu poddelatnost
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 2,
                }}
            >
                {majstori.length > 0 ? (
                    majstori.map((majstor) => (
                        <MajstorCard key={majstor._id} majstor={majstor} /> // Prikazivanje svakog majstora
                    ))
                ) : (
                    <Typography>Nema pronađenih majstora.</Typography>
                )}
            </Box>
        </Box>
    );
};

export default MajstoriList;
