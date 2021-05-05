import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {Form} from "react-bootstrap";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    body: {
        minHeight: "50vh"
    },

}));

export default function RecepieDetails() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.body}>
            <Typography variant="h6" gutterBottom >
                Recipe's details
            </Typography>
            <div>
                <Grid container spacing={3}>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            color="secondary"
                            id="RecipeName"
                            name="RecipeName"
                            label="Recipe name"
                            fullWidth
                            autoComplete="given-name"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="Ingredients"
                            name="serv"
                            type="number"
                            label="Servings:"
                            fullWidth
                            color="secondary"

                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            color="secondary"
                            id="comments"
                            name="Notes"
                            label="Notes"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="tags"
                            color="secondary"
                            name="tags"
                            label="Add tage, separated by commas"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Form>
                            <Form.Group controlId="Author:  ">
                                <Form.Label>Author  </Form.Label>
                                <Form.Control as="select">
                                    <option>Grandmother</option>
                                    <option>Grandfather</option>
                                    <option>Mom</option>
                                    <option>Other</option>
                                </Form.Control>
                            </Form.Group> </Form>
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <Form>
                            <Form.Group controlId="form.prep_time">
                                <Form.Label>preparation time</Form.Label>
                                <Form.Control as="select">
                                    <option> less then 30 min</option>
                                    <option>1h</option>
                                    <option>2h</option>
                                    <option>3h</option>
                                    <option>4h</option>
                                    <option>5h or more</option>
                                </Form.Control>
                            </Form.Group> </Form>
                    </Grid>


                    <Grid item xs={12} sm={4} >

                    </Grid>
                    <Grid item xs={12} sm={6} >

                        <Typography variant="h6" gutterBottom>
                            Add Image (optional)
                        </Typography>
                        <Form>
                            <Form.Group>
                                <Form.File id="Add_Image" label="Upload Image" />
                            </Form.Group>
                        </Form>
                    </Grid>
                </Grid>
            </div>
            </div>
        </React.Fragment>
    );
}
