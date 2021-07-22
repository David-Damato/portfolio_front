import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    background: "#233",
    height: "100vh",
  },
  cardContainer: {
    maxWidth: 345,
    margin: "3rem auto",
  },
  button: {
    marginTop: "1rem",
    marginLeft: "1rem",
    marginRight: "1rem",
    color: "tomato",
    borderColor: "white",
  },
}));

const Portfolio = () => {
  const [project, setProject] = useState([]);
  const [loadingProject, setLoadingProject] = useState(true);

  const fetchProject = async () => {
    try {
      const getProject = await axios.get(`http://localhost:8080/api/project`);
      setProject(getProject.data);
      console.log(getProject.data[0].image);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProject(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  let logged = localStorage.getItem("token");

  const classes = useStyles();
  return (
    !loadingProject && (
      <>
        <Box component="div" className={classes.mainContainer}>
          <Grid container justify="center">
            {/* Projects */}
            {project.map((oneProject, i) => (
              <Grid item xs={12} sm={8} md={4} key={i}>
                <Card className={classes.cardContainer}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={oneProject.id}
                      height="140"
                      image={oneProject.image}
                    />
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        {oneProject.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {oneProject.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Share
                    </Button>
                    <Button size="small" color="primary">
                      Live Demo
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          {logged && (
            <Link style={{ textDecoration: "none" }} to="/newproject">
              <Button
                variant="outlined"
                fullWidth={true}
                className={classes.button}
              >
                New Project
              </Button>
            </Link>
          )}
        </Box>
      </>
    )
  );
};
export default Portfolio;
