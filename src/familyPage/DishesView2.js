//
//
//
//
//
//
// import {makeStyles} from "@material-ui/core/styles";
// import {useAuth} from "../contexts/AuthContext";
// import React, {useEffect, useState} from "react";
// import GridList from "@material-ui/core/GridList";
// import GridListTile from "@material-ui/core/GridListTile";
// import MediaCard from "./MediaCard";
// import CheckBox2 from "./CheckBox2";
// import {AllFiltersOption} from "../addRecipe/Recipe";
// import "./familyPage.css";
// import Button from "@material-ui/core/Button";
// import SearchBox from "./SearchBox";
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
// import MediaCard2 from "./MediaCard2";
// import  styles from "./recipesStyle.css"
// import {Col, Row} from 'antd';
//
// const useStyles = makeStyles((theme) => ({
//     root: {
//         zoom: "100%",
//         justifyContent: 'space-around',
//         overflow: 'hidden',
//         background: "none",
//     },
//     gridList: {
//         width: "auto",
//         height: "auto"
//     },
//     margin: {
//         marginTop: "30px",
//         // Sivan changed the margin for now, we can totally go back
//         // margin: theme.spacing(1),
//         // border: "0.5px solid black"
//     },
//     extendedIcon: {
//         marginRight: theme.spacing(1.5),
//
//     },
//     mainRecipeGrid: {
//         width: "100%"
//     },
// }));
//
// const FilterOptionStates = {
//     1: "FoodCategoryFilter",
//     2: "DietFilter",
// }
//
// function GetRecipes() {
//     const {recipes} = useAuth();
//     return {recipes}.recipes;
// }
//
//
// export default function DishesView2(props) {
//     const classes = useStyles();
//     const AllRecipes = GetRecipes();
//     const [curRecipes, setCurRecipes] = useState(GetRecipes());
//     const [searchField, setSearchField] = useState("");
//     const [Filters, setFilters] = useState({
//         FoodCategoryFilter: [],
//         DietFilter: []
//     })
//
//
//     useEffect(() => {
//         console.log("CC!!", curRecipes)
//     }, [curRecipes]);
//     const handleFilters = (filters, category) => {
//
//         const newFilters = {...Filters}
//         newFilters[category] = filters
//         //        newFilters[FoodCategory] = [Salades, Pies, Others]
//
//         if (category === FilterOptionStates["1"]) {
//             updateRecipesForFoodType(newFilters)
//         }
//         if (category === FilterOptionStates["2"]) {
//             updateRecipesForDiet(newFilters)
//         }
//         setFilters(newFilters)
//
//     }
//     const dietFilterCheck = (recipe, newFilter) => {
//         let DietList = newFilter[FilterOptionStates["2"]];
//         const list = AllFiltersOption.getDietFilters();
//
//         if (!DietList || DietList.length === 0) {
//             return true
//         }
//         let filtersArr = recipe.getFilters()
//         for (let i = 0; i < DietList.length; i++) {
//             if (!filtersArr.includes(list[DietList[i] - 100].name)) {
//                 return false;
//             }
//         }
//         return true;
//     }
//
//     const FoodTypeCheck = (recipe, newFilters) => {
//         let foodTypeList = newFilters[FilterOptionStates["1"]]
//         if (foodTypeList.length === 0) {
//             return true;
//         }
//         let list = AllFiltersOption.getFoodTypes();
//         let category = recipe.getCategory();
//
//         for (let i = 0; i < foodTypeList.length; i++) {
//             console.log("list[foodTypeList[i]]", list[foodTypeList[i]].name)
//             if (list[foodTypeList[i]].name === category) {
//                 return true
//             }
//         }
//         return false;
//     }
//
//
//     const updateRecipesForDiet = (newFilters) => {
//         let dietList = newFilters[FilterOptionStates["2"]];
//         console.log("diet", dietList)
//
//         let tempRecipes = [];
//         if (dietList.length === 0) {
//             for (const recipe of AllRecipes) {
//                 if (FoodTypeCheck(recipe, newFilters)) {
//                     tempRecipes.push(recipe)
//                 }
//             }
//             setCurRecipes(tempRecipes)
//             return
//         }
//
//         for (let recipe of AllRecipes) {
//             if (FoodTypeCheck(recipe, newFilters) && dietFilterCheck(recipe, newFilters)) {
//                 tempRecipes.push(recipe)
//             }
//         }
//
//         setCurRecipes(tempRecipes)
//     }
//
//
//     const updateRecipesForFoodType = (newFilters) => {
//         let tempRecipes = [];
//         let foodTypeList = newFilters[FilterOptionStates["1"]]
//         if (foodTypeList.length === 0) {
//             for (const recipe of AllRecipes) {
//                 if (dietFilterCheck(recipe, newFilters)) {
//                     tempRecipes.push(recipe)
//                 }
//             }
//             setCurRecipes(tempRecipes)
//             return;
//         }
//         console.log("newFilter", foodTypeList)
//
//         for (let recipe of AllRecipes) {
//             if (FoodTypeCheck(recipe, newFilters) && dietFilterCheck(recipe, newFilters)) {
//                 tempRecipes.push(recipe)
//             }
//         }
//         setCurRecipes(tempRecipes)
//     }
//
//     function recipeIngredientsList(ingredientsList) {
//         for (let ing of ingredientsList) {
//             if (ing && ing.toLowerCase().includes(searchField.toLowerCase())) {
//                 return true;
//             }
//         }
//         return false;
//     }
//
//     const getFilterRecipe = () => {
//         const filteredRecipe = [];
//         for (const recipe of curRecipes) {
//             if (recipe.name.toLowerCase().includes(searchField.toLowerCase()) ||
//                 recipe.author.toLowerCase().includes(searchField.toLowerCase()) ||
//                 recipeIngredientsList(recipe.ingredientNameForFilter)) {
//                 filteredRecipe.push(recipe);
//             }
//         }
//         return filteredRecipe;
//     }
//     // const filteredRobots = curRecipes.filter(robot => {
//     //     return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
//     // })
//     const onSearchChange = (event) => {
//         setSearchField(event.target.value)
//     }
//
//     function FloatingActionButtonSize() {
//         const classes = useStyles();
//
//         return (
//             <div>
//                 <div>
//                     <Fab
//                         variant="extended"
//                         size="large"
//                         color="secondary"
//                         aria-label="add"
//                         className={classes.margin}
//                         onClick={() => {
//                             props.handleClickBtn()
//                         }}
//                     >
//                         <AddIcon color="success" className={classes.extendedIcon}/>
//                         Add Recipe
//                     </Fab>
//                 </div>
//             </div>
//         );
//     }
//
//     const renderRecipes = (Recipes) => Recipes.map((recipe, index) => (//TODO: can we remove this index?
//         <Col lg={8} md={12} sm={24}>
//             <MediaCard2
//                 recipe={recipe}
//                 author={recipe.getAuthor()}
//                 img={recipe.getMainImage() || 'https://ifoodreal.com/wp-content/uploads/2018/12/FG-healthy-spinach-salad-recipe.jpg'}
//                 title={recipe.getName()}
//                 recipeIndex={recipe.key}
//             />
//         </Col>
//     ))
//
//
//     if (AllRecipes.length === 0) {
//         return (
//             <div className="recipes">
//                 <h1>
//                     Add your first recipe!
//                 </h1>
//             </div>
//
//         );
//     } else {
//         console.log("not empty")
//         return (
//             <div className="filters_and_recipes">
//                 <FloatingActionButtonSize/>
//                 <div className={"searchRecipeMain"}>
//                     <SearchBox searchChange={onSearchChange}/>
//                 </div>
//                 <CheckBox2 className="filtersCheckbox" handleFilters={handleFilters}
//                            FoodTypeCatList={AllFiltersOption.getFoodTypes()}
//                            DietList={AllFiltersOption.getDietFilters()}
//                 />
//                 {(curRecipes.length === 0) &&
//                 <h1>
//                     Empty for now. add a recipe!
//                 </h1>}
//                 <div className={"recipes"}>
//                     <Row className={classes.mainRecipeGrid} gutter={[55, 70]}>
//                         {renderRecipes(getFilterRecipe())}
//
//                     </Row>
//                 </div>
//             </div>
//         )
//     }
// }