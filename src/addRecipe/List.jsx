import React, {useEffect, useState} from "react";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import {IconButton, makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {tempRecipe} from "./addRecipeMain";

const useStyles = makeStyles(theme => ({
        margin: {
            margin: theme.spacing(1),
        },


        font: {
            color: 'rgba(213,195,38,0.9)',
        },
        buttons: {
            color: "white",
            padding: "0 30px",
        },
        button: {
            background:
                "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
            marginTop: theme.spacing(1),
            marginLeft: theme.spacing(1)
        },
        input: {
            "&:invalid": {
                border: "red solid 2px"
            }

        },
        layout: {
            display: "flex",
            flexDirection: "column",
        },
        root: {
            flexGrow: 1,
        },
        inputRoot: {
            fontSize: 25
        },
        labelRoot: {
            fontSize: 25,
            "&$labelFocused": {}
        },
        labelFocused: {},


    }
));

function List(props) {
    const tempRecipe = props.tempRecipe;
    const [inputList, setInputList] = useState(tempRecipe.getIngredientsList());
    // handle click event of the Add button

    const handleAddClick = () => {
        setInputList([...inputList, {ingredient: "", amount: "", typeAmount: ""}]);
    };

    useEffect(() => {
        const listener = event => {
            if ((event.code === "Enter" || event.code === "NumpadEnter")) {
                handleAddClick();
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [inputList]);

    // handle input change
    const handleInputChange = (e, index) => {
        const {name, value} = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
        tempRecipe.setIngredientsList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
        tempRecipe.setIngredientsList(list);

    };


    const classes = useStyles();


    return (
        <div className={classes.root}>
            {inputList.map((x, i) => {
                return (
                    <div>
                        <Grid container spacing={3} id={i + "grid"}>
                            <Grid item xs={3} sm={2}>
                                <TextField
                                    // InputLabelProps={{
                                    // }}
                                    required
                                    InputProps={{classes: {root: classes.inputRoot}}}
                                    InputLabelProps={{
                                        shrink: true,
                                        classes: {
                                            root: classes.labelRoot,
                                            focused: classes.labelFocused
                                        }
                                    }}

                                    fullWidth
                                    name="ingredient"
                                    color="secondary"
                                    label="Ingredient"
                                    value={x["ingredient"]}
                                    onChange={e => handleInputChange(e, i)}
                                />
                            </Grid>
                            <Grid item xs={4} sm={2}>
                                <TextField
                                    color="secondary"
                                    fullWidth
                                    name="amount"
                                    inputProps={{min: 0, step: (1 / 10)}}
                                    InputProps={{classes: {root: classes.inputRoot}}}
                                    InputLabelProps={{
                                        shrink: true,
                                        classes: {
                                            root: classes.labelRoot,
                                            focused: classes.labelFocused
                                        }
                                    }}
                                    label="Amount"
                                    value={x.amount}
                                    onChange={e => {
                                        const regex = /^[0-9]+[/. ]?[0-9]*[/. ]?[0-9]*$/
                                        if (e.target.value === '' || regex.test(e.target.value)) {
                                            handleInputChange(e, i)
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} sm={3}>
                                <TextField

                                    color="secondary"
                                    fullWidth
                                    name="typeAmount"
                                    InputProps={{classes: {root: classes.inputRoot}}}
                                    InputLabelProps={{
                                        shrink: true,
                                        classes: {
                                            root: classes.labelRoot,
                                            focused: classes.labelFocused
                                        }
                                    }}
                                    label="Unit"
                                    value={x.typeAmount}
                                    onChange={e => handleInputChange(e, i)}
                                />
                            </Grid>
                            <div className={classes.buttons}>
                                {inputList.length - 1 === i &&
                                <Button className={classes.button}
                                        startIcon={<AddCircleIcon/>}
                                        onClick={handleAddClick}> </Button>}
                                {inputList.length !== 1 &&
                                <Button
                                    startIcon={<DeleteIcon/>}
                                    className={classes.button}
                                    onClick={() => handleRemoveClick(i)}>
                                </Button>}

                            </div>

                        </Grid>


                    </div>
                );
            })}
            {/*<IconButton aria-label="delete" className={classes.margin}>*/}
            {/*    <DeleteIcon />*/}
            {/*</IconButton>
            {/*<div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>*/}
        </div>
    );
}

export default List;
