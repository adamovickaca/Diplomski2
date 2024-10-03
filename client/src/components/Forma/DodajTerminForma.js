import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Box, TextField, Typography } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ruLocale from 'date-fns/locale/ru';

const DodajTerminForma = (props) => {
    const [date, setDate] = useState(new Date());
    const [vreme, setVreme] = useState(
        [new Date(0, 0, 0, 8), new Date(0, 0, 0, 8), new Date(0, 0, 0, 8), new Date(0, 0, 0, 8), new Date(0, 0, 0, 8)]
    );

    const promeniVreme = (newValue, i) => {
        let noviNiz = [...vreme];
        noviNiz[i] = newValue;
        setVreme(noviNiz);
    };

    const unesiTermin = () => {
        console.log("Izabrani datum:", date);
        console.log("Izabrana vremena:", vreme);
        
        // Očisti formu ili dodaj logiku za dalje procesiranje
        props.onClose();
    };

    let niz = [0, 1, 2, 3, 4];

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1vh', 
                padding: '2rem', 
                bgcolor: '#f9f9f9', 
                borderRadius: 2, 
                boxShadow: 2 
            }}
        >
            <Typography 
                variant="h5" 
                component="div" 
                gutterBottom 
                sx={{ textAlign: 'center', color: '#51424e' }}
            >
                Dodaj Termin
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    sx={{ width: '100%', bgcolor: 'white', borderRadius: 1 }}
                    label="Izaberite datum"
                    value={date}
                    onChange={(newValue) => {
                        setDate(newValue);
                    }}
                    minDate={new Date()}
                    renderInput={(params) => <TextField size='small' {...params} />}
                    focused
                />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
                {
                    niz.map((i) => (
                        <TimePicker
                            key={i}
                            renderInput={(params) => <TextField size='small' {...params} />}
                            size='small'
                            value={vreme[i]}
                            minutesStep={15}
                            label="Početak termina"
                            onChange={(newValue) => {
                                promeniVreme(newValue, i);
                            }}
                            minTime={new Date(0, 0, 0, 8)}
                            maxTime={new Date(0, 0, 0, 18, 45)}
                            sx={{ mb: 2 }} // Margin bottom za razdvajanje
                        />
                    ))
                }
            </LocalizationProvider>

            <Button 
                sx={{ 
                    mt: '5%', 
                    bgcolor: '#51424e', 
                    color: 'white', 
                    '&:hover': {
                        bgcolor: '#3d353e',
                    },
                }} 
                fullWidth 
                size='small' 
                variant='contained' 
                onClick={unesiTermin}
            >
                Unesi
            </Button>
        </Box>
    );
};

export default DodajTerminForma;
