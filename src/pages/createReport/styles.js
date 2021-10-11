import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    formContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap",
    },
    form: {
        width: 500,
        paddingLeft: "10px",
        paddingRight: "10px",  
    },
    formBlur: {
        width: 500,
        paddingLeft: "10px",
        paddingRight: "10px",
        filter: `blur(3px)`,
        pointerEvents: "none",  
    },
    heading: {
        fontWeight: 500,
        textAlign: "left",
        marginTop: theme.spacing(1),
    },
    subHeading: {
        fontWeight: 400,
        textAlign: "left",
    },
    headingContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        padding:"10px"
    },
    tabContainer: {
        display: "flex",
        width: "100%"
    },
    task: {
        width: "500px",
        paddingTop: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
    },
    imageTextBox: {
        fontWeight: 400,
        textAlign: "left",
        color: "white"
    },
    checkBox: {
        color: "grey",
    },
    textFieldBox: {
        paddingTop: "15px",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingBottom: "20px"
    },
    sectionHeading: {
        fontWeight: 300,
    },
}))