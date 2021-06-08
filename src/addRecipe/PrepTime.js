import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {tempRecipe} from "./addRecipeMain";
import Grid from "@material-ui/core/Grid";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 360,
    },

}));
export default function PrepTime() {
    const classes = useStyles();
    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label"
                >Prep time:
                </InputLabel>
                <Select
                    defaultValue=""
                    onChange={(e) => {
                        tempRecipe.setPrepTime(e.target.value)
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    fullWidth>
                    <MenuItem value={"30 min or less"}>30 min or less</MenuItem>
                    <MenuItem value={"1h"}>1h</MenuItem>
                    <MenuItem value={"2h"}>2h</MenuItem>
                    <MenuItem value={"3h"}>3h or more</MenuItem>
                </Select>
            </FormControl>

        </div>
    );
}