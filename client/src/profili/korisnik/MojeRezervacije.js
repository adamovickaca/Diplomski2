import React from 'react';
import useFetchData from '../../hooks/useFetchData.js';
import { BASE_URL } from '../../config';
import MajstorCard from '../../../src/components/Majstori/MajstorCard.js';
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
                        rezervacije.map(majstor => (
                            <MajstorCard majstor={majstor} key={majstor._id} />
                        ))
                    ) : (
                        <Typography>Nemate zakazanih termina!</Typography>
                    )}
                </>
            )}
        </Box>
    );
}

export default MojeRezervacije;
