import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";

import Send from "@material-ui/icons/Send";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  contactContainer: {
    background: "#233",
    height: "100vh",
  },
  heading: {
    color: "tomato",
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: "1rem",
  },
  form: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
  },
  input: {
    color: "#fff",
  },
  button: {
    marginTop: "1rem",
    color: "tomato",
    borderColor: "tan",
  },
  field: {
    margin: "1rem 0rem",
  },
}));

const InputField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "tomato",
    },
    "& label": {
      color: "tan",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "tan",
      },
      "&:hover fieldset": {
        borderColor: "tan",
      },
      "&.Mui-focused fieldset": {
        color: "#fff",
        borderColor: "tan",
      },
    },
  },
})(TextField);

const Login = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputMotDePasse, setInputMotDePasse] = useState("");

  const history = useHistory();

  const handleLogging = (event) => {
    event.preventDefault();

    const DATA = {
      password: inputMotDePasse,
      email: inputEmail,
    };

    axios
      .post("http://localhost:8080/api/login", DATA)
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("id", res.data.payload.id);
        history.push("/");
      })
      .then((data) => {
        if (inputEmail !== data.payload.email) {
          console.log("échec de la connexion");
          toast.error(`L'utilisateur n'existe pas`);
        } else {
          console.log("connexion réussie");
        }
      })
      .catch((err) => console.log(err));
  };

  const classes = useStyles();
  return (
    <Box component="div" className={classes.contactContainer}>
      <Grid container justify="center">
        <Box component="form" className={classes.form}>
          <Typography variant="h5" className={classes.heading}>
            Login
          </Typography>
          <InputField
            fullWidth={true}
            label="Email"
            variant="outlined"
            inputProps={{ className: classes.input }}
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
          />
          <InputField
            fullWidth={true}
            label="Mot de passe"
            variant="outlined"
            inputProps={{ className: classes.input }}
            className={classes.field}
            type="password"
            value={inputMotDePasse}
            onChange={(e) => setInputMotDePasse(e.target.value)}
          />

          <Button
            variant="outlined"
            fullWidth={true}
            endIcon={<Send />}
            className={classes.button}
            onClick={handleLogging}
          >
            Connection
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default Login;
