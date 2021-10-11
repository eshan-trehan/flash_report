import React, { useEffect, useState, useRef } from 'react'
import {
    Box,
    Tabs,
    Tab,
    Typography,
    Paper,
    Button,
    ButtonGroup,
    TextField,
    MenuItem,
    IconButton,
    TableContainer, TableRow, TableHead, TableBody, TableCell, Table,
    FormControlLabel, Checkbox, 
    RadioGroup, Radio,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import Image from 'material-ui-image'
import { DatePicker } from '@material-ui/pickers';
import MaterialUiPhoneNumber from "material-ui-phone-number";

import { storage } from "../../firebase"
import { v4 as uuidv4 } from 'uuid';

// context
import { useBank } from "../../context/BankContext";
import { useAdmin } from "../../context/AdminContext";

// styles
import useStyles from "./styles";

function TabPanel(props) {
    const { children, value, index } = props;
  
    return (
        <>
        {value === index && (
            <Paper>
            <Box width="100%" padding="20px">
            {children}
            </Box>
            </Paper>
        )}
        </>
    );
}

function EmployeeSelector(props) {
    var classes = useStyles();
    const { employeeList } = useAdmin();
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
            {employeeList.map((employee) => (
                <MenuItem 
                    key={employee.id} 
                    value={employee.id}
                > 
                {employee.firstName + " " + employee.lastName + " (" + employee.designation + ")"}
                </MenuItem>
            ))}
        </TextField>
    )
}

function BankSelector(props){
    var classes = useStyles();
    const { bankList } = useBank()
    const { state, setState, fieldName, fieldId, disabled } = props;
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
        disabled={disabled}
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

function BankSchemaSelector(props){
    var classes = useStyles();
    const { schemaBankList } = useBank()
    const { state, setState, fieldName, fieldId, disabled } = props;
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
        disabled={disabled}
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

function TaskSelector(props){
    var classes = useStyles()
    const { taskList } = useAdmin()
    const { state, setState, fieldName, fieldId, setTaskSelected, setImageIndex } = props;
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
            setImageIndex(0)
            setTaskSelected(true)
            setState(e.target.value)
        }}
        margin="dense"
        value={state}
        label={fieldName}
        type={fieldId}
        select
        fullWidth
        >
            {taskList.map((task) => (
                <MenuItem 
                    key={task.id} 
                    value={task}
                >
                {task.id}
                </MenuItem>
            ))}
        </TextField>
    )
}

