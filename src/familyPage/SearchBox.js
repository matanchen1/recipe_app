import React from "react";
import {TextField} from "@material-ui/core";


export default function SearchBox(props) {
    return (
        <div className="pa4 black-80">
            <TextField
                margin="normal"
                type='Search'
                variant="outlined"
                label='Search Recipe'
                helperText='by name or by author'
                onChange={props.searchChange}
            />
        </div>
    );
}
