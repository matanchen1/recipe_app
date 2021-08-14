import {InputAdornment} from "@material-ui/core";
import React, {useRef} from "react";
import TextField from "@material-ui/core/TextField";
import AccessTimeIcon from '@material-ui/icons/AccessTime';

// const useStyles = makeStyles(theme => ({ #TODO: remove this?
//     formControl: {
//         margin: theme.spacing(1),
//         minWidth: 360,
//     },
//
// }));
export default function PrepTime(props) {
    const prepTimeRef = useRef();
    // const classes = useStyles(); #TODO: remove this?
    const tempRecipe = props.tempRecipe
    return (
        <div>
            <TextField
                id="prepTime"
                variant="outlined"
                color="secondary"
                name="prepTime"
                label="Prep. Time"
                fullWidth
                defaultValue={tempRecipe.prepTime}
                inputRef={prepTimeRef}
                onChange={(e) => {
                    tempRecipe.setPrepTime(prepTimeRef.current.value);
                }}
                InputProps={{
                    startAdornment: (
                        <>
                            <InputAdornment position="start">
                                <AccessTimeIcon/>
                            </InputAdornment>
                        </>
                    ),
                }}

            />
        </div>
    );
}