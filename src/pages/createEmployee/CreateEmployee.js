import React, { useState } from "react";
import {
    CircularProgress,
    Typography,
    Button,
    TextField,
    Box,
    Paper,
    FormControl, 
    InputLabel,
    Select, 
    MenuItem,
} from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import MaterialUiPhoneNumber from "material-ui-phone-number";

// context
import { useAdmin } from "../../context/AdminContext";

// styles
import useStyles from "./styles";

  

function CreateEmployee() {
    // classes related to components
    var classes = useStyles();

    // variables used in the form
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [designation, setDesignation] = useState("");

    // context
    const { createUser } = useAdmin();

    function clearForm(){
        setEmailValue("")
        setPasswordValue("")
        setFirstName("")
        setLastName("")
        setPhoneNumber("")
        setDesignation("")
    }

    async function handleCreateEmployee(e) {
        e.preventDefault()
        try {
            setError("")
            setSuccess("")
            setIsLoading(true)
            await createUser({
              email: emailValue,
              password: passwordValue,
              firstName,
              lastName,
              phoneNumber,
              designation,
            })
            clearForm()
            setSuccess("Employee Created Successfully!")
        } catch (error) {
          console.log(error)
          setError(error.message)
        }
        setIsLoading(false)
    }

    return (
        <>
        <div className={classes.formContainer}>
        <Paper>
        <Box padding="20px">
        <div className={classes.form}>
          <React.Fragment>
            <Typography variant="h1" className={classes.greeting}>
              Create New Employee
            </Typography>
            <Box height='15px'/>
            {error ? <Alert severity="error">{error}</Alert> : <Box height='5px'/>}
            {success ? <Alert severity="success">{success}</Alert> : <Box height='5px'/>}
            {/* <div className={classes.profileImageUpload}>
                <Avatar 
                    alt="Remy Sharp" 
                    src="" 
                    style={{ width: "120px", height: "120px" }}
                    variant="square"
                />
                <Box width="10px"/>
                <div className={classes.uploadContainer}>
                <Box style={{ width: '100%', marginBottom: '6px', paddingLeft: '3px', paddingRight: '3px'}}>
                    <LinearProgress variant="determinate" value={progress} />
                </Box>
                <label htmlFor="contained-button-file">
                    <Input 
                        accept="image/*" 
                        id="contained-button-file" 
                        type="file" 
                        onChange={e => { console.log(e.target.files[0])} }
                    />
                    <Button
                        startIcon={<FaImage/>}
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.uploadButton}
                        component="span"
                    >
                    Upload
                    </Button>
                </label>
                </div>
            </div> */}
            <div className={classes.textFieldDouble}>
                <TextField
                id="firstName"
                InputProps={{
                    classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                    },
                }}
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                margin="dense"
                label="First Name"
                type="name"
                fullWidth
                />
                <Box width="40px"/>
                <TextField
                id="lastName"
                InputProps={{
                    classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                    },
                }}
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                margin="dense"
                label="Last Name"
                type="name"
                fullWidth
                />
            </div>
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
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              id="designation"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={designation}
              onChange={e => setDesignation(e.target.value)}
              margin="dense"
              label="Designation"
              type="designation"
              select
              fullWidth
            >
              <MenuItem value={"Valuer"}>Valuer</MenuItem>
              <MenuItem value={"Field Valuer"}>Field Valuer</MenuItem>
              <MenuItem value={"Administrator"}>Administrator</MenuItem>
            </TextField>
            <MaterialUiPhoneNumber
                id="phoneNumber"
                defaultCountry='in'
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={phoneNumber}
                onChange={value => setPhoneNumber(value)}
                margin="dense"
                label="Phone Number"
                type="phoneNumber"
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
              margin="dense"
              label="Password"
              type="password"
              fullWidth
            />
            <div className={classes.formButtons}>
              {isLoading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                <Button
                  disabled={
                    emailValue.length === 0 || 
                    passwordValue.length === 0 || 
                    firstName.length === 0 || 
                    lastName.length === 0 ||
                    phoneNumber.length === 0
                  }
                  onClick = {e => handleCreateEmployee(e)}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Create Employee
                </Button>
              )}
            </div>
          </React.Fragment>
        </div>
        </Box>
        </Paper>
        </div>
        </>
    )
}

export default CreateEmployee
