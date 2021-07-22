import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { toast } from "react-toastify";

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

const NewProject = () => {
  const [inputName, setInputName] = useState("");
  const [inputImage, setInputImage] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputLink, setInputLink] = useState("");

  const handleCreation = async (event) => {
    event.preventDefault();

    const DATA = {
      name: inputName,
      description: inputDescription,
      image: inputImage,
      link: inputLink,
    };

    if (!inputName || !inputDescription || !inputImage || !inputLink) {
      toast.error(`Merci de remplir tous les champs`);
    } else {
      await axios
        .post("http://localhost:8080/api/project/newproject", DATA)
        .then((data) => {
          toast.success("Ajout réussi");
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err);
        });
    }
  };

  const classes = useStyles();
  return (
    <Box component="div" className={classes.contactContainer}>
      <Grid container justify="center">
        <Box component="form" className={classes.form}>
          <Typography variant="h5" className={classes.heading}>
            New Project
          </Typography>
          <InputField
            fullWidth={true}
            label="Name"
            variant="outlined"
            inputProps={{ className: classes.input }}
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
          <InputField
            fullWidth={true}
            label="Image"
            variant="outlined"
            inputProps={{ className: classes.input }}
            className={classes.field}
            value={inputImage}
            onChange={(e) => setInputImage(e.target.value)}
          />
          <InputField
            fullWidth={true}
            label="Link"
            variant="outlined"
            inputProps={{ className: classes.input }}
            className={classes.field}
            value={inputLink}
            onChange={(e) => setInputLink(e.target.value)}
          />
          <InputField
            fullWidth={true}
            label="Description"
            variant="outlined"
            multiline
            rows={5}
            inputProps={{ className: classes.input }}
            onChange={(e) => setInputDescription(e.target.value)}
          />
          <Button
            variant="outlined"
            fullWidth={true}
            className={classes.button}
            onClick={handleCreation}
          >
            Ajout du projet
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default NewProject;
