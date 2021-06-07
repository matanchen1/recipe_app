import {makeStyles} from "@material-ui/core/styles";
import {useAuth} from "../contexts/AuthContext";
import React, {useEffect, useState} from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import MediaCard from "./mediaCard";
import {isWidthUp} from "@material-ui/core/withWidth";
import CheckBox2 from "./CheckBox2";
import {AllFiltersOption, categoryOption, dietOption} from "../addRecipe/Recipe";
import "./familyPage.css";

import FilterList from "./FilterList";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import CheckboxListSecondary from "./checkBox";

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

const FilterOptionStates = {
    1: "FoodCategoryFilter",
    2: "DietFilter",
}

function GetRecipes() {
    const {recipes} = useAuth();
    // if (typeof recipes === 'undefined') return [];
    return {recipes}.recipes;
}


export default function DishesView2(props) {
    const classes = useStyles();
    const AllRecipes = GetRecipes();
    const [curRecipes, setCurRecipes] = useState(GetRecipes());
    const [Filters, setFilters] = useState({
        FoodCategoryFilter: [],
        DietFilter: []
    })

    const getGridListCols = () => {
        if (isWidthUp('md', props.width)) {
            return 3;
        }
        return 2;
    }

    useEffect(() => {
        console.log("CC!!", curRecipes)
    }, [curRecipes]);
    const handleFilters = (filters, category) => {

        const newFilters = {...Filters}
        newFilters[category] = filters
        //        newFilters[FoodCategory] = [Salades, Pies, Others]

        if (category === FilterOptionStates["1"]) {
            updateRecipesForFoodType(newFilters)
        }
        if (category === FilterOptionStates["2"]) {
            updateRecipesForDiet(newFilters)
        }
        setFilters(newFilters)

    }
    const dietFilterCheck = (recipe, newFilter) => {
        let DietList = newFilter[FilterOptionStates["2"]];
        const list = AllFiltersOption.getDietFilters();

        if (!DietList || DietList.length === 0) {
            return true
        }
        let filtersArr = recipe.getFilters()
        for (let i=0; i<DietList.length;i++) {
            if (!filtersArr.includes(list[DietList[i]-100].name)) {
                return false;
            }
        }
        return true;
    }
    const FoodTypeCheck = (recipe, newFilters) => {
        let foodTypeList = newFilters[FilterOptionStates["1"]]
        if (foodTypeList.length === 0) {
            return true;
        }
        let list = AllFiltersOption.getFoodTypes();
        let category = recipe.getCategory();

        for (let i = 0; i < foodTypeList.length; i++) {
            console.log("list[foodTypeList[i]]", list[foodTypeList[i]].name)
            if (list[foodTypeList[i]].name === category) {
                return true
            }
        }
        return false;
    }


    const updateRecipesForDiet = (newFilters) => {
        let dietList = newFilters[FilterOptionStates["2"]];
        console.log("diet", dietList)

        let tempRecipes = [];
        if (dietList.length === 0) {
            for (const recipe of AllRecipes) {
                if (FoodTypeCheck(recipe, newFilters)) {
                    tempRecipes.push(recipe)
                }
            }
            setCurRecipes(tempRecipes)
            return
        }

        for (let recipe of AllRecipes) {
            if (FoodTypeCheck(recipe, newFilters) && dietFilterCheck(recipe, newFilters)) {
                tempRecipes.push(recipe)
            }
        }

        setCurRecipes(tempRecipes)
    }


    const updateRecipesForFoodType = (newFilters) => {
        let tempRecipes = [];
        let foodTypeList = newFilters[FilterOptionStates["1"]]
        if (foodTypeList.length === 0) {
            for (const recipe of AllRecipes) {
                if (dietFilterCheck(recipe, newFilters)) {
                    tempRecipes.push(recipe)
                }
            }
            setCurRecipes(tempRecipes)
            return;
        }
        console.log("newFulter", foodTypeList)

        for (let recipe of AllRecipes) {
            if (FoodTypeCheck(recipe, newFilters) && dietFilterCheck(recipe, newFilters)) {
                tempRecipes.push(recipe)
            }
        }
        setCurRecipes(tempRecipes)
    }
    const renderRecipes = () => curRecipes.map((recipe, index) => (
        <div>
            <GridListTile>
                <MediaCard
                    recipe={recipe}
                    author={recipe.getAuthor()}
                    img={recipe.getMainImage() || 'https://ifoodreal.com/wp-content/uploads/2018/12/FG-healthy-spinach-salad-recipe.jpg'}
                    title={recipe.getName()}
                />
            </GridListTile>
        </div>
    ))


    if (AllRecipes.length === 0) {
        return (
            <div className="recipes">
                <h1>
                    Add your first recipe!
                </h1>
            </div>


        );
    } else {
        console.log("not empty")
        return (
            <div className="recipes">

                <div className="filters">
                    <CheckBox2 className="ant-checkbox-group-item" handleFilters={handleFilters}
                               FoodTypeCatList={AllFiltersOption.getFoodTypes()}
                               DietList={AllFiltersOption.getDietFilters()}
                    />
                </div>
                <div className={classes.root}>

                    <GridList spacing={70} cellWidth={getGridListCols() * 100} cellHeight={"auto"}
                              cols={getGridListCols()}>
                        {renderRecipes()}
                    </GridList>

                </div>
                {(curRecipes.length === 0) &&
                <h1>
                    Empty for now. add a recipe!
                </h1>}
            </div>)
    }
}
