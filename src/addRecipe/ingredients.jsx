import React, {createRef, forwardRef, useImperativeHandle} from 'react';
import Typography from '@material-ui/core/Typography';

import List from "./List";
import {makeStyles} from "@material-ui/core/styles";
import {tempRecipe} from "./addRecipeMain";
const useStyles = makeStyles(theme => ({
    body: {
        padding: theme.spacing(2),
        minHeight: "47vh",
    }
}));
const Ingredients =  forwardRef((props, ref) => {

    const formHtmlRef = createRef();
    const submitRef = createRef();


    useImperativeHandle(ref, () => ({

            ValidBeforeNext(test) {
                if(test === "test") return true;
                if(!formHtmlRef.current.checkValidity()) submitRef.current.click();
                console.log("valid? ", formHtmlRef.current.checkValidity());

                return formHtmlRef.current.checkValidity();

            }
        }
    ))


    const classes = useStyles();
    return (
        <form ref={formHtmlRef} >
            <React.Fragment>
                <input type="submit" value="" hidden={true} ref={submitRef} onSubmit={(e)=>{
                    e.preventDefault()
                }} />
                <Typography variant="h6" gutterBottom background="#007F80">
                    Ingredients List
                </Typography>
                <div className={classes.body}>
                    <List> </List>
                </div>
            </React.Fragment>
        </form>

    );
})

export default Ingredients;