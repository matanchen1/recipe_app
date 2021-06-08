import React, {useState} from "react";
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
        layout:{
            display: "flex",
            flexDirection: "column",
        },
        root: {
            flexGrow: 1,
        },


    }
));

function List() {
    const [inputList, setInputList] = useState([{ingredient: "", amount: "", typeAmount: ""}]);

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

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, {ingredient: "", amount: "", typeAmount:""}]);
    };


    const classes = useStyles();


    return (
        <div className={classes.root}>
            {inputList.map((x, i) => {
                return (
                    <div>
                        <Grid container spacing={3} id={i+"grid"}>
                            <Grid item xs={3} sm={2} >
                                <TextField
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                    fullWidth
                                    name="ingredient"
                                    color="secondary"
                                    label="ingredient"
                                    value={x["ingredient"]}
                                    onChange={e => handleInputChange(e, i)}
                                />
                            </Grid>
                            <Grid item xs={4} sm={2}>
                                <TextField
                                    required
                                    type="number"
                                    color="secondary"
                                    fullWidth
                                    name="amount"
                                    inputProps={{ min: 0,step:(1/10)}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="amount"
                                    value={x.amount}
                                    onChange={e => handleInputChange(e, i)}
                                />
                            </Grid>
                            <Grid item xs={4} sm={3}>
                                <TextField
                                    required
                                    color="secondary"
                                    fullWidth
                                    name="typeAmount"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="type amount"
                                    value={x.typeAmount}
                                    onChange={e => handleInputChange(e, i)}
                                />
                            </Grid>
                            <div className={classes.buttons}>
                                {inputList.length !== 1 &&
                                <Button
                                    startIcon={<DeleteIcon/>}
                                    className={classes.button}
                                    onClick={() => handleRemoveClick(i)}>
                                </Button>}
                                {inputList.length - 1 === i &&
                                <Button className={classes.button}
                                        startIcon={<AddCircleIcon/>}
                                        onClick={handleAddClick}> </Button>}
                                }
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