function OwnerTable(props){
    const { ownerList, handleRemoveOwner } = props;
    return (
    <>
    {ownerList.length !== 0 && <TableContainer component={Box}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Address</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {ownerList.map((row, index) => (
                <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                     <TableCell >
                        <IconButton size="small" onClick={() => handleRemoveOwner(row.id)}><FaTimes fontSize="medium"/></IconButton>
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.phoneNumber}</TableCell>
                    <TableCell>{row.address}</TableCell>
                   
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>}
    </>
    );
}

function TableTextFieldNSEW(props){
    const { stateActual, setStateActual, stateDeed, setStateDeed, fieldName } = props;
    return (
    <Paper>
    <Box padding="10px">
    <TableContainer component={Box}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>{fieldName}</TableCell>
                <TableCell>As per Deeds</TableCell>
                <TableCell>Actuals</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            <TableRow>
                <TableCell>North</TableCell>
                <TableCell>
                    <TextField 
                        value={stateDeed.north} 
                        onChange={e => setStateDeed({...stateDeed, north: e.target.value})} 
                        fullWidth
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        value={stateActual.north} 
                        onChange={e => setStateActual({...stateActual, north: e.target.value})} 
                        fullWidth
                    />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>South</TableCell>
                <TableCell>
                    <TextField 
                        value={stateDeed.south} 
                        onChange={e => setStateDeed({...stateDeed, south: e.target.value})} 
                        fullWidth
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        value={stateActual.south} 
                        onChange={e => setStateActual({...stateActual, south: e.target.value})} 
                        fullWidth
                    />
                </TableCell>
            </TableRow>
            <TableRow>
            <TableCell>East</TableCell>
                <TableCell>
                    <TextField 
                        value={stateDeed.east} 
                        onChange={e => setStateDeed({...stateDeed, east: e.target.value})} 
                        fullWidth
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        value={stateActual.east} 
                        onChange={e => setStateActual({...stateActual, east: e.target.value})} 
                        fullWidth
                    />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>West</TableCell>
                <TableCell>
                    <TextField 
                        value={stateDeed.west} 
                        onChange={e => setStateDeed({...stateDeed, west: e.target.value})} 
                        fullWidth
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        value={stateActual.west} 
                        onChange={e => setStateActual({...stateActual, west: e.target.value})} 
                        fullWidth
                    />
                </TableCell>
            </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
    </Box>
    </Paper>
    );
}

function ListRemoveTable(props){
    const { list, handleRemove } = props;
    return (
        <>
        <TableContainer component={Box}>
            <Table>
                <TableBody>
                    {list.map((row, index) =>
                        (<TableRow key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell width="50px">
                                <Box display="flex">
                                    <IconButton size="small" onClick={() => handleRemove(row.id)}><FaTimes fontSize="medium"/></IconButton>
                                    {index + 1}
                                </Box>
                            </TableCell>
                            <TableCell>{row.content}</TableCell>
                        </TableRow>)
                    )}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}

function CreateReport() {
    // classes related to components
    var classes = useStyles();
    const numTabs = 7

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    // State values Employees
    const [fieldValuer, setFieldValuer] = useState("")
    const [valuer, setValuer] = useState("")
    const [admin, setAdmin] = useState("")

    // State values bank
    const [bank, setBank] = useState("")
    const [bankSchema, setBankSchema] = useState("")

    // State values Task
    const [taskSelected, setTaskSelected] = useState(false)
    const [task, setTask] = useState({})
    const [imageIndex, setImageIndex] = useState(0)
    const [imageUrlList, setImageUrlList] = useState([])
    
    // State values Date
    const [dateInspection, setDateInspection] = useState(new Date())
    const [dateValuation, setDateValuation] = useState(new Date())
    
    // State values Owners
    const [ownerList, setOwnerList] = useState([])
    const [ownerName, setOwnerName] = useState("")
    const [ownerPhoneNumber, setOwnerPhoneNumber] = useState("")
    const [ownerAddress, setOwnerAddress] = useState("")

    // State values Property
    const propertyRemarkRef = useRef(null)
    const propertyPlotNumberRef = useRef(null)
    const propertyTSNumberRef = useRef(null)
    const propertyDoorNumberRef = useRef(null)
    const propertyWardRef = useRef(null)
    const propertyDistrictRef = useRef(null)
    const propertyPostalAddressRef = useRef(null)
    const propertyCityRef = useRef(null)
    const propertyAgricutureConversionRef = useRef(null)
    const propertySpecialLandRef = useRef(null)
    const [propertyType1, setPropertyType1] = useState("")
    const [propertyType2, setPropertyType2] = useState("")
    const [propertyResidential, setPropertyResidential] = useState(false)
    const [propertyIndustrial, setPropertyIndustrial] = useState(false)
    const [propertyCommercial, setPropertyCommercial] = useState(false)
    const [propertyBoundariesActual, setPropertyBoundariesActual] = useState({ north: "", south: "", east: "", west: ""})
    const [propertyBoundariesDeed, setPropertyBoundariesDeed] = useState({ north: "", south: "", east: "", west: ""})
    const [propertyDimensionsActual, setPropertyDimensionsActual] = useState({ north: "", south: "", east: "", west: ""})
    const [propertyDimensionsDeed, setPropertyDimensionsDeed] = useState({ north: "", south: "", east: "", west: ""})
    const [propertyOwnership, setPropertyOwnership] = useState("")

    // State values Character
    const characterAdvantageRef = useRef(null)
    const characterGeneralRemarkRef = useRef(null)
    const [characterPlotType, setCharacterPlotType] = useState("")
    const [characterRoadWidth, setCharacterRoadWidth] = useState("")
    const [characterLandLocked, setCharacterLandLocked] = useState("")
    const [characterWaterPotentiality, setCharacterWaterPotentiality] = useState("")
    const [characterUndergroundSewerage, setCharacterUndergroundSewerage] = useState("")
    const [characterPowerSupply, setCharacterPowerSupply] = useState("")
    const [characterAdvantageList, setCharacterAdvantageList] = useState([])
    const [characterGeneralRemarkList, setCharacterGeneralRemarkList] = useState([])

    // State values Value Land
    const valueLandSizeRef = useRef(null)

    // State values Floor
    const floorFoundationRef = useRef(null)
    const floorSuperStructureRef = useRef(null)
    const floorJoineryRef = useRef(null)
    const [floorCompoundWall, setFloorCompoundWall] = useState("No")


    function handleRemoveOwner(id){
        setOwnerList(ownerList.filter(owner => (owner.id !== id)))
    }

    function handleRemovePlotAdvantage(id){
        setCharacterAdvantageList(characterAdvantageList.filter(advantage => (advantage.id !== id)))
    }

    function handleRemoveGeneralRemark(id){
        setCharacterGeneralRemarkList(characterGeneralRemarkList.filter(remark => (remark.id !== id)))
    }

    function handleAddOwner(){
        setOwnerList([...ownerList, {
            name: ownerName,
            phoneNumber: ownerPhoneNumber, 
            address: ownerAddress, 
            id: uuidv4(),
        }])
        setOwnerName("")
        setOwnerAddress("")
        setOwnerPhoneNumber("")
        console.log(ownerList.length)
    }

    function handleAddPlotAdvantage(){
        setCharacterAdvantageList([...characterAdvantageList, {content: characterAdvantageRef.current.value, id: uuidv4()}])
        characterAdvantageRef.current.value = ""
    }

    function handleAddCharacterGeneralRemark(){
        setCharacterGeneralRemarkList([ ...characterGeneralRemarkList, { content: characterGeneralRemarkRef.current.value, id: uuidv4()}])
        characterGeneralRemarkRef.current.value = ""
    }

    useEffect(() => {
        var currentImageUrlList = []
        function fetchImageUrl(taskID, imageName){
            console.log("Fetch image called")
            return storage.ref(`tasks/${taskID}/${imageName}`).getDownloadURL()
            .then((url) => currentImageUrlList.push(url))
        }
        function fetchImageUrlAll(){
            Promise.all(
            task.images.map(imageName => fetchImageUrl(task.id, imageName)))
            .then(() => {setImageUrlList(currentImageUrlList)})
            .catch(() => {console.log('Could not fetch URLs')})
        }
        if (taskSelected){
            setBank(task.bank)
            setBankSchema(task.schema)
            fetchImageUrlAll()
        }
    }, [taskSelected, task])


    return (
        <>
        <div className={classes.formContainer} filter>
            <div className={taskSelected ? classes.form : classes.formBlur } >
            <Box>
                <Box className={classes.headingContainer}>
                    <Typography variant="h1" className={classes.heading}>
                    Create Report
                    </Typography>
                    <Box paddingBottom="5px">
                        <ButtonGroup variant="contained" color="primary">
                            <Button>Save</Button>
                            <Button>Submit</Button>
                        </ButtonGroup>
                    </Box>
                </Box>
                <Box marginLeft="10px" marginRight="10px" marginBottom="10px">
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
                </Box>
                <Paper>
                <Tabs
                    variant="scrollable"
                    indicatorColor="primary"
                    scrollButtons="auto"
                    value={value}
                    onChange={handleChange}
                >
                    <Tab label="Management Details" />
                    <Tab label="General Details" />
                    <Tab label="Characterstics of Site" />
                    <Tab label="Valuation of Land" />
                    <Tab label="Valuation of Building" />
                    <Tab label="Item Six" />
                    <Tab label="Item Seven" />
                </Tabs>
                </Paper>
            </Box>
            <Box height="20px"/>
            <TabPanel value={value} index={0}>
                <Box height="10px"/>
                <Typography variant="h3" className={classes.subHeading}>
                Employee Details
                </Typography>
                <Box height="10px"/>
                <Paper>
                <Box className={classes.textFieldBox}>
                    <EmployeeSelector 
                        state={fieldValuer}
                        setState={setFieldValuer} 
                        fieldName="Field Valuer" 
                        fieldId="fieldValuer"
                    />
                    <EmployeeSelector 
                        state={valuer}
                        setState={setValuer} 
                        fieldName="Valuer" 
                        fieldId="valuer"
                    />
                    <EmployeeSelector 
                        state={admin}
                        setState={setAdmin} 
                        fieldName="Administrator" 
                        fieldId="administrator"
                    />
                </Box>
                </Paper>
                <Box height="25px"/>
                <Typography variant="h3" className={classes.subHeading}>
                Bank Details
                </Typography>
                <Box height="10px"/>
                <Paper>
                <Box className={classes.textFieldBox}>
                    <BankSelector
                        state={bank}
                        setState={setBank}
                        fieldName="Bank"
                        fieldId="bank"
                        disabled={true}
                    />
                    <BankSchemaSelector
                        state={bankSchema}
                        setState={setBankSchema}
                        fieldName="Schema"
                        fieldId="schema"
                        disabled={true}
                    />
                </Box>
                </Paper>
                <Box height="10px"/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box height="10px"/>
                <Typography variant="h3" className={classes.subHeading}>
                    Dates
                </Typography>
                <Box height="10px"/>
                <Paper>
                <Box display="flex" className={classes.textFieldBox}>
                    <DatePicker 
                        label="Inspection Date"
                        value={dateInspection} 
                        onChange={value => setDateInspection(value)} 
                        format="dd/MM/yyyy"
                        fullWidth
                    />
                    <Box width="30px"/>
                    <DatePicker 
                        label="Valuation Date"
                        value={dateValuation} 
                        onChange={value => setDateValuation(value)} 
                        format="dd/MM/yyyy"
                        fullWidth
                    />
                </Box>
                </Paper>
                <Box height="25px"/>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h3" className={classes.subHeading}>
                        Ownership
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        size="small" 
                        disabled={ownerPhoneNumber.length <= 9 || ownerName.length === 0}
                        onClick={handleAddOwner}
                    >
                        Add Owner
                    </Button>
                </Box>
                <Box height="10px"/>
                <Paper>
                <Box className={classes.textFieldBox}>
                    <Box display="flex">
                        <TextField
                            id="ownerNumber"
                            InputProps={{
                                classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                                },
                            }}
                            value={ownerName}
                            onChange={e => setOwnerName(e.target.value)}
                            margin="dense"
                            label="Owner's name"
                            type="name"
                            fullWidth
                        />
                        <Box width="30px"/>
                        <MaterialUiPhoneNumber
                            id="ownerPhoneNumber"
                            defaultCountry='in'
                            InputProps={{
                                classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                                },
                            }}
                            value={ownerPhoneNumber}
                            onChange={(value) => setOwnerPhoneNumber(value)}
                            margin="dense"
                            label="Owner's Number"
                            type="ownerPhoneNumber"
                            fullWidth
                        />
                    </Box>
                    <TextField
                        id="ownerAddress"
                        InputProps={{
                            classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                            },
                        }}
                        value={ownerAddress}
                        onChange={e => setOwnerAddress(e.target.value)}
                        margin="dense"
                        label="Owner's Address"
                        type="address"
                        fullWidth
                    />
                    {ownerList.length !== 0 && <Box height="10px"/>}
                    <OwnerTable ownerList={ownerList} handleRemoveOwner={handleRemoveOwner}/>
                </Box>
                </Paper>
                <Box height="20px"/>
                <Typography variant="h3" className={classes.subHeading}>
                    Property
                </Typography>
                <Box height="10px"/>
                <Paper>
                <Box className={classes.textFieldBox}>
                    <Typography variant="h5" className={classes.sectionHeading}>Remark</Typography>
                    <TextField
                        id="propertyRemark"
                        InputProps={{
                            classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                            },
                        }}
                        inputRef={propertyRemarkRef}
                        margin="dense"
                        type="remark"
                        maxRows={4}
                        multiline
                        fullWidth
                    />
                </Box>
                </Paper>
                <Box height="20px"/>
                <Paper>
                <Box className={classes.textFieldBox}>
                    <Typography variant="h5" className={classes.sectionHeading}>Location</Typography>
                    <Box display="flex">
                        <TextField
                            id="plotNumber"
                            InputProps={{
                                classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                                },
                            }}
                            inputRef={propertyPlotNumberRef}
                            margin="dense"
                            label="Plot No. / Survey No."
                            type="plotNumber"
                            fullWidth
                        />
                        <Box width="30px"/>
                        <TextField
                            id="doorNumber"
                            InputProps={{
                                classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                                },
                            }}
                            inputRef={propertyDoorNumberRef}
                            margin="dense"
                            label="Door No."
                            type="doorNumber"
                            fullWidth
                        />
                        <Box width="30px"/>
                        <TextField
                            id="TSNumber"
                            InputProps={{
                                classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                                },
                            }}
                            inputRef={propertyTSNumberRef}
                            margin="dense"
                            label="T.S. No. / Village"
                            type="TSNumber"
                            fullWidth
                        />
                    </Box>
                    <Box display="flex">
                        <TextField
                            id="propertyWard"
                            InputProps={{
                                classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                                },
                            }}
                            inputRef={propertyWardRef}
                            margin="dense"
                            label="Ward / Taluk"
                            type="ward"
                            fullWidth
                        />
                        <Box width="30px"/>
                        <TextField
                            id="propertyDistrict"
                            InputProps={{
                                classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                                },
                            }}
                            inputRef={propertyDistrictRef}
                            margin="dense"
                            label="District / Mandal"
                            type="district"
                            fullWidth
                        />
                        <Box width="30px"/>
                        <TextField
                            id="propertyCity"
                            InputProps={{
                                classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                                },
                            }}
                            inputRef={propertyCityRef}
                            margin="dense"
                            label="City / Town"
                            type="city"
                            fullWidth
                        />
                    </Box>
                    <TextField
                        id="propertyPostalAddress"
                        InputProps={{
                            classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                            },
                        }}
                        maxRows={2}
                        multiline
                        inputRef={propertyPostalAddressRef}
                        margin="dense"
                        label="Postal Address"
                        type="address"
                        fullWidth
                    />
                </Box>
                </Paper>
                <Box height="20px"/>
                <Paper>
                <Box className={classes.textFieldBox}>
                    <Typography variant="h5" className={classes.sectionHeading}>Area</Typography>
                    <TableContainer component={Box}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>1.</TableCell>
                                    <TableCell>
                                        <FormControlLabel
                                            control={
                                            <Checkbox 
                                                onChange={() => setPropertyResidential(!propertyResidential)}
                                                checked={propertyResidential}
                                                name="Residential" 
                                            />}
                                            label="Residential"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <FormControlLabel
                                            control={
                                            <Checkbox
                                                onChange={() => setPropertyCommercial(!propertyCommercial)}
                                                checked={propertyCommercial}
                                                name="Commercial" 
                                            />}
                                            label="Commercial"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <FormControlLabel
                                            control={
                                            <Checkbox
                                                onChange={() => setPropertyIndustrial(!propertyIndustrial)}
                                                checked={propertyIndustrial}
                                                name="Industrial" 
                                            />}
                                            label="Industrial"
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>2.</TableCell>
                                    <TableCell>
                                        <FormControlLabel value="High" control={
                                        <Radio checked={propertyType1 === "High"}/>
                                        } onClick={e => setPropertyType1(e.target.value)} label="High" />
                                    </TableCell>
                                    <TableCell>
                                        <FormControlLabel value="Middle" control={
                                        <Radio checked={propertyType1 === "Middle"}/>
                                        } onClick={e => setPropertyType1(e.target.value)} label="Middle" />
                                    </TableCell>
                                    <TableCell>
                                        <FormControlLabel value="Poor" control={
                                        <Radio checked={propertyType1 === "Poor"}/>
                                        } onClick={e => setPropertyType1(e.target.value)} label="Poor" />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>3.</TableCell>
                                    <TableCell>
                                        <FormControlLabel value="Urban" control={
                                        <Radio checked={propertyType2 === "Urban"}/>
                                        } onClick={e => setPropertyType2(e.target.value)} label="Urban" />
                                    </TableCell>
                                    <TableCell>
                                        <FormControlLabel value="Semi Urban" control={
                                        <Radio checked={propertyType2 === "Semi Urban"}/>
                                        } onClick={e => setPropertyType2(e.target.value)} label="Semi Urban" />
                                    </TableCell>
                                    <TableCell>
                                        <FormControlLabel value="Rural" control={
                                        <Radio checked={propertyType2 === "Rural"}/>
                                        } onClick={e => setPropertyType2(e.target.value)} label="Rural" />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                </Paper>
                <Box height="20px"/>
                <TableTextFieldNSEW
                    stateActual={propertyBoundariesActual}
                    stateDeed={propertyBoundariesDeed}
                    setStateActual={setPropertyBoundariesActual}
                    setStateDeed={setPropertyBoundariesDeed}
                    fieldName="Boundaries of Property"
                />
                <Box height="20px"/>
                <TableTextFieldNSEW
                    stateActual={propertyDimensionsActual}
                    stateDeed={propertyDimensionsDeed}
                    setStateActual={setPropertyDimensionsActual}
                    setStateDeed={setPropertyDimensionsDeed}
                    fieldName="Dimensions of Property"
                />
                <Box height="20px"/>
                <Paper>
                <Box className={classes.textFieldBox}>
                    <Typography variant="h5" className={classes.sectionHeading}>Extent of Site</Typography>
                    <Box display="flex" >
                    <TextField
                        id="extentsOfSite"
                        InputProps={{
                            classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                            },
                        }}
                        margin="dense"
                        label="Extents of Site"
                        type="text"
                        fullWidth
                    />
                    <Box width="30px"/>
                    <TextField
                        id="extentsOfSiteConsidered"
                        InputProps={{
                            classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                            },
                        }}
                        margin="dense"
                        label="Extents of Site Considered"
                        type="text"
                        fullWidth
                    />
                    </Box>
                </Box>
                </Paper>
                <Box height="20px"/>
                <Paper>
                <Box className={classes.textFieldBox}>
                    <Typography variant="h5" className={classes.sectionHeading}>Occupied By</Typography>
                    <Box height="10px"/>
                    <RadioGroup row>
                        <FormControlLabel value="Owner" control={<Radio />} label="Owner" onChange={(e) => setPropertyOwnership(e.target.value)}/>
                        <FormControlLabel value="Tenant" control={<Radio />} label="Tenant" onChange={(e) => setPropertyOwnership(e.target.value)}/>
                    </RadioGroup>
                    {propertyOwnership === "Tenant" &&
                        <Box display="flex">
                            <TextField
                                id="Rent"
                                InputProps={{
                                    classes: {
                                    underline: classes.textFieldUnderline,
                                    input: classes.textField,
                                    },
                                }}
                                margin="dense"
                                label="Rent Payed by Tenant"
                                type="text"
                                fullWidth
                            />
                            <Box width="30px"/>
                            <TextField
                                id="duration"
                                InputProps={{
                                    classes: {
                                    underline: classes.textFieldUnderline,
                                    input: classes.textField,
                                    },
                                }}
                                margin="dense"
                                label="Duration of Stay"
                                type="text"
                                fullWidth
                            />
                        </Box>}
                </Box>
                </Paper>
                <Box height="20px"/>
                <Paper>
                <Box className={classes.textFieldBox}>
                    <Typography variant="h5" className={classes.sectionHeading}>Miscellaneous</Typography>
                    
                    <TextField
                        id="agricutureConversion"
                        InputProps={{
                            classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                            },
                        }}
                        inputRef={propertyAgricutureConversionRef}
                        margin="dense"
                        label="In case of Agricultrue Land, any conversion to house site?"
                        type="address"
                        multiline
                        fullWidth
                    />
                    <TextField
                        id="propertySpecialLand"
                        InputProps={{
                            classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                            },
                        }}
                        inputRef={propertySpecialLandRef}
                        margin="dense"
                        label="Special Land"
                        helperText="Covered under State / Center Enactment or under agency / scheduled / cantonment area"
                        type="text"
                        multiline
                        fullWidth
                    />
                </Box>
                </Paper>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TextField
                    id="characterClassification"
                    InputProps={{
                        classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                        },
                    }}
                    margin="dense"
                    label="Classification of Locality"
                    type="text"
                    multiline
                    fullWidth
                />
                <TextField
                    id="characterDevSurrounding"
                    InputProps={{
                        classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                        },
                    }}
                    margin="dense"
                    label="Development of Surrounding Areas"
                    type="text"
                    multiline
                    fullWidth
                />
                <TextField
                    id="characterFlooding"
                    InputProps={{
                        classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                        },
                    }}
                    margin="dense"
                    label="Flooding / Submerging"
                    helperText="Possibility of frequent Flooding / Submerging"
                    type="text"
                    multiline
                    fullWidth
                />
                <TextField
                    id="characterFeasibility"
                    InputProps={{
                        classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                        },
                    }}
                    margin="dense"
                    label="Feasibility to Civic ameneties"
                    helperText="School / Hospital / Bus Stop / Market etc."
                    type="text"
                    multiline
                    fullWidth
                />
                <TextField
                    id="characterLevelLand"
                    InputProps={{
                        classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                        },
                    }}
                    margin="dense"
                    label="Level of land"
                    helperText=" With topographical conditions"
                    type="text"
                    multiline
                    fullWidth
                />
                <TextField
                    id="characterShapeLand"
                    InputProps={{
                        classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                        },
                    }}
                    margin="dense"
                    label="Shape of land"
                    type="text"
                    multiline
                    fullWidth
                />
                <TextField
                    id="characterTypePutUse"
                    InputProps={{
                        classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                        },
                    }}
                    margin="dense"
                    label="Use to which it can be put"
                    type="text"
                    multiline
                    fullWidth
                />
                <TextField
                    id="characterUsageRestriction"
                    InputProps={{
                        classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                        },
                    }}
                    margin="dense"
                    label="Usage Restriction"
                    type="text"
                    multiline
                    fullWidth
                />
                <TextField
                    id="characterApporovedLayout"
                    InputProps={{
                        classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                        },
                    }}
                    margin="dense"
                    label="Town Planning Approved Layout"
                    type="text"
                    multiline
                    fullWidth
                />
                <TableContainer component={Box}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>1.</TableCell>
                                <TableCell>
                                    <FormControlLabel value="Corner" control={
                                    <Radio checked={characterPlotType === "Corner"}/>
                                    } onClick={e => setCharacterPlotType(e.target.value)} label="Corner" />
                                </TableCell>
                                <TableCell>
                                    <FormControlLabel value="Intermittent" control={
                                    <Radio checked={characterPlotType === "Intermittent"}/>
                                    } onClick={e => setCharacterPlotType(e.target.value)} label="Intermittent" />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Paper>
                <Box className={classes.textFieldBox}>
                    <Typography variant="h5" className={classes.sectionHeading}>Road</Typography>
                    <TextField
                        id="characterRoadFacility"
                        InputProps={{
                            classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                            },
                        }}
                        margin="dense"
                        label="Road Facilities"
                        type="text"
                        multiline
                        fullWidth
                    />
                    <TextField
                        id="characterRoadType"
                        InputProps={{
                            classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                            },
                        }}
                        margin="dense"
                        label="Type of Road Available"
                        type="text"
                        multiline
                        fullWidth
                    />
                    <TableContainer component={Box}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Road Width</TableCell>
                                    <TableCell>
                                        <FormControlLabel value="More than 20ft" control={
                                        <Radio checked={characterRoadWidth === "More than 20ft"}/>
                                        } onClick={e => setCharacterRoadWidth(e.target.value)} label="More than 20ft" />
                                    </TableCell>
                                    <TableCell>
                                        <FormControlLabel value="Less than 20ft" control={
                                        <Radio checked={characterRoadWidth === "Less than 20ft"}/>
                                        } onClick={e => setCharacterRoadWidth(e.target.value)} label="Less than 20ft" />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                </Paper>
                <Box height="20px"/>   
                <Paper>
                <Box className={classes.textFieldBox}>
                    <TableContainer component={Box}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Land Locked</TableCell>
                                    <TableCell>
                                        <FormControlLabel value="Yes" control={
                                        <Radio checked={characterLandLocked === "Yes"}/>
                                        } onClick={e => setCharacterLandLocked(e.target.value)} label="Yes" />
                                    </TableCell>
                                    <TableCell>
                                        <FormControlLabel value="No" control={
                                        <Radio checked={characterLandLocked === "No"}/>
                                        } onClick={e => setCharacterLandLocked(e.target.value)} label="No" />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Water Potentiality</TableCell>
                                    <TableCell>
                                        <FormControlLabel value="Yes" control={
                                        <Radio checked={characterWaterPotentiality === "Yes"}/>
                                        } onClick={e => setCharacterWaterPotentiality(e.target.value)} label="Yes" />
                                    </TableCell>
                                    <TableCell>
                                        <FormControlLabel value="No" control={
                                        <Radio checked={characterWaterPotentiality === "No"}/>
                                        } onClick={e => setCharacterWaterPotentiality(e.target.value)} label="No" />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Underground Sewerage</TableCell>
                                    <TableCell>
                                        <FormControlLabel value="Yes" control={
                                        <Radio checked={characterUndergroundSewerage === "Yes"}/>
                                        } onClick={e => setCharacterUndergroundSewerage(e.target.value)} label="Yes" />
                                    </TableCell>
                                    <TableCell>
                                        <FormControlLabel value="No" control={
                                        <Radio checked={characterUndergroundSewerage === "No"}/>
                                        } onClick={e => setCharacterUndergroundSewerage(e.target.value)} label="No" />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Power Supply Available</TableCell>
                                    <TableCell>
                                        <FormControlLabel value="Yes" control={
                                        <Radio checked={characterPowerSupply === "Yes"}/>
                                        } onClick={e => setCharacterPowerSupply(e.target.value)} label="Yes" />
                                    </TableCell>
                                    <TableCell>
                                        <FormControlLabel value="No" control={
                                        <Radio checked={characterPowerSupply === "No"}/>
                                        } onClick={e => setCharacterPowerSupply(e.target.value)} label="No" />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                </Paper>
                <Box height="20px"/>
                <Paper>
                <Box className={classes.textFieldBox}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h5" className={classes.sectionHeading}>Advantages of Site</Typography>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="small" 
                            onClick={handleAddPlotAdvantage}
                        >
                            Add Advantage
                        </Button>
                    </Box>
                    <Box>
                        <TextField
                            id="characterAdvantage"
                            InputProps={{
                                classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                                },
                            }}
                            inputRef={characterAdvantageRef}
                            margin="dense"
                            label="Advantage"
                            type="text"
                            multiline
                            fullWidth
                        />
                    </Box>
                    <ListRemoveTable 
                        list={characterAdvantageList}
                        handleRemove={handleRemovePlotAdvantage}
                    />
                </Box>
                </Paper>
                <Box height="20px"/>
                <Paper>
                <Box className={classes.textFieldBox}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h5" className={classes.sectionHeading}>General Remarks</Typography>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="small" 
                            onClick={handleAddCharacterGeneralRemark}
                        >
                            Add Remark
                        </Button>
                    </Box>
                    <Box>
                        <TextField
                            id="characterGeneralRemark"
                            InputProps={{
                                classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                                },
                            }}
                            inputRef={characterGeneralRemarkRef}
                            margin="dense"
                            label="Remark"
                            helperText="Any threat like acquisition of land for public service purposes / road widening or applicability of CRZ provisons etc."
                            type="text"
                            multiline
                            fullWidth
                        />
                    </Box>
                    <ListRemoveTable 
                        list={characterGeneralRemarkList}
                        handleRemove={handleRemoveGeneralRemark}
                    />
                </Box>
                </Paper>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Paper>
                <Box className={classes.textFieldBox}>
                    <Typography variant="h5" className={classes.sectionHeading}>Plot Dimensions</Typography>
                    <TextField
                        id="valueLandSize"
                        InputProps={{
                            classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                            },
                        }}
                        inputRef={valueLandSizeRef}
                        margin="dense"
                        label="Size"
                        type="text"
                        fullWidth
                    />
                    <Box display="flex">
                        <TextField
                            id="valueLandNS"
                            InputProps={{
                                classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                                },
                            }}
                            inputRef={valueLandSizeRef}
                            margin="dense"
                            label="North & South"
                            type="text"
                            fullWidth
                        />
                        <Box width="30px"/>
                        <TextField
                            id="valueLandEW"
                            InputProps={{
                                classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                                },
                            }}
                            inputRef={valueLandSizeRef}
                            margin="dense"
                            label="East & West"
                            type="text"
                            fullWidth
                        />
                    </Box>
                    <TextField
                        id="valueLandExtentsPlots"
                        InputProps={{
                            classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                            },
                        }}
                        margin="dense"
                        label="Total extents of the plot"
                        type="text"
                        fullWidth
                    />
                </Box>
                </Paper>
                <Box height="20px"/>
                <Paper>
                <Box className={classes.textFieldBox}>
                    <Typography variant="h5" className={classes.sectionHeading}>Plot Rates</Typography>
                    <TextField
                        id="valueLandPrevailingMarketRate"
                        InputProps={{
                            classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                            },
                        }}
                        margin="dense"
                        label="Prevailing Market Rate"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        id="valueLandGuidelineRate"
                        InputProps={{
                            classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                            },
                        }}
                        margin="dense"
                        label="Guideline Rate"
                        helperText="From Registrar's office (An evidence thereof to be enclosed)"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        id="valueLandAssessedRate"
                        InputProps={{
                            classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                            },
                        }}
                        margin="dense"
                        label="Assessed / Adopted Rate"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        id="valueLandEstimatedValue"
                        InputProps={{
                            classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                            },
                        }}
                        margin="dense"
                        label="Estimated Value"
                        type="text"
                        fullWidth
                    />
                </Box>
                </Paper>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h3" className={classes.subHeading}>Floorwise Details</Typography>
                    <Button variant="contained" color="primary" size="small">Add Floor</Button>
                </Box>
                <Box height="10px"/>
                <Paper>
                <Box className={classes.textFieldBox}>
                    <Typography variant="h4" className={classes.sectionHeading}>Specification of Construction</Typography>
                    <TextField
                        InputProps={{
                            classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                            },
                        }}
                        inputRef={floorFoundationRef}
                        margin="dense"
                        label="foundation"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        InputProps={{
                            classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                            },
                        }}
                        inputRef={floorSuperStructureRef}
                        margin="dense"
                        label="Super Structure"
                        helperText="Furnish details about size of frames, shutters, glazing, fitting etc. Also specify the species of timber"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        InputProps={{
                            classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                            },
                        }}
                        margin="dense"
                        label="Joinery / Doors & Windows"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        InputProps={{
                            classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                            },
                        }}
                        margin="dense"
                        label="RCC Works"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        InputProps={{
                            classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                            },
                        }}
                        margin="dense"
                        label="Plastering"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        InputProps={{
                            classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                            },
                        }}
                        margin="dense"
                        label="Flooring / Skirting / Dadoing"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        InputProps={{
                            classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                            },
                        }}
                        margin="dense"
                        label="Special Finish"
                        helperText="Marble, Granite, Wooden paneling, Grills etc."
                        type="text"
                        fullWidth
                    />
                    <TextField
                        InputProps={{
                            classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                            },
                        }}
                        margin="dense"
                        label="Roofing with weather proof course"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        InputProps={{
                            classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                            },
                        }}
                        margin="dense"
                        label="Drainage"
                        type="text"
                        fullWidth
                    />
                    <Box height="40px"/>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h4" className={classes.sectionHeading}>Compound Wall</Typography>
                        <Box display="flex">
                            <FormControlLabel value="Yes" control={
                            <Radio checked={floorCompoundWall === "Yes"}/>
                            } onClick={e => setFloorCompoundWall(e.target.value)} label="Yes" />
                            <FormControlLabel value="No" control={
                            <Radio checked={floorCompoundWall === "No"}/>
                            } onClick={e => setFloorCompoundWall(e.target.value)} label="No" />
                        </Box>
                    </Box>
                    {floorCompoundWall === "Yes" && 
                    <>
                        <Box display="flex">
                            <TextField
                                InputProps={{
                                    classes: {
                                    underline: classes.textFieldUnderline,
                                    input: classes.textField,
                                    },
                                }}
                                margin="dense"
                                label="Height"
                                type="text"
                                fullWidth
                            />
                            <Box width="30px"/>
                            <TextField
                                InputProps={{
                                    classes: {
                                    underline: classes.textFieldUnderline,
                                    input: classes.textField,
                                    },
                                }}
                                margin="dense"
                                label="Length"
                                type="text"
                                fullWidth
                            />
                        </Box>
                        <TextField
                            InputProps={{
                                classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                                },
                            }}
                            margin="dense"
                            label="Type of Construction"
                            type="text"
                            fullWidth
                        />
                    </>}
                </Box>
                </Paper>
            </TabPanel>
            <TabPanel value={value} index={5}>
                Item Six
            </TabPanel>
            <TabPanel value={value} index={6}>
                Item Seven
            </TabPanel>
            <Box height="20px"/>
            <Box width="100%" display="flex">
                {value !== 0 && 
                    <Button
                    onClick={() => setValue(value - 1)}
                    color="primary"
                    size="medium"
                    >
                    Previous
                    </Button>
                }
                <Box width="100%"/>
                {value + 1 !== numTabs && 
                    <Button
                    onClick={() => setValue(value + 1)}
                    color="primary"
                    >
                    Next
                    </Button>
                }
            </Box>
            </div>
            <div className={classes.task}>
                <Paper color="secondary">
                <Box width="100%" padding="20px" display="flex" flexDirection="column">
                    <Typography variant="h2" className={classes.subHeading}>
                    Select Task
                    </Typography>
                    <TaskSelector
                        state={task}
                        setState={setTask}
                        fieldName={"Task"}
                        fieldId={"task"}
                        setTaskSelected={setTaskSelected}
                        setImageIndex={setImageIndex}
                    />
                    <Box height="10px"/>
                    <Box 
                        display="flex"
                        justifyContent="flex-end"
                        bgcolor="primary.light" 
                        padding="3px"
                        fullWidth
                    >
                        <IconButton 
                            size="small" 
                            disabled={!taskSelected || imageIndex === 0}
                            onClick={() => setImageIndex(imageIndex - 1)}
                        >
                            <FaArrowLeft color="white" fontSize={18}/>
                        </IconButton>
                        <IconButton 
                            size="small" 
                            disabled={!taskSelected || task.images.length === imageIndex + 1}
                            onClick={() => setImageIndex(imageIndex + 1)} 
                        >
                            <FaArrowRight color="white" fontSize={18}/>
                        </IconButton>
                    </Box>
                    <div 
                        width="100%"
                    >
                        {taskSelected ? 
                            (task.images.length !== 0 ? 
                            imageUrlList.map(
                            (url, index) => 
                            (index === imageIndex && <Image 
                                key={url}
                                src={url}
                                width="100%"
                                cover={true}
                                alt="images"
                                onClick={()=> console.log("Clicked on Image")}
                            />))
                            : <Box 
                                width="100%"
                                height="300px"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                bgcolor="primary.main"
                            >
                                <Typography 
                                    variant="h3" 
                                    className={classes.imageTextBox}
                                >
                                    No Images Attached
                                </Typography>  
                            </Box>
                            ):
                            <Box 
                                width="100%"
                                height="300px"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                bgcolor="primary.main"
                            >
                            <Typography 
                                variant="h3" 
                                className={classes.imageTextBox}
                            >
                                Please Select a Task
                            </Typography>  
                            </Box>
                        }
                    </div>
                </Box>
                </Paper>
            </div>
        </div>
        </>
    )
}

export default CreateReport
