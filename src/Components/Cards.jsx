import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

export default function ActionAreaCard({ id ,name, image, rating, activities }) {
  return (
    <div>
    <Link to={`/turf/${id}`}>
    <Card 
      sx={{ 
        width: 345, 
        display: "flex", 
        flexDirection: "column", 
        bgcolor: "#111827", 
        color: "white",
        transition: "border 0.3s ease-in-out",
        border: "4px solid transparent",
        "&:hover": { borderColor: "#FCD34D" } 
      }}
    >
      <CardActionArea sx={{ flexGrow: 1 , height: 370}}>
        <CardMedia component="img" sx={{ height: 200}} image={image} />
        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>

          {/* Activity Bubbles */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
            {activities.map((activity, index) => (
              <Typography
                key={index}
                sx={{ 
                  bgcolor: "#FCD34D",  // Amber-300 background
                  color: "#111827",    // Dark text for contrast
                  px: 2,               // Padding for bubble shape
                  py: 1,
                  borderRadius: "16px", // Rounded bubble effect
                  fontSize: "0.700rem",
                  fontWeight: "bold",
                  display: "inline-block"
                }}
              >
                {activity}
              </Typography>
            ))}
          </Box>

          <Typography variant="body2" sx={{ color: "gray.400", marginTop: "8px" }}>
             Rating: {rating} / 5 ⭐
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
    </div>
  );
}
