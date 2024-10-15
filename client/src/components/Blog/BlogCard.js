import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; // Import Button
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const BlogCard = ({ blog }) => {
  const { naslov, tekst, slika, tag, kratakOpis } = blog;
  const navigate = useNavigate(); // Initialize navigate

  const handleLearnMore = () => {
    navigate(`/blog/${blog._id}`, { state: { blog } }); // Pass blog object as state
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={naslov} subheader={tag} />
      <CardMedia component="img" height="194" image={slika} alt={naslov} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {kratakOpis}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button onClick={handleLearnMore} color="primary">
          Saznaj više
        </Button>
       
      </CardActions>
    </Card>
  );
};

export default BlogCard;
