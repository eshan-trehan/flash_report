import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Box,
} from "@material-ui/core";
import { Alert} from '@material-ui/lab'

import { withRouter, useHistory } from "react-router-dom";

// context
import { useUser } from "../../context/UserContext";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";

function Login(props) {
  // classes related to components
  var classes = useStyles();
  
  // variables used in the form
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  // context
  const { login } = useUser();

  const history = useHistory();

  async function handleLoginButton(e) {
    e.preventDefault()
    try {
      setError("")
      setIsLoading(true)
      await login(emailValue, passwordValue)
      history.push("/app/dashboard")
    } catch (error) {
      console.log(error)
      setError("Failed to LogIn User")
    }
    setIsLoading(false)
  }

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Material Admin</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <React.Fragment>
            <Typography variant="h1" className={classes.greeting}>
              Sign In
            </Typography>
            <Box height='15px'/>
            {error ? <Alert severity="error">{error}</Alert> : <Box height='10px'/>}
            <TextField
              id="email"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={emailValue}
              onChange={e => setEmailValue(e.target.value)}
              margin="normal"
              placeholder="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              id="password"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={passwordValue}
              onChange={e => setPasswordValue(e.target.value)}
              margin="normal"
              placeholder="Password"
              type="password"
              fullWidth
            />
            <div className={classes.formButtons}>
              {isLoading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                <Button
                  disabled={emailValue.length === 0 || passwordValue.length === 0}
                  onClick={e => handleLoginButton(e)}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Login
                </Button>
              )}
              <Button
                color="primary"
                size="large"
                className={classes.forgetButton}
              >
                Forgot Password
              </Button>
            </div>
          </React.Fragment>
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
