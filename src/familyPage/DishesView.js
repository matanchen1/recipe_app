import React, {useCallback, useEffect, useState} from "react";
import "./familyPage.css";
import FilterList from "./FilterList";
import filterOptions, {AllFiltersOption} from "../addRecipe/Recipe"
import {useAuth} from "../contexts/AuthContext";
import {tempRecipe} from "../addRecipe/addRecipeMain";
import withWidth, {isWidthUp} from "@material-ui/core/withWidth";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import MediaCard from "./mediaCard";
import {makeStyles} from "@material-ui/core/styles";


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

const States = {
    FoodType: 1,
    DIET: 2
}

function GetRecipes() {
    const {recipes} = useAuth();
    // if (typeof recipes === 'undefined') return [];
    return {recipes};
}

export default function DishesView() {
    const classes = useStyles();
    const [AllRecipes, setAllRecipes] = useState(GetRecipes().recipes);
    const [curRecipes, setCurRecipes] = useState(GetRecipes().recipes);
    const [foodTypeMap, setFoodTypeMap] = useState(createFoodTypeMap()); // {Salads, pies, Chines}
    const [dietFiltersMap, SetDietFiltersMap] = useState(CreateDietTypeMap()); // { kosher, vegan}


    // const [holidays, setHolidays] = useState(CreateMap(holidayOption));
//TODO: get users list from firebase
    // const [authors, setAuthors] = useState(); //get from FB


    function createFoodTypeMap() {
        const filtersMap = {}
        AllFiltersOption.getFoodTypes().forEach((f) => filtersMap[f] = false)
        return filtersMap;
    }

    function CreateDietTypeMap() {
        const dietMap = {}
        AllFiltersOption.getDietFilters().forEach((f) => dietMap[f] = false);
        return dietMap;
    }

    const filterRecipeByDiet = (recipe) => {
        let recipeFilterDiet = recipe.getFilters();
        console.log("recipeFilterDiet", recipeFilterDiet)
        for (const filter of recipeFilterDiet) {
            if (dietFiltersMap[filter] !== false) {
                return true;
            }
        }

        return false;
    }


    // const handleFilter = useCallback(()=>{
    //     console.log("lolog!!")
    //
    //     let foodTypeList = Object.fromEntries(Object.entries(foodTypeMap).filter(([k, v]) => foodTypeMap[k] === true));
    //     let dietFilter = Object.fromEntries(Object.entries(dietFiltersMap).filter(([k, v]) => dietFiltersMap[k] === true));
    //     let numOfFootTypeFilter = Object.keys(foodTypeList).length;
    //     let numOfDietFilter = Object.keys(dietFilter).length;
    //     console.log("numOfDietFilter!!", numOfDietFilter)
    //
    //     if (numOfFootTypeFilter === 0 && numOfDietFilter === 0) {
    //         setCurRecipes(AllRecipes)
    //         return;
    //     }
    //
    //     let tempList = [];
    //     if (numOfFootTypeFilter === 0) {
    //         AllRecipes.forEach((recipe) => {
    //             tempList.push(recipe)
    //         })
    //     } else {
    //         AllRecipes.forEach((recipe) => {
    //             let category = recipe.getCategory();
    //             if (foodTypeMap[category] === true) {
    //                 tempList.push(recipe)
    //             }
    //         })
    //     }
    //     console.log("tempDataAfterDiet!!", tempList)
    //
    //     let tempDataAfterDiet = []
    //     if (numOfDietFilter === 0) {
    //         tempDataAfterDiet = tempList
    //         console.log("0", tempDataAfterDiet)
    //
    //     } else {
    //         tempList.forEach((recipe) => {
    //             let recipeFilterDiet = recipe.getFilters();
    //             for (const filter of recipeFilterDiet) {
    //                 if (dietFiltersMap[filter] !== false){
    //                     tempDataAfterDiet.push(recipe);
    //                     break;
    //                 }
    //             }
    //             })
    //     }
    //     console.log("end", tempDataAfterDiet)
    //     setCurRecipes(tempDataAfterDiet)
    //
    // },[AllRecipes,dietFiltersMap,foodTypeMap])

    function handleFilter() {
        console.log("lolog!!")
        let foodTypeList = Object.fromEntries(Object.entries(foodTypeMap).filter(([k, v]) => foodTypeMap[k] === true));
        let dietFilter = Object.fromEntries(Object.entries(dietFiltersMap).filter(([k, v]) => dietFiltersMap[k] === true));
        let numOfFootTypeFilter = Object.keys(foodTypeList).length;
        let numOfDietFilter = Object.keys(dietFilter).length;
        console.log("numOfDietFilter!!", numOfDietFilter)
        if (numOfFootTypeFilter === 0 && numOfDietFilter === 0) {
            setCurRecipes(AllRecipes)
            return;
        }

        let tempList = [];
        if (numOfFootTypeFilter === 0) {
            AllRecipes.forEach((recipe) => {
                tempList.push(recipe)
            })
        } else {
            AllRecipes.forEach((recipe) => {
                let category = recipe.getCategory();
                if (foodTypeMap[category] === true) {
                    tempList.push(recipe)
                }
            })
        }
        console.log("tempDataAfterDiet!!", tempList)

        let tempDataAfterDiet = []
        if (numOfDietFilter === 0) {
            tempDataAfterDiet = tempList
            console.log("0", tempDataAfterDiet)

        } else {
            tempList.forEach((recipe) => {
                let recipeFilterDiet = recipe.getFilters();
                for (const filter of recipeFilterDiet) {
                    if (dietFiltersMap[filter] !== false) {
                        tempDataAfterDiet.push(recipe);
                        break;
                    }
                }
            })
        }
        console.log("end", tempDataAfterDiet);
        setCurRecipes(tempDataAfterDiet);

    }

    useEffect(() => {
        console.log("CC!!", curRecipes)
    }, [curRecipes]);

    function onClickChange(state, value) {
        console.log(state)
        switch (state) {
            case States.FoodType:
                let tempMapFood = foodTypeMap;
                tempMapFood[value] = !tempMapFood[value]
                setFoodTypeMap(tempMapFood)
                break;
            case States.DIET:
                let tempDietMap = dietFiltersMap;
                tempDietMap[value] = !tempDietMap[value]
                SetDietFiltersMap(tempDietMap)
                console.log("tempDietMap!!", dietFiltersMap)
                break;
            // case States.HOLIDAY:
            //     holidays[value] = !holidays[value];
            //     break;

            // case States.AUTHOR:
            //     break;
            // default:
            // return;
        }
    }


//TITLEBARGRIDLIST
    const getGridListCols = () => {
        if (isWidthUp('md', curRecipes.width)) {
            return 3;
        }
        return 2;
    }

    if (curRecipes.length < 0) {
        return (
            <div>
                <div className="recipes">
                    <h1>
                        Empty for now. add a recipe!
                    </h1></div>
                <div className="filters">
                    <FilterList clickChange={onClickChange}
                                handleFilter={handleFilter}
                                curRecpies={curRecipes}/>
                </div>
            </div>
        );
    } else {
        console.log("not empty")
        return (
            <div className="recipes">
                <div className={classes.root}>
                    <h1>
                        not empty!
                    </h1>
                    <GridList spacing={70} cellWidth={getGridListCols() * 100} cellHeight={"auto"}
                              cols={getGridListCols()}>
                        {curRecipes.map((tile) => (
                            <div>
                                <GridListTile>
                                    <MediaCard
                                        author={tile.getAuthor()}
                                        img={tile.getMainImage() || 'https://ifoodreal.com/wp-content/uploads/2018/12/FG-healthy-spinach-salad-recipe.jpg'}
                                        title={tile.getName()}
                                    />
                                </GridListTile>
                            </div>
                        ))}
                    </GridList>
                </div>
                <div className="filters">
                    {/*{<FilterList clickChange={onClickChange}*/}
                    {/*             handleFilter={handleFilter}*/}
                    {/*             foodValues={foodTypeMap}*/}
                    {/*             dietValues={dietFiltersMap}*/}
                    {/*/>}*/}
                </div>
            </div>)
    }
}

// {9GXI06CmcleSUEE5k2m7AD9upFP2}
// export default withWidth()(TitleBarGridList);


//
//
//     /**
//
//
// {/*{alldishes.map((tile) => (*/}
{/*    <div>*/
}
{/*    <GridListTile>*/
}
{/*        <MediaCard*/
}
{/*            author={tile.getAuthor()}*/
}
{/*            img='https://ifoodreal.com/wp-content/uploads/2018/12/FG-healthy-spinach-salad-recipe.jpg'*/
}
{/*            title={tile.getName()}*/
}
{/*        />*/
}
{/*    </GridListTile>*/
}
{/*    </div>*/
}
{/*))}*/
}

{/*9GXI06CmcleSUEE5k2m7AD9upFP2*/
}

//
//     salads : true
//      Pie : true
//      :false
//      ....
//      false;
//
// }
//
// //Returns true if checkBox is empty
// function isAllFalse(map) {
//     for (let val of map.values()) {
//         if (val) return false;
//     }
//     return true;
// }

//check diet filters
// function checkDietFilters(dietFilters, recipeDietFilters) {
//
//     for (let key of dietFilters.keys()) {
//         if (dietFilters[key] && !recipeDietFilters[key]) return false;
//     }
//     return true;
// }
