import React from 'react';
import Image from '../assets/images/fasader.jpg'; // Uvoz slike
import { Box, Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import pozadina from "../assets/images/pozadina.jpeg";


const Delatnosti = () => {
  const delatnosti = [
    {
      id: 1,
      naziv: "Građevinski radovi",
      opis: "Uključuje sve vrste građevinskih radova, uključujući izgradnju i renoviranje objekata.",
      slika: Image
    },
    {
      id: 2,
      naziv: "Elektrika",
      opis: "Pokriva sve električne radove, uključujući instalacije, popravke i održavanje.",
      slika: Image
    },
    {
      id: 3,
      naziv: "Održavanje",
      opis: "Obuhvata redovno održavanje i popravke u domu ili poslovnom prostoru.",
      slika: Image
    },
    {
      id: 4,
      naziv: "Obrada materijala",
      opis: "Uključuje sve aktivnosti vezane za obradu materijala kao što su drvo, metal, plastika, itd.",
      slika: Image
    },
    {
      id: 5,
      naziv: "Garderoba i nakit",
      opis: "Pokriva popravku i prilagođavanje garderobe, kao i usluge vezane za nakit.",
      slika: Image
    },
    {
      id: 6,
      naziv: "Održavanje vozila",
      opis: "Obuhvata sve vrste usluga održavanja i popravke vozila.",
      slika: Image
    },
    {
      id: 7,
      naziv: "Nekategorizovano",
      opis: "Delatnosti koje ne spadaju u prethodno navedene kategorije.",
      slika: Image
    }
  ];

  return (
    <Box
    sx={{
      display: 'flex', // Flex za centriranje sadržaja
      flexDirection: 'column', // Raspoređivanje sadržaja u kolonu
      alignItems: 'center', // Centriranje horizontalno
      justifyContent: 'flex-start', // Poravnanje na vrh
    }}
    
    >
      <Box sx={{ mt: 15 }}>
        <Typography variant='h3'>Sve naše usluge na jednom mestu</Typography>
      </Box>
      <Grid container spacing={1} justifyContent="center">
        {delatnosti.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ maxWidth: 345, ml:9, mt:2, mb:2 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={item.slika}
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
                <Button size="small" sx={{color:"#CF7500"}}>Poddelatnosti</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Delatnosti;
