import React from "react";
import img1 from '../Images/alexandra.jpeg';
import img2 from '../Images/Shanti-Headshot.jpeg';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';



function About() {
    return (

        <div className="about">
          Tracker is an interactive app that tracks bugs and can assign them to users for comments and resolution. 
          <br /><br />Creators:<br /><br />
          
          <Grid container>
            <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ minWidth: 345 }}>
       <img src={img2} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Shanti Betts
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Full Stack Developer with a background in Mechanical Engineering and security design. 
        Passionate about leading teams in a collaborative environment to collectively cultivate new products and tools, 
        while developing strategies that increase efficiency and improve efficacy within an organization. 
        Strengths in workflow design and standardization enables me to approach each project with an eye for scalability and automation.

        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href="https://alexandracrvz.github.io/Portfolio/">Portfolio</Button>
        <Button size="small" href="https://github.com/alexandracrvz">Github</Button>
      </CardActions>
    </Card>
    </Grid>
  
   

   
    <Grid item xs={12} sm={6} md={3}>
        
    <Card sx={{ minWidth: 345 }}>
       <img src="" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Alex Becker
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Words

        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Portfolio</Button>
        <Button size="small">Github</Button>
      </CardActions>
    </Card>
    </Grid>
   

    
    <Grid item xs={12} sm={6} md={3}>
          
    <Card sx={{ minWidth: 345 }}>
       <img src="" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Irais Avila
        </Typography>
        <Typography variant="body2" color="text.secondary">
      Words

        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Portfolio</Button>
        <Button size="small">Github</Button>
      </CardActions>
    </Card>
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
          
          <Card sx={{ minWidth: 345 }}>
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
          </Grid>
    </Grid>
  
          
          </div>
    
    );
}


export default About;