import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import MediaCard from "./mediaCard";
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import {tempRecipe} from "../addRecipe/addRecipeMain";

const useStyles = makeStyles((theme) => ({
    root: {
        zoom: "100%",
        justifyContent: 'space-around',
        overflow: 'hidden',
        background: "none",
    },
    gridList: {
        width: "auto",
        height: "auto"
    }
}));


const TitleBarGridList = (props) => {
    useEffect(() => {
        console.log(props.Recipes);
    }, [props.Recipes]);
    /**@returns {number} of columns to display*/
    const getGridListCols = () => {
        if (isWidthUp('md', props.width)) {
            return 3;
        }
        return 2;
    }
    const classes = useStyles();
    if (props.Recipes.length === 0)
        return (
            <h1>
                Empty for now. add a recipe!
            </h1>
        )
    else {
        console.log("not empty")
        return (
            <div className={classes.root}>
                <h1>
                    not empty!
                </h1>
                <GridList spacing={70} cellWidth={getGridListCols() * 100} cellHeight={"auto"}
                          cols={getGridListCols()}>
                    {props.Recipes.map((tile) => (
                        <div>
                        <GridListTile>
                            <MediaCard
                                author={tile.getAuthor()}
                                img='https://ifoodreal.com/wp-content/uploads/2018/12/FG-healthy-spinach-salad-recipe.jpg'
                                title={tile.getName()}
                            />
                        </GridListTile>
                        </div>
                    ))}


                    {/*{alldishes.map((tile) => (*/}
                    {/*    <div>*/}
                    {/*    <GridListTile>*/}
                    {/*        <MediaCard*/}
                    {/*            author={tile.getAuthor()}*/}
                    {/*            img='https://ifoodreal.com/wp-content/uploads/2018/12/FG-healthy-spinach-salad-recipe.jpg'*/}
                    {/*            title={tile.getName()}*/}
                    {/*        />*/}
                    {/*    </GridListTile>*/}
                    {/*    </div>*/}
                    {/*))}*/}


                </GridList>
            </div>
        );
    }
}
export default TitleBarGridList;
