import React from "react";
import img1 from '../Images/alexandra.jpeg';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



function About() {
    return (

        <div className="about">
          Tracker is an interactive app that tracks bugs and can assign them to users for comments and resolution. 
          <br /><br />Creators:<br /><br />
          
          <Card sx={{ maxWidth: 345 }}>
       <img src={img1} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Alexandra Cruz
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Alexandra Cruz is a research-focused Full-Stack Software Developer with a 
          background in Computer Software Engineering. Her passion for software engineering led her to become an analytical 
          web developer and an attentive learner. Alexandra loves working alone as well as being part of a team.
          Patience and a natural curiosity is what she brings to a progressive environment.

        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Portfolio</Button>
        <Button size="small">Github</Button>
      </CardActions>
    </Card>
          
          </div>
    
    );
}


export default About;