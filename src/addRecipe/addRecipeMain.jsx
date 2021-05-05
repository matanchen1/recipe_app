import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import RecipeDetails from "./RecepieDetails";
import InstructionsForm from "./InstructionsForm";
import Ingredients from "./ingredients";

import clsx from "clsx";
import PropTypes from "prop-types";
import StepConnector from '@material-ui/core/StepConnector';
import  {withStyles} from "@material-ui/core";
import {useHistory} from "react-router-dom";
// import "./styles/AddRecipe.css";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © Grandma Cooked Oatmeal\n "}
            <Link color="inherit" href="https://material-ui.com/">
                Grandma Cooked Oatmeal
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({

    font:{
        // color: 'rgba(80,13,9,0.9)',
    } ,
    backgroundImg: {
        backgroundImage: `url(https://cdn.glitch.com/0b57df91-f600-46a4-956b-70a322817e9a%2Fbrooke-lark-wMzx2nBdeng-unsplash.jpg?v=1619933227617)`,
        height: "auto",
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
        minHeight: "100vh"
    },
    layout: {
        pa: "3px",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 800,
            height: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },

    paper: {
        minHeight: "5vh",
        textAlign: "justify",
        textJustify: "inter-word",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
            background: "none"
            // background: 'rgba(233,64,87,0.1)',
        }
    },
    stepper: {
        background: "transparent",

        borderStyle: "none"
    },
    buttons: {
        color: "white",
        padding: "0 30px",
        display: "flex",
        justifyContent: "flex-end"
    },
    button: {
        background:
            "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1)
    },
    finalPage:{
        minHeight: "51vh",
        textAlign: "center",

    },
    emptyDiv:{
        height:"30px"
    }
}));

// const useQontoStepIconStyles = makeStyles({
//     root: {
//         color: '#FFA07A',
//
//         display: 'flex',
//         height: 22,
//         alignItems: 'center',
//     },
//     active: {
//         color: "rgba(107,142,35,0.45)",
//     },
//     circle: {
//         width: 8,
//         height: 8,
//         borderRadius: '50%',
//         backgroundColor: 'currentColor',
//     },
//     completed: {
//         color: "rgba(107,142,35,0.45)",
//         zIndex: 1,
//         fontSize: 18,
//     },
// });

const steps = ["Recipe's details", "Ingredients", " Instructions"];

