import React from "react";
import img1 from '../Images/alexandra.jpeg';
import img2 from '../Images/Shanti-Headshot.jpeg';
import img3 from '../Images/Alex-Becker.jpeg';
import img4 from '../Images/Irais.jpg';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


function About() {

  const cardStyle = {
    height: "100vw"
  };

    return (

        <div className="about">
          <br /><br /> <br />Tracker is an interactive app that tracks bugs and can assign them to users for comments and resolution. 
          <br /><br />Creators:<br /><br /><br />
          
          <Grid container>
            <Grid item xs={12} sm={6} md={3}>
          <Card style={cardStyle} sx={{ minWidth: 345 }}>
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
        <Button size="small" href="https://shantibetts.github.io/Portfolio/">Portfolio</Button>
        <Button size="small" href="https://github.com/shantibetts">Github</Button>
      </CardActions>
    </Card>
    </Grid>
  
   

   
    <Grid item xs={12} sm={6} md={3}>
        
    <Card style={cardStyle} sx={{ minWidth: 345 }}>
       <img src={img3} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Alex Becker
        </Typography>
        <Typography variant="body2" color="text.secondary">
        I am a software engineer with a background in healthcare revenue cycle. 
        Utilizing empathetic interpersonal skills with composed analytical skills to identify and resolve challenges in a fast paced stressful environment. 
        Passionate about improving the user experience through collaborative innovation that will increase overall consumer engagement. 
        Driven by creativity to cultivate unique solutions to front end development that would regenerate the tech space through design and functionality. 

        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href="https://abeck3423.github.io/portfolio/">Portfolio</Button>
        <Button size="small" href="https://github.com/abeck3423">Github</Button>
      </CardActions>
    </Card>
    </Grid>


    <Grid item xs={12} sm={6} md={3}>
          
    <Card style={cardStyle} sx={{ minWidth: 345 }}>
       <img src={img4} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Irais Avila
        </Typography>
        <Typography variant="body2" color="text.secondary">
        A creative and detail-oriented Software Engineer with a background 
        in banking and finance. Invested in solving problems by building solutions 
        to help teams, businesses, and people. 

        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href="https://iraisavila.github.io/Project1/">Portfolio</Button>
        <Button size="small" href="https://github.com/IraisAvila">Github</Button>
      </CardActions>
    </Card>
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
          
          <Card style={cardStyle} sx={{ minWidth: 345 }}>
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
              <Button size="small" href="https://alexandracrvz.github.io/Portfolio/">Portfolio</Button>
              <Button size="small" href="https://github.com/alexandracrvz">Github</Button>
            </CardActions>
          </Card>
          </Grid>
    </Grid>
          
          </div>
    

    );
}


export default About;