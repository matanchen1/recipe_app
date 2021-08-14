import React, {useState} from "react";
import { Alert} from "react-bootstrap";
import "./ShowRecipe.css";
import {useAuth} from "../contexts/AuthContext";

import {Header, Recipe, useStyles} from "./ShowRecipe"


export default function ViewOnlyRecipe() {
    const [recipeDetails, setRecipeDetails] = useState(null);
    const {viewOnly} = useAuth();
    const classes = useStyles();


    function GetRecipe() {
        setRecipeDetails(viewOnly);
        if (recipeDetails) {
            return (
                <div className={classes.container}>
                    <Header recipe={recipeDetails}/>
                    <Recipe recipe={recipeDetails}/>
                </div>);
        } else {
            return (<Alert variant="danger">Error: recipe does not exist!</Alert>);
        }
    }

    return (
        <div className={classes.outer_div}>
            <GetRecipe/>
        </div>
    );
}