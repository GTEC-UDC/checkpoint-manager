import React, { useState} from "react";
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import client from '../feather';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginPage({userEmail, setUserEmail,  isLogged, setIsLogged}) {
  const classes = useStyles();
  let history = useHistory ();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  const clickLogin = (event) => {
    setHasError(false);
    event.preventDefault();
    console.log("Clicked login");
    client.authenticate({
      strategy: 'local',
      email, password
    }).then((login)=>{
      setUserEmail(login.name);
      setIsLogged(true);
      history.push("/route");
      console.log("Push route");
    }).catch(error => {
      console.log(error);
      setHasError(true);});
  };

  const handleChange = (event) => {
    switch (event.target.name) {
        case "email":
            setEmail(event.target.value);
            break;
        case "password":
          setPassword(event.target.value);
              break;
        default:
            break;
    } 
  };

  let errorMessage;

  if (hasError){
    errorMessage = <Typography>Wrong email or password</Typography>;
  } else {
    errorMessage = <Typography></Typography>;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={clickLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          {errorMessage}
        </form>
      </div>
    </Container>
  );
}