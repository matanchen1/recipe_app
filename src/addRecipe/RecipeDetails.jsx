import React, {useRef, useState} from 'react';
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

export default function RecipeDetails() {
    const classes = useStyles();

    const recipeNameRef = useRef("");
    const servingsRef = useRef("");
    const notesRef = useRef("");
    const tagsRef = useRef("");
    const authorRef = useRef("");
    // const [prepTime, setPrepTime] = useState("");

    // const handleSelectLabelChange = (event) => {
    //     tempRecipe.setPrepTime(event.target.value);
    // };


    return (
        <React.Fragment>
            <div className={classes.body}>
                <Typography variant="h6" gutterBottom>
                    Recipe's details
                </Typography>
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                className={classes.textField}
                                required
                                color="secondary"
                                id="recipeName"
                                name="RecipeName"
                                label="Recipe name"
                                defaultValue= {recipeNameRef.current.value}
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
                                defaultValue= {authorRef.current.value}
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
                                defaultValue= {tagsRef.current.value}
                                inputRef={tagsRef}
                                onChange={(e) => {
                                    tempRecipe.setTags(tagsRef.current.value);
                                }}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="servings"
                                name="serv"
                                type="number"
                                label="Servings:"
                                fullWidth
                                color="secondary"
                                defaultValue= {servingsRef.current.value}
                                inputRef={servingsRef.current.value}
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
                                label="Notes"
                                fullWidth
                                defaultValue= {notesRef.current.value}
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
    );
}
