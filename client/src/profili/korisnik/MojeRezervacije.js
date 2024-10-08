import React from 'react';
import useFetchData from '../../hooks/useFetchData.js';
import { BASE_URL } from '../../config';
import { Box, Typography } from '@mui/material';
import Loading from '../../components/LoadError/Loading.js';
import ErrorMessage from '../../components/LoadError/Error.js';

const MojeRezervacije = () => {
    const { data: rezervacije, loading, error } = useFetchData(`${BASE_URL}/korisnik/rezervacije`);

    return (
        <Box>
            {/* Loading state */}
            {loading && <Loading />}
            
            {/* Error state */}
            {error && <ErrorMessage message={error} />}
            
            {/* Data state */}
            {!loading && !error && (
                <>
                    {Array.isArray(rezervacije) && rezervacije.length > 0 ? (
                        rezervacije.map(rezervacija => {
                            const { status, datumRezervacije, cena, majstor } = rezervacija;
                            return (
                                <Box key={rezervacija._id} sx={{ border: '1px solid #ccc', padding: 2, marginBottom: 2 }}>
                                    <Typography variant="h6">{`${cena.majstor.ime} ${cena.majstor.prezime}`}</Typography>
                                    <Typography variant="body1">{`Usluga: ${cena.usluga}`}</Typography>
                                    <Typography variant="body1">{`Datum: ${new Date(datumRezervacije).toLocaleString()}`}</Typography>
                                    <Typography variant="body1">{`Cena: ${cena.cena} RSD`}</Typography>
                                    <Typography variant="body1">{`Status: ${status}`}</Typography>
                                </Box>
                            );
                        })
                    ) : (
                        <Typography>Nemate zakazanih termina!</Typography>
                    )}
                </>
            )}
        </Box>
    );
}

export default MojeRezervacije;
