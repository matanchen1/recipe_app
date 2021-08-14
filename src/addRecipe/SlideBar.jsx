import {Slider} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function SlideBar(props) {

    const tempRecipe = props.tempRecipe;

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

    const [value, setValue] = useState(getInitValue());

    const [disable, setDisable] = useState((tempRecipe === ""));

    useEffect(() => {
        tempRecipe.setOvenHeat(value);
    }, [value])

    function getInitValue() {
        if (!tempRecipe.ovenHeat || tempRecipe.ovenHeat === "None" || tempRecipe.ovenHeat === "") {
            return Number(100);
        } else {
            return Number(tempRecipe.ovenHeat);
        }
    }


    const handleChange = () => {
        setDisable(!disable);
    }
    console.log("tempRecipe.OvenHeat", tempRecipe.OvenHeat)

    return (
        <div>
            <FormControlLabel
                control={<Checkbox size="small" checked={!disable} onChange={handleChange} name="checkedA"/>}
                label="Oven Heat"
            />
            <Slider
                key={`slider-${1}`}
                disabled={disable}
                defaultValue={value}
                getAriaValueText={valuetext}
                value={tempRecipe.OvenHeat}
                aria-labelledby="discrete-slider-custom"
                step={25}
                min={100}
                max={250}
                valueLabelDisplay="auto"
                marks={marks}
                onChangeCommitted={(event, val) => {
                    setValue(val)
                }}

            />
        </div>
    )
        ;
}
