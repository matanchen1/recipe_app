import React, {createRef, forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from "@material-ui/core/styles";
import {tempRecipe} from "./addRecipeMain";
// import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import UploadImage from "./UploadImage";
import Category from "./Category";
import PrepTime from "./PrepTime";
import FilterSelect from "./FilterSelect";

const useStyles = makeStyles(theme => ({
    body: {
        minHeight: "50vh"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 360,
    },
    textField: {
        marginBottom: "10px",
        textAlign: 'center'

    },

}));

const RecipeDetails = forwardRef((props, ref) => {
    const classes = useStyles();
    const [submitFLag, setSubmitFlag] = useState(false);
    const [servingFlag, setServingFlag] = useState(true);
    const recipeNameRef = useRef("");
    const servingsRef = useRef("");
    const notesRef = useRef("");
    const tagsRef = useRef("");
    const authorRef = useRef("");
    const formHtmlRef = createRef();
    const submitRef = createRef();

    // const [prepTime, setPrepTime] = useState("");

    useImperativeHandle(ref, () => ({

            ValidBeforeNext(test) {
                if (test === "test") return true;
                if (!formHtmlRef.current.checkValidity()) submitRef.current.click();
                console.log("valid? ", formHtmlRef.current.checkValidity());
                setSubmitFlag(true);
                return formHtmlRef.current.checkValidity() ;

            }
        }
    ))


    return (
        <form ref={formHtmlRef} onSubmit={(e) => {
            e.preventDefault()
        }
        }>
            <React.Fragment>
                <input type="submit" value="" hidden={true} ref={submitRef} onSubmit={(e) => {
                    e.preventDefault()
                }}/>

                <div className={classes.body}>
                    <b><Typography className={classes.textField} variant="h4" gutterBottom>
                        Add a New Recipe
                    </Typography></b>
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={submitFLag && recipeNameRef.current.value === ""}
                                    className={classes.textField}
                                    required
                                    color="secondary"
                                    id="recipeName"
                                    name="RecipeName"
                                    label="Recipe name"
                                    defaultValue={recipeNameRef.current.value}
                                    inputRef={recipeNameRef}
                                    fullWidth
                                    autoComplete="given-name"
                                    onChange={(e) => {
                                        tempRecipe.setName(recipeNameRef.current.value);
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Category/>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    // className={classes.textField}
                                    required
                                    id="author"
                                    color="secondary"
                                    name="author"
                                    label="Author"
                                    fullWidth
                                    defaultValue={tempRecipe.author}
                                    inputRef={authorRef}
                                    onChange={(e) => {
                                        tempRecipe.setAuthor(authorRef.current.value);
                                    }}/>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <PrepTime/>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="tags"
                                    color="secondary"
                                    name="tags"
                                    label="Add tag, separated by commas"
                                    fullWidth
                                    defaultValue={tagsRef.current.value}
                                    inputRef={tagsRef}
                                    onChange={(e) => {
                                        tempRecipe.setTags(tagsRef.current.value);
                                    }}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="servings"
                                    name="serv"
                                    type="number"
                                    inputProps={{ min: 1,step:0.5}}
                                    label="Servings:"
                                    fullWidth
                                    color="secondary"
                                    defaultValue={tempRecipe.serving}
                                    helperText={(!servingFlag ) ? "serving must be > 0" : ""}
                                    inputRef={servingsRef.current.value}
                                    onChange={(e) => {
                                        tempRecipe.setServing(""+servingsRef.current.value);
                                        console.log(tempRecipe.serving)
                                    }}

                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    color="secondary"
                                    id="notes"
                                    name="Notes"
                                    label="Notes"
                                    fullWidth
                                    defaultValue={notesRef.current.value}
                                    inputRef={notesRef}
                                    onChange={(e) => {
                                        tempRecipe.setNotes(notesRef.current.value);
                                    }}
                                />
                            </Grid>


                            <Grid item xs={12} sm={6}>
                                <FilterSelect/>
                                {/*    empty Grid */}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <UploadImage/>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </React.Fragment>

        </form>
    );
})
export default RecipeDetails;