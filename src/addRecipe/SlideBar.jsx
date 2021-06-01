import Typography from "@material-ui/core/Typography";
import {makeStyles, Slider} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, {useRef} from "react";
import TextField from "@material-ui/core/TextField";
import {tempRecipe} from "./addRecipeMain";

const useStyles = makeStyles(theme => ({}));
export default function SlideBar() {
    const classes = useStyles()
    const marks = [
        {
            value: 100,
            label: 'None',
        },
        {
            value: 125,
            label: '125°C',
        },
        {
            value: 150,
            label: '150°C',
        },
        {
            value: 175,
            label: '175°C',
        },
        {
            value: 200,
            label: '200°C',
        }, {
            value: 225,
            label: '225°C',
        },
        {
            value: 250,
            label: '250°C',
        },
    ];

    function valuetext(value) {
        return `${value}°C`;
    }

    return (
        <div>
            <Typography id="discrete-slider-custom" gutterBottom>
                Oven heat
            </Typography>
            <Slider
                defaultValue={100}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-custom"
                step={25}
                min={100}
                max={250}
                valueLabelDisplay="auto"
                marks={marks}
                onChangeCommitted={(event, val) => {
                    tempRecipe.setOvenHeat(`${val}°C`);
                    console.log(val);
                    console.log(`${val}°C`);

                }}

                // orientation="vertical"

            />
            {/*<div className={classes.b}>*/}
            {/*    /!*    empty grid    *!/*/}
            {/*</div>*/}
        </div>
    )
        ;
}
