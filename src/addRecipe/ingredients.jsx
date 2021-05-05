import React from 'react';
import Typography from '@material-ui/core/Typography';

import List from "./List";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
    body: {
        padding: theme.spacing(2),
        minHeight: "47vh",
    }
}));
export default function Ingredients() {
    const classes = useStyles();
    return (
        <div >

            <React.Fragment>
                <Typography variant="h6" gutterBottom background="#007F80">
                    Ingredients List
                </Typography>
                <div className={classes.body}>
                    <List> </List>
                </div>
            </React.Fragment>
        </div>

    );
}
