import React, {createRef, forwardRef, useImperativeHandle, useRef, useState} from 'react'
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {tempRecipe} from "./addRecipeMain";
import {makeStyles} from "@material-ui/core/styles";
import {TextareaAutosize} from "@material-ui/core";
import {Card, Col, Form} from "react-bootstrap";
import StoryDropImage from "./StoryDropImage";

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
const AddStoryRecipe = forwardRef((props, ref) => {
    const classes = useStyles();
    const tempRecipe = props.tempRecipe;
    useImperativeHandle(ref, () => ({
            ValidBeforeNext(text) {
                if (text === "test") return true
                if (tempRecipe.story.content === "") {
                    return window.confirm("are you sure you dont want to add story to your recipe?");
                }
                return ref1.current.validFilesSave();
            }
        }
    ))
    let ref1 = useRef(null);


    const [value, setValue] = useState(tempRecipe.getStoryContent() || "");
    return (
        <React.Fragment>
            <b><Typography className={classes.textField} variant="h4" gutterBottom>
                Make a Memory
                <h5>Tell the story behind this recipe</h5>
            </Typography></b>
            <Form>
                <Form.Group id="story">

                    <Form.Control
                        onChange={(e => {
                            setValue(e.target.value)
                            tempRecipe.setStoryContent(e.target.value)
                        })}
                        defaultValue={value}
                        as="textarea"
                        rows={3}
                        placeholder="What do you remember about this recipe? When did you first try it? Who taught you how to make it? Why do you love it?"
                    />
                </Form.Group>
                <Form.Group id="photo">
                    <br/>
                    {/*<Form.Label>Add Photo/s</Form.Label>*/}
                    <StoryDropImage ref={ref1} tempRecipe={tempRecipe}/>
                </Form.Group>
            </Form>
        </React.Fragment>

    )
})
export default AddStoryRecipe;