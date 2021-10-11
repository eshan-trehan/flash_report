import React, { useState, useRef, useMemo, useEffect } from "react";
import {
    CircularProgress,
    Typography,
    Button,
    TextField,
    Box,
    Paper,
    MenuItem,
    IconButton,
} from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import MaterialUiPhoneNumber from "material-ui-phone-number";
import { useDropzone } from "react-dropzone";
import { FaUndo, FaTimes } from "react-icons/fa"

// context
import { useBank } from "../../context/BankContext";
import { useAdmin } from "../../context/AdminContext";

// styles
import useStyles from "./styles";

import { v4 as uuidv4 } from 'uuid';

function BankSchemaSelector(props){
  var classes = useStyles();
  const { schemaBankList } = useBank()
  const { state, setState, fieldName, fieldId } = props;
  return (
      <TextField
      id={fieldId}
      InputProps={{
          classes: {
          underline: classes.textFieldUnderline,
          input: classes.textField,
          },
      }}
      onChange={(e) => {
          setState(e.target.value)
      }}
      margin="dense"
      value={state}
      label={fieldName}
      type={fieldId}
      select
      fullWidth
      >
          {schemaBankList.map((bank) => (
              <MenuItem 
                  key={bank} 
                  value={bank}
              >
              {bank}
              </MenuItem>
          ))}
      </TextField>
  )
}


function BankSelector(props){
    var classes = useStyles();
    const { bankList } = useBank()
    const { state, setState, fieldName, fieldId } = props;
    return (
        <TextField
        id={fieldId}
        InputProps={{
            classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
            },
        }}
        onChange={(e) => {
            setState(e.target.value)
        }}
        margin="dense"
        value={state}
        label={fieldName}
        type={fieldId}
        select
        fullWidth
        >
            {bankList.map((bank) => (
                <MenuItem 
                    key={bank.id} 
                    value={bank.id}
                > 
                {bank.name}
                </MenuItem>
            ))}
        </TextField>
    )
}

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 90,
  height: 130,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

function Dropzone(props) {
  const { files, setFiles, handleDeleteImage } = props;
  const classes = useStyles()

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      acceptedFiles.forEach(file => files.push(Object.assign(file, {
        preview: URL.createObjectURL(file),
        id: uuidv4()
      })))
      setFiles(files)
    }
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const thumbs = files.map(file => (
    <div style={thumb} key={file.id}>
      <div style={thumbInner}>
        <IconButton 
          size="small" 
          className={classes.imageButton}
          onClick={() => handleDeleteImage(file.id)}
        >
          <FaTimes fontSize="small"/>
        </IconButton>
        <img
          src={file.preview}
          style={img}
          alt={file.name}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </div>
  );
}

function CreateTask() {
    const classes = useStyles()

    const { createTask } = useAdmin();

    const [files, setFiles] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [bank, setBank] = useState("");
    const [schemaBank, setSchemaBank] = useState("");
    const [borrowerNumber, setBorrowerNumber] = useState("")
    const remarkRef = useRef(null)

    function generateTask(){
      if (bank.length === 0) throw new Error('Please select a Bank Branch');
      if (schemaBank.length === 0) throw new Error('Please select a Schema');
      return ({
        bank,
        schema: schemaBank,
        borrowerNumber,
        remark: remarkRef.current.value,
        images: files, 
        id: uuidv4(),
      })
    }
    
    function handleClearImages() {
      setFiles([])
    }

    function clearForm(){
      setBank("")
      setSchemaBank("")
      setBorrowerNumber("")
      handleClearImages()
      remarkRef.current.value = ""
    }

    async function handleSubmit(e) {
      e.preventDefault()
      try{
        setError("")
        setSuccess("")
        setIsLoading(true)
        var task = generateTask()
        await createTask(task)
        clearForm()
        setSuccess("Task Created Successfully")
      }
      catch(error){
        setError("Could not create Task")
      }
      setIsLoading(false)
    }

    function handleDeleteImage(id){
      setFiles(files.filter(file => file.id !== id))
    }

    return (
        <>
        <div className={classes.formContainer}>
        <Paper>
        <Box padding="20px">
        <div className={classes.form}>
          <React.Fragment>
            <Typography 
              variant="h1" 
              className={classes.greeting}
            >
              Create Task
            </Typography>
            <Box height='15px'/>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            {(error.length !== 0 && success.length !== 0) && <Box height="5px"/>}
            <Typography variant="h3" className={classes.subHeading}>
              General Details
            </Typography>
            <BankSelector
              state={bank}
              setState={setBank}
              fieldName="Bank"
              fieldId="bank"
            />
            <BankSchemaSelector
              state={schemaBank}
              setState={setSchemaBank}
              fieldName="Schema"
              fieldId="schema"
            />
            <MaterialUiPhoneNumber
              id="borrowerNumber"
              defaultCountry='in'
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={borrowerNumber}
              onChange={(value) => setBorrowerNumber(value)}
              margin="dense"
              label="Borrower's Number"
              type="borrowerNumber"
              fullWidth
            />
            <TextField
              id="remark"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              inputRef={remarkRef}
              minRows={1}
              maxRows={6}
              multiline
              margin="dense"
              label="Remark"
              type="remark"
              fullWidth
            />
            <Box height="20px"/>
            <Box 
              display="flex" 
              justifyContent="space-between" 
              alignItems="flex-end"
              fullWidth
            >
              <Typography variant="h4" className={classes.subHeading}>
                Add Images
              </Typography>
              <IconButton 
                size="medium"
                onClick={handleClearImages}
              >
                <FaUndo fontSize="medium"/>
              </IconButton>
            </Box>
            <Box height="5px"/>
            <Dropzone
              files={files}
              setFiles={setFiles}
              handleDeleteImage={handleDeleteImage}
            />
            <div className={classes.formButtons}>
              {isLoading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={(e) => handleSubmit(e)}
                >
                  Add Task
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

export default CreateTask
