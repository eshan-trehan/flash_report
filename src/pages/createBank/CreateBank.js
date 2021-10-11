import React, { useState } from "react";
import {
    CircularProgress,
    Typography,
    Button,
    TextField,
    Box,
    Paper,
} from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import MaterialUiPhoneNumber from "material-ui-phone-number";

// context
import { useBank } from "../../context/BankContext";

// styles
import useStyles from "./styles";

function CreateBank() {
    const { addBank } = useBank()

    const classes = useStyles()
    // variables used in the form

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [bankName, setBankName] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [address, setAddress] = useState("");
    const [contactNumber, setContactNumber] = useState("");

    function clearForm(){
        setBankName("")
        setCountry("")
        setState("")
        setCity("")
        setPincode("")
        setAddress("")
        setContactNumber("")
    }

    function handleSubmit(e){
        e.preventDefault()
        try {
            setError("")
            setSuccess("")
            setIsLoading(true)
            addBank({
                name: bankName,
                country: country,
                state: state, 
                city: city,
                pincode: pincode,
                address: address,
                contactNumber
            })
            clearForm()
            setSuccess("Bank Added to Database Successfully!")
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
              Add New Bank
            </Typography>
            <Box height='15px'/>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            {(error.length !== 0 && success.length !== 0) && <Box height="5px"/>}
            <TextField
              id="bankName"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={bankName}
              onChange={e => {setBankName(e.target.value)}}
              margin="dense"
              label="Bank Name"
              type="bankName"
              fullWidth
            />
            <div className={classes.textFieldDouble}>
                <TextField
                id="country"
                InputProps={{
                    classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                    },
                }}
                value={country}
                onChange={e => {setCountry(e.target.value)}}
                margin="dense"
                label="Country"
                type="country"
                fullWidth
                />
                <Box width="40px"/>
                <TextField
                id="state"
                InputProps={{
                    classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                    },
                }}
                value={state}
                onChange={e=>{setState(e.target.value)}}
                margin="dense"
                label="State"
                type="state"
                fullWidth
                />
            </div>
            <div className={classes.textFieldDouble}>
                <TextField
                id="city"
                InputProps={{
                    classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                    },
                }}
                value={city}
                onChange={e=>setCity(e.target.value)}
                margin="dense"
                label="City"
                type="city"
                fullWidth
                />
                <Box width="40px"/>
                <TextField
                id="pincode"
                InputProps={{
                    classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                    },
                }}
                value={pincode}
                onChange={e=>setPincode(e.target.value)}
                margin="dense"
                label="Pincode"
                type="pincode"
                fullWidth
                />
            </div>
            <TextField
              id="address"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={address}
              onChange={e=>setAddress(e.target.value)}
              margin="dense"
              label="Address"
              type="address"
              fullWidth
            />
            <MaterialUiPhoneNumber
                id="contactNumber"
                defaultCountry='in'
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={contactNumber}
                onChange={value => setContactNumber(value)}
                margin="dense"
                label="Contact Number"
                type="contactNumber"
                fullWidth
            />
            <div className={classes.formButtons}>
              {isLoading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={e => handleSubmit(e)}
                >
                  Add Bank
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

export default CreateBank
