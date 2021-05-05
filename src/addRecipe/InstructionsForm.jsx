import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import StepLists from "./StepLists";
import SlideBar from "./SlideBar";
import {Form} from "react-bootstrap";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '60vh',
    }
}));

export default function InstructionsForm() {
const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.form}>
            <Typography variant="h6" gutterBottom>
                Instructions
            </Typography>
            <SlideBar/>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <StepLists/>
                </Grid></Grid>
            </div>
        </React.Fragment>
    );
}
