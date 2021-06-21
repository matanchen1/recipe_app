import React, {createRef, forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from "@material-ui/core/styles";
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
    const servingsRef = useRef(0);
    const notesRef = useRef("");
    const tagsRef = useRef("");
    const authorRef = useRef("");
    const formHtmlRef = createRef();
    const submitRef = createRef();
    const tempRecipe = props.tempRecipe;
    const editMode = props.editMode;
    // const [prepTime, setPrepTime] = useState("");
    useImperativeHandle(ref, () => ({
            ValidBeforeNext(test) {
                if (test === "test") return true;
                if (!formHtmlRef.current.checkValidity()) submitRef.current.click();
                console.log("valid? ", formHtmlRef.current.checkValidity());
                setSubmitFlag(true);
                if (!formHtmlRef || !formHtmlRef.current) return false;
                else return (formHtmlRef.current.checkValidity()) ;
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
                        {editMode ? "Edit your Recipe" : "Add Recipe"}
                    </Typography></b>
                    <div>
                        <br/>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={submitFLag && recipeNameRef.current.value === ""}
                                    className={classes.textField}
                                    required
                                    color="secondary"
                                    id="recipeName"
                                    name="RecipeName"
                                    label="Recipe title"
                                    defaultValue={tempRecipe.name || ""}
                                    inputRef={recipeNameRef}
                                    fullWidth
                                    autoComplete="given-name"
                                    onChange={(e) => {
                                        tempRecipe.setName(recipeNameRef.current.value);
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Category tempRecipe={tempRecipe}/>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    // className={classes.textField}
                                    required
                                    id="author"
                                    color="secondary"
                                    name="author"
                                    label="Who's the chef?"
                                    fullWidth
                                    defaultValue={tempRecipe.author}
                                    inputRef={authorRef}
                                    onChange={(e) => {
                                        tempRecipe.setAuthor(authorRef.current.value);
                                    }}/>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <PrepTime tempRecipe={tempRecipe}/>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="tags"
                                    color="secondary"
                                    name="tags"
                                    label="Add tag, separated by commas"
                                    fullWidth
                                    defaultValue={tempRecipe.tags}
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
                                    inputProps={{ min: 0,step:0.5}}
                                    label="Servings"
                                    fullWidth
                                    color="secondary"
                                    defaultValue={tempRecipe.getServing()|| ""}
                                    inputRef={servingsRef}
                                    onChange={(e) => {
                                        tempRecipe.setServing(servingsRef.current.value);
                                    }}

                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    color="secondary"
                                    id="notes"
                                    name="Notes"
                                    label="Anything we need to know about making this recipe?"
                                    fullWidth
                                    defaultValue={tempRecipe.notes || ""}
                                    inputRef={notesRef}
                                    onChange={(e) => {
                                        tempRecipe.setNotes(notesRef.current.value);
                                    }}
                                />
                            </Grid>


                            <Grid item xs={12} sm={6}>
                                <FilterSelect tempRecipe={tempRecipe}/>

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <UploadImage  tempRecipe={tempRecipe} editMode={editMode}/>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </React.Fragment>

        </form>
    );
})
export default RecipeDetails;