function getStepContent(step) {
    switch (step) {
        case 0:

            return <RecipeDetails />;
        case 1:
            return <Ingredients />;

        case 2:
            return <InstructionsForm />;

        default:
            throw new Error("Unknown step");
    }
}

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: "#ccc",
        zIndex: 1,
        color: "#fff",
        width: 50,
        height: 50,
        display: "flex",
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center"
    },
    active: {
        backgroundImage:
            "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
    },
    completed: {
        backgroundImage:
            "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)"
    }
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        // 1: <svg height="80" viewBox="0 0 64 64" width="80" height="80" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        //     <g id="Flat"><g id="Stroke_copy_2" data-name="Stroke copy 2"><g><g><path d="m26 18.664h-4v-8a2 2 0 0 1 .891-1.664l9-6 2.218 3.328-8.109 5.406z" fill="#f9e109"/>
        //         <path d="m34.11 6.33-8.11 5.4v6.93h-4v-8a1.994 1.994 0 0 1 .89-1.66l1.01-.68a5.35 5.35 0 0 0 4.82-.75l4.19-3.05z" fill="#fcbc04"/>
        //         <path d="m35 61h-22l-4-35h30z" fill="#f8664f"/><path d="m11 22h26a2 2 0 0 1 2 2v2a0 0 0 0 1 0 0h-30a0 0 0 0 1 0 0v-2a2 2 0 0 1 2-2z" fill="#84d2f4"/>
        //         <path d="m16 18h16a2 2 0 0 1 2 2v2a0 0 0 0 1 0 0h-20a0 0 0 0 1 0 0v-2a2 2 0 0 1 2-2z" fill="#84d2f4"/>
        //         <path d="m38.66 29h-22.66a34.147 34.147 0 0 0 21.53 9.9l-2.53 22.1h-22l-4-35h30z" fill="#cc5144"/>
        //         <g fill="#57b7eb"><path d="m39 24v2h-30v-2a2.006 2.006 0 0 1 2-2 2.006 2.006 0 0 0 2 2z"/><path d="m34 20v2h-20v-2a2.006 2.006 0 0 1 2-2 2.006 2.006 0 0 0 2 2z"/></g></g><g><path d="m45 23-2 25-1 11 5 1 3-36-3-1.6z" fill="#e59730"/><path d="m39 28 2 24h6l-2-25-3-3z" fill="#fcbc04"/><path d="m47 52h-6l-2-24 1.18-1.57 1.82 14.57h1l1.09-6.36.91-.64.61.61z" fill="#e59730"/><path d="m37 31-2.963-1.018-1.037 3.018 5 16 4.667-2z" fill="#f9e109"/><path d="m42.67 47-4.67 2-5-16 1.02-2.95 1.83 5.5a17.733 17.733 0 0 0 5.66 8.18z" fill="#fcbc04"/><path d="m55 24-4.079 19h4.079l3-14z" fill="#f9e109"/><path d="m54.848 33.325 1.6-6.918-1.448-2.407-4.079 19h4.079l1.363-6.359a3 3 0 0 1 -1.515-3.316z" fill="#fcbc04"/><path d="m27 30 7 19 4-1-7-18z" fill="#f9e109"/><path d="m27 30 7 19 2-.5-7.142-18.5z" fill="#fcbc04"/><path d="m49 27-3 24 4-1 4-21z" fill="#f9e109"/><path d="m51.72 40.97-1.72 9.03-4 1 3-24 1.94.78-.8 11.23a1.856 1.856 0 0 0 1.58 1.96z" fill="#fcbc04"/><path d="m48 52h-4l1-18 4 1z" fill="#f9e109"/><path d="m46.732 42.567.226-8.077-1.958-.49-1 18h4l.393-6.674a3 3 0 0 1 -1.661-2.759z" fill="#fcbc04"/><path d="m53 39c0 3.866-4.029 7-9 7s-9-3.134-9-7h-5l3 22h22l3-22z" fill="#84d2f4"/><path d="m55.55 57-.55 4h-22l-3-22h5a6.112 6.112 0 0 0 2.07 4.46 15.991 15.991 0 0 0 15.81 13.54z" fill="#57b7eb"/><circle cx="44" cy="54" fill="#f9e109" r="3"/><path d="m46.49 55.67a3 3 0 0 1 -5.49-1.67 2.947 2.947 0 0 1 .54-1.71 15.951 15.951 0 0 0 4.95 3.38z" fill="#fcbc04"/></g><g><path d="m30 51h-18a4 4 0 0 1 -4-4 4 4 0 0 1 4-4h18a4 4 0 0 1 4 4 4 4 0 0 1 -4 4z" fill="#f89c8d"/><path d="m32 49a3.931 3.931 0 0 0 1.64-.36 3.865 3.865 0 0 1 -.81 1.19 4.025 4.025 0 0 1 -2.83 1.17h-18a4 4 0 0 1 -2.83-6.83 3.865 3.865 0 0 1 1.19-.81 3.931 3.931 0 0 1 1.64-.36h18a4 4 0 0 1 2.64 1 3.833 3.833 0 0 1 1.1 1.6 2.116 2.116 0 0 1 -1.85 1.09 2.163 2.163 0 0 1 -.95-.22 2.076 2.076 0 0 0 -1.88 0l-2.12 1.06a2.076 2.076 0 0 1 -1.88 0l-2.12-1.06a2.076 2.076 0 0 0 -1.88 0l-2.12 1.06a2.076 2.076 0 0 1 -1.88 0l-2.12-1.06a2.076 2.076 0 0 0 -1.88 0l-1.61.81a3.1 3.1 0 0 1 -.58.21 3.984 3.984 0 0 0 3.13 1.51z" fill="#f8664f"/><path d="m6 55h30a0 0 0 0 1 0 0v2a4 4 0 0 1 -4 4h-22a4 4 0 0 1 -4-4v-2a0 0 0 0 1 0 0z" fill="#fcbc04"/><path d="m23.8 55-.8 1-.8-1z" fill="#e59730"/><path d="m23.8 55-.8 1-.8-1z" fill="#e59730"/><path d="m32 55h-22a2 2 0 0 1 -2-2 2 2 0 0 1 2-2h22a2 2 0 0 1 2 2 2 2 0 0 1 -2 2z" fill="#cc5144"/><path d="m24 56-4-5h8z" fill="#f7f754"/><path d="m23.657 52.072-.857-1.072h-2.8l4 5 2.265-2.831a2.974 2.974 0 0 1 -2.608-1.097z" fill="#f9e109"/><path d="m7 43a3.234 3.234 0 0 0 1.789 2.894l.764.382a3.232 3.232 0 0 0 2.894 0l1.609-.8a2.112 2.112 0 0 1 1.888 0l2.112 1.056a2.112 2.112 0 0 0 1.888 0l2.112-1.056a2.112 2.112 0 0 1 1.888 0l2.112 1.056a2.112 2.112 0 0 0 1.888 0l2.112-1.056a2.112 2.112 0 0 1 1.888 0 2.112 2.112 0 0 0 3.056-1.892v-.584z" fill="#c4f236"/><path d="m26 33h-10a10 10 0 0 0 -10 10h30a10 10 0 0 0 -10-10z" fill="#fcbc04"/><path d="m36 43h-30a10 10 0 0 1 7.32-9.63 9 9 0 0 0 8.68 6.63h13.54a9.908 9.908 0 0 1 .46 3z" fill="#e59730"/><path d="m36 57a4 4 0 0 1 -4 4h-22a4 4 0 0 1 -4-4v-2h2.13a3.992 3.992 0 0 0 3.87 3h21a4.941 4.941 0 0 0 3-1z" fill="#e59730"/><path d="m35 43v.58a1.424 1.424 0 0 1 -.05.42h-26.25a3.058 3.058 0 0 0 1.09.89l.76.39a3.284 3.284 0 0 0 2.9 0l1.61-.81a2.076 2.076 0 0 1 1.88 0l2.12 1.06a2.076 2.076 0 0 0 1.88 0l2.12-1.06a2.076 2.076 0 0 1 1.88 0l2.12 1.06a2.076 2.076 0 0 0 1.88 0l2.12-1.06a2.076 2.076 0 0 1 1.88 0 2.1 2.1 0 0 0 1.86.01 2.119 2.119 0 0 1 -1.91 1.21 2.163 2.163 0 0 1 -.95-.22 2.076 2.076 0 0 0 -1.88 0l-2.12 1.06a2.076 2.076 0 0 1 -1.88 0l-2.12-1.06a2.076 2.076 0 0 0 -1.88 0l-2.12 1.06a2.076 2.076 0 0 1 -1.88 0l-2.12-1.06a2.076 2.076 0 0 0 -1.88 0l-1.61.81a3.284 3.284 0 0 1 -2.9 0l-.76-.39a3.21 3.21 0 0 1 -1.79-2.89z" fill="#a1d51c"/><g><g fill="#f9e109"><circle cx="23" cy="37" r="1"/><circle cx="19" cy="36" r="1"/><circle cx="16" cy="38" r="1"/><circle cx="31" cy="38" r="1"/></g><circle cx="12" cy="37" fill="#fcbc04" r="1"/><circle cx="27" cy="36" fill="#f9e109" r="1"/></g><path d="m16.91 38.42a1 1 0 0 1 -1.91-.42 1.022 1.022 0 0 1 .44-.83h.01a8.693 8.693 0 0 0 1.46 1.25z" fill="#fcbc04"/></g></g></g></g></svg>,
        // 2:<svg id="Layer_1" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m155.55 133.21c-13.59-6.75-27.02-23.89-31.17-29.73 7.35.58 21.47 7.39 29.35 7.39 26.78 0 46.42-27.67 94.3-10.56l-17.25-74.02a12.514 12.514 0 0 1 24.35-5.78l16.17 65.07.03-.01c32.68-10.86 56.25 11.27 79.71 17.91 26.15 7.39 51.34-2.93 51.92-3.16-.42.59-16.27 22.53-36.89 32.53q-2.505 1.215-4.98 2.23a93.186 93.186 0 0 1 -48.26 6.05 69.827 69.827 0 0 1 33.31 75.65c-5.91-5.29-15.12-17.62-23.47-21.35-10.35-4.61-36.95-7.71-55.89-36.46-6.8.22-9.6 33.97-39.19 40.5-7.6 1.68-32.83.23-37.89 4.58 3.27-33.97 32.66-41.81 22.21-68.02-5.54 1.92-30.6 9.93-56.34-2.81-.01 0-.01-.01-.02-.01z" fill="#97c447"/><path d="m334.837 161.141c-2.773-.182-5.072-.457-6.787-.7a71.29 71.29 0 0 1 11.531 8.37 68.986 68.986 0 0 0 -4.744-7.67z" fill="#7c993c"/><path d="m168.95 130.181c26.78 0 46.42-27.67 94.3-10.56l-17.25-74.021a12.487 12.487 0 0 1 11.574-15.258l-2.444-9.832a12.514 12.514 0 0 0 -24.35 5.78l17.25 74.02c-47.88-17.11-67.52 10.56-94.3 10.56-7.88 0-22-6.81-29.35-7.39a136.823 136.823 0 0 0 17.171 19.585c7.686 1.389 20.165 7.116 27.399 7.116z" fill="#7c993c"/><path d="m361.3 135.59c66.03 33.37 110.67 97.15 110.67 170.35 0 107.73-96.69 195.06-215.97 195.06s-215.97-87.33-215.97-195.06c0-74.99 46.84-140.08 115.52-172.73.01 0 .01.01.02.01 25.74 12.74 50.8 4.73 56.34 2.81 10.45 26.21-18.94 34.05-22.21 68.02 5.06-4.35 30.29-2.9 37.89-4.58 29.59-6.53 32.39-40.28 39.19-40.5 18.94 28.75 45.54 31.85 55.89 36.46 8.35 3.73 17.56 16.06 23.47 21.35a69.827 69.827 0 0 0 -33.31-75.65 93.186 93.186 0 0 0 48.26-6.05z" fill="#f43b3b"/><path d="m337.9 429.125c-119.28 0-215.97-87.33-215.97-195.06a180.117 180.117 0 0 1 29.856-99.019c-66.619 33.213-111.756 97.282-111.756 170.894 0 107.73 96.69 195.06 215.97 195.06 79.261 0 148.533-38.568 186.1-96.052a233.309 233.309 0 0 1 -104.2 24.177z" fill="#d61d1d"/><g fill="#151515"><path d="m99.265 448.319c41.896 37.841 97.559 58.681 156.735 58.681s114.839-20.84 156.735-58.681c42.068-38 65.235-88.561 65.235-142.383 0-69.407-39.635-133.795-104.166-170.449 19.407-11.408 33.416-30.8 34.05-31.692a6 6 0 0 0 -7.2-9.024c-.235.1-23.824 9.768-47.982 2.935-6.38-1.805-12.952-4.93-19.91-8.239-16.307-7.754-34.608-16.457-57.132-11.323l-14.675-59.079a18.515 18.515 0 0 0 -36.019 8.591l14.889 63.875c-27.4-6.92-45.929.525-61.132 6.635-8.954 3.6-16.687 6.7-24.964 6.7-3.322 0-9.211-1.933-14.408-3.638-5.344-1.754-10.393-3.411-14.468-3.734a6 6 0 0 0 -5.366 9.456c2.208 3.106 11.97 16.361 23.991 25.623-67.778 36.105-109.447 101.649-109.447 173.363 0 53.823 23.169 104.389 65.234 142.383zm42.1-333.834c4.416 1.339 8.711 2.386 12.364 2.386 10.6 0 19.75-3.678 29.438-7.571 16.707-6.713 33.981-13.655 62.846-3.343a6 6 0 0 0 7.862-7.013l-17.245-73.979a6.516 6.516 0 0 1 12.679-3.009l21.867 88.021a6 6 0 0 0 11.646-2.894l-4.294-17.283c18.462-4.061 34.006 3.332 49.082 10.5 7.429 3.532 14.445 6.869 21.8 8.949 13.264 3.751 26.186 3.313 36.262 1.753-5.979 5.893-13.7 12.306-22.223 16.441a87.418 87.418 0 0 1 -49.777 7.741 6 6 0 0 0 -3.853 11.13 65.03 65.03 0 0 1 25.392 27.068 63.737 63.737 0 0 1 6.508 30.144c-5.089-5.417-10.7-10.946-16.6-13.576a84.352 84.352 0 0 0 -8.247-2.931c-12.327-3.951-30.957-9.922-45.08-31.351a6 6 0 0 0 -5.009-2.7c-.064 0-.129 0-.193 0-5.923.19-8.673 5.948-11.857 12.616-4.9 10.257-11.606 24.3-28.437 28.019-2.257.5-7.478.7-12.527.887-6.554.247-12 .508-16.42 1.079 2.552-9.1 7.253-15.914 11.834-22.555 7.458-10.812 15.171-21.991 8.3-39.213a6 6 0 0 0 -7.537-3.447c-8.246 2.858-29.793 8.332-51.715-2.523-5.683-2.804-11.649-7.949-16.866-13.346zm14.235 25.369c20.732 9.245 40.7 6.663 52.25 3.662 1.384 8.292-2.764 14.306-8.55 22.692-6.207 9-13.933 20.2-15.574 37.263a6 6 0 0 0 9.768 5.221c2.647-1.519 14.394-1.963 20.723-2.2 6.09-.231 11.349-.429 14.661-1.16 22.549-4.978 31.393-23.5 36.679-34.566.294-.616.615-1.288.943-1.962 15.726 19.718 34.84 25.845 46.705 29.648 2.857.916 5.326 1.708 7.024 2.465 4.624 2.06 10.458 8.356 15.147 13.415 2.424 2.616 4.713 5.087 6.765 6.923a6 6 0 0 0 9.865-3.2 76.893 76.893 0 0 0 -6.035-49.978 75.287 75.287 0 0 0 -14.63-20.23 98.856 98.856 0 0 0 28.958-6.025c65.229 33.689 105.67 96.4 105.67 164.114.001 104.25-94.192 189.064-209.969 189.064s-209.969-84.814-209.969-189.064c0-69.468 41.909-132.862 109.569-166.082z"/><path d="m136.053 432.46a6 6 0 1 0 8.943-8 190.363 190.363 0 0 1 -19.71-26.243 6 6 0 1 0 -10.187 6.34 202.3 202.3 0 0 0 20.954 27.903z"/><path d="m104.278 369.614a6 6 0 0 0 3.722-7.627 172.117 172.117 0 0 1 .463-113.432 6 6 0 1 0 -11.314-4 184.121 184.121 0 0 0 -.5 121.34 5.993 5.993 0 0 0 7.627 3.718z"/></g></svg>,
        // 3: <svg height="50" viewBox="0 0 512 512" width="45" xmlns="http://www.w3.org/2000/svg"><
        //     g id="filled_outline" data-name="filled outline"><rect fill="#5ebef7" height="80" rx="20" width="80" x="24" y="24"/><path d="m80 152h352v288h-352z" fill="#ea9d2d"/><path d="m44 24h424a20 20 0 0 1 20 20v76a0 0 0 0 1 0 0h-464a0 0 0 0 1 0 0v-76a20 20 0 0 1 20-20z" fill="#cbcbcb"/><g fill="#b9b9b9"><circle cx="256" cy="76" r="16"/><circle cx="176" cy="76" r="16"/><circle cx="336" cy="76" r="16"/><path d="m152 360h208v48h-208z"/></g><path d="m152 360h208v16h-208z" fill="#9e9e9e"/><path d="m162.016 344a64.027 64.027 0 0 1 61.984-48h64a64.027 64.027 0 0 1 61.984 48z" fill="#fbb540"/><rect fill="#b9b9b9" height="32" rx="16" width="240" x="136" y="328"/><path d="m80 400h352v16h-352z" fill="#c38325"/><path d="m260 272a8 8 0 0 1 -8-8c0-4.019-.982-5.574-2.764-8.4a30.014 30.014 0 0 1 0-33.876c1.783-2.822 2.764-4.376 2.764-8.394a8 8 0 0 1 16 0 28.632 28.632 0 0 1 -5.236 16.938c-1.783 2.822-2.764 4.376-2.764 8.394s.982 5.573 2.764 8.4a28.635 28.635 0 0 1 5.236 16.938 8 8 0 0 1 -8 8z" fill="#c38325"/><path d="m304 272a8 8 0 0 1 -8-8c0-4.019-.982-5.574-2.764-8.4a30.014 30.014 0 0 1 0-33.876c1.783-2.822 2.764-4.376 2.764-8.394a8 8 0 0 1 16 0 28.632 28.632 0 0 1 -5.236 16.938c-1.783 2.822-2.764 4.376-2.764 8.394s.982 5.573 2.764 8.4a28.635 28.635 0 0 1 5.236 16.938 8 8 0 0 1 -8 8z" fill="#c38325"/><path d="m216 272a8 8 0 0 1 -8-8c0-4.019-.982-5.574-2.764-8.4a30.014 30.014 0 0 1 0-33.876c1.783-2.822 2.764-4.376 2.764-8.394a8 8 0 0 1 16 0 28.632 28.632 0 0 1 -5.236 16.938c-1.783 2.822-2.764 4.376-2.764 8.394s.982 5.573 2.764 8.4a28.635 28.635 0 0 1 5.236 16.938 8 8 0 0 1 -8 8z" fill="#c38325"/><rect fill="#8f6934" height="32" rx="16" width="288" x="112" y="152"/><circle cx="256" cy="72" fill="#fbfdff" r="16"/><circle cx="176" cy="72" fill="#fbfdff" r="16"/><circle cx="336" cy="72" fill="#fbfdff" r="16"/><path d="m80 448h352a8 8 0 0 0 8-8v-288a8 8 0 0 0 -8-8h-352a8 8 0 0 0 -8 8v288a8 8 0 0 0 8 8zm48-288h256a8 8 0 0 1 0 16h-256a8 8 0 0 1 0-16zm-40 0h17.376a23.992 23.992 0 0 0 22.624 32h256a23.992 23.992 0 0 0 22.624-32h17.376v240h-56v-33.376a24 24 0 0 0 -8-46.624h-12.133a71.853 71.853 0 0 0 -59.867-32h-64a72.286 72.286 0 0 0 -59.872 32h-12.128a24 24 0 0 0 -8 46.624v33.376h-56zm64 192a8 8 0 0 1 0-16h208a8 8 0 0 1 0 16zm200 16v32h-192v-32zm-167.164-48a56.2 56.2 0 0 1 39.164-16h64a55.838 55.838 0 0 1 39.167 16zm-96.836 96h336v16h-336z"/><path d="m468 16h-424a28.032 28.032 0 0 0 -28 28v424a28.032 28.032 0 0 0 28 28h424a28.032 28.032 0 0 0 28-28v-424a28.032 28.032 0 0 0 -28-28zm12 452a12.013 12.013 0 0 1 -12 12h-424a12.013 12.013 0 0 1 -12-12v-340h448zm0-356h-448v-68a12.013 12.013 0 0 1 12-12h424a12.013 12.013 0 0 1 12 12z"/><path d="m256 48a24 24 0 1 0 24 24 24.027 24.027 0 0 0 -24-24zm0 32a8 8 0 1 1 8-8 8.009 8.009 0 0 1 -8 8z"/><path d="m176 48a24 24 0 1 0 24 24 24.027 24.027 0 0 0 -24-24zm0 32a8 8 0 1 1 8-8 8.009 8.009 0 0 1 -8 8z"/><path d="m336 48a24 24 0 1 0 24 24 24.027 24.027 0 0 0 -24-24zm0 32a8 8 0 1 1 8-8 8.009 8.009 0 0 1 -8 8z"/><path d="m252 264a8 8 0 0 0 16 0 28.635 28.635 0 0 0 -5.236-16.939c-1.782-2.822-2.764-4.377-2.764-8.4s.981-5.572 2.764-8.394a28.632 28.632 0 0 0 5.236-16.933 8 8 0 0 0 -16 0c0 4.018-.981 5.572-2.764 8.394a30.014 30.014 0 0 0 0 33.876c1.782 2.822 2.764 4.377 2.764 8.396z"/><path d="m296 264a8 8 0 0 0 16 0 28.635 28.635 0 0 0 -5.236-16.939c-1.782-2.822-2.764-4.377-2.764-8.4s.981-5.572 2.764-8.394a28.632 28.632 0 0 0 5.236-16.933 8 8 0 0 0 -16 0c0 4.018-.981 5.572-2.764 8.394a30.014 30.014 0 0 0 0 33.876c1.782 2.822 2.764 4.377 2.764 8.396z"/><path d="m208 264a8 8 0 0 0 16 0 28.635 28.635 0 0 0 -5.236-16.939c-1.782-2.822-2.764-4.377-2.764-8.4s.981-5.572 2.764-8.394a28.632 28.632 0 0 0 5.236-16.933 8 8 0 0 0 -16 0c0 4.018-.981 5.572-2.764 8.394a30.014 30.014 0 0 0 0 33.876c1.782 2.822 2.764 4.377 2.764 8.396z"/></g></svg>
   1: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 2.01L6 2c-1.1 0-2 .89-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.11-.9-1.99-2-1.99zM18 20H6v-9.02h12V20zm0-11H6V4h12v5zM8 5h2v3H8zm0 7h2v5H8z"/></svg>
        ,
        2: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-egg"
                viewBox="0 0 16 16">
            <path
                d="M8 15a5 5 0 0 1-5-5c0-1.956.69-4.286 1.742-6.12.524-.913 1.112-1.658 1.704-2.164C7.044 1.206 7.572 1 8 1c.428 0 .956.206 1.554.716.592.506 1.18 1.251 1.704 2.164C12.31 5.714 13 8.044 13 10a5 5 0 0 1-5 5zm0 1a6 6 0 0 0 6-6c0-4.314-3-10-6-10S2 5.686 2 10a6 6 0 0 0 6 6z"/>
        </svg>
        ,
        3: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                className="bi bi-egg-fried" viewBox="0 0 16 16">
            <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            <path
                d="M13.997 5.17a5 5 0 0 0-8.101-4.09A5 5 0 0 0 1.28 9.342a5 5 0 0 0 8.336 5.109 3.5 3.5 0 0 0 5.201-4.065 3.001 3.001 0 0 0-.822-5.216zm-1-.034a1 1 0 0 0 .668.977 2.001 2.001 0 0 1 .547 3.478 1 1 0 0 0-.341 1.113 2.5 2.5 0 0 1-3.715 2.905 1 1 0 0 0-1.262.152 4 4 0 0 1-6.67-4.087 1 1 0 0 0-.2-1 4 4 0 0 1 3.693-6.61 1 1 0 0 0 .8-.2 4 4 0 0 1 6.48 3.273z"/>
        </svg>


    };


    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node
};



