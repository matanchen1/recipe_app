import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {tempRecipe} from "./addRecipeMain";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {categoryOption} from "./Recipe";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 360,
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

const category_option = categoryOption;


export default function Category() {
    const classes = useStyles();
    return (
        <div>
            <FormControl required className={classes.formControl}>

                <InputLabel>Category</InputLabel>
                <Select

                    defaultValue="Other"
                    onChange={(e) => {
                        tempRecipe.setCategory(e.target.value)
                    }}
                    MenuProps={MenuProps}
                >
                    {category_option.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

        </div>)
}
