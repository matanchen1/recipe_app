import React, {useEffect, useRef} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import {tempRecipe} from "./addRecipeMain";
import {Button} from "@material-ui/core";
import {filterOptions} from "./Recipe";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 350,
        maxWidth: 400,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        background:
            "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1)
    },

    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const filter_options = filterOptions;

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


export default function FilterSelect() {
    const [filterListState, setFilterListState] = React.useState([]);
    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        console.log(filterListState);
        tempRecipe.setAnotherFilter(filterListState)

    }, [filterListState]);


    const handleChange = (event) => {
        setFilterListState(event.target.value);
    };


    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Tags</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    fullWidth
                    defaultValue={filterListState}
                    value={filterListState}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip"/>}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} className={classes.chip}/>
                            ))}
                        </div>

                    )
                    }
                    MenuProps={MenuProps}
                >
                    {filter_options.map((name) => (
                        <MenuItem key={name} value={name} style={getStyles(name, filterListState, theme)}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>


        </div>
    );
}