const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22
    },
    active: {
        "& $line": {
            backgroundImage:
                "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
        }
    },
    completed: {
        "& $line": {
            backgroundImage:
                "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
        }
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: "#ccc",
        borderRadius: 1
    }
})(StepConnector);

export default function AddRecipeMain() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const history = useHistory();

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <div className={classes.backgroundImg}>
            <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h1" align="center" >
                            <p className={classes.font}> Add Recipe </p>
                        </Typography>

                        <Stepper
                            className={classes.stepper}
                            alternativeLabel
                            activeStep={activeStep}
                            connector={<ColorlibConnector />}
                        >
                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                                        {label}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <React.Fragment>
                            {activeStep === steps.length ? (
                                //final page
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom align="center">
                                        Thank you for adding a recipe.
                                    </Typography>

                                    <div className={classes.emptyDiv}> </div>
                                    <div className={classes.finalPage}>
                                    <Typography variant="subtitle1">
                                        <h3>   </h3>

                                        <h3>  Want to add a story to your recipe? </h3>
                                        <div className={classes.buttons}>
                                            <Button onClick={()=>history.push("/addstory")} className={classes.button}>
                                                Add Story
                                            </Button>
                                            <Button onClick={handleBack} className={classes.button}>
                                                Back Home
                                            </Button>
                                        </div>
                                    </Typography>
                                    </div>
                              </React.Fragment>


                            )
                                : (
                                <React.Fragment>
                                    {getStepContent(activeStep)}
                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                            <Button
                                                pading="5"
                                                onClick={handleBack}
                                                className={classes.button}
                                            >
                                                Back
                                            </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? "Add recipe" : "Next"}
                                        </Button>
                                    </div>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    </Paper>
                    <Copyright />
                </main>
            </React.Fragment>
        </div>
    );
}
