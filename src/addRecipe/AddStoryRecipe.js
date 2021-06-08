import React, {forwardRef, useImperativeHandle, useState} from 'react'
import {tempRecipe} from "./addRecipeMain";
import {makeStyles} from "@material-ui/core/styles";
import StoryDropImage from "./StoryDropImage";
import {Form} from "react-bootstrap";

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

    useImperativeHandle(ref, () => ({
            ValidBeforeNext() {
                if (tempRecipe.story.content === "") {
                    return window.confirm("are you sure you dont want to add story to your recipe?");
                }
                return true;
            }
        }
    ))


    const [value, setValue] = useState("");
    return (
        <React.Fragment>
            <h2>Add a Story</h2>
            <Form>
                <Form.Group id="story">
                    <Form.Label>Tell the story behind this recipe:</Form.Label>
                    <Form.Control
                        value={value}
                        onChange={(e => {
                            setValue(e.target.value)
                            tempRecipe.setStoryContent(e.target.value)
                        })}
                        as="textarea"
                        rows={3}
                        placeholder="What do you remember about this recipe? When did you first try it? Who taught you how to make it? Why do you love it?"
                    />
                </Form.Group>
                <Form.Group id="photo">
                    <Form.Label>Add Photo</Form.Label>
                <StoryDropImage/>
                </Form.Group>
            </Form>
        </React.Fragment>

    )
})
export default AddStoryRecipe;