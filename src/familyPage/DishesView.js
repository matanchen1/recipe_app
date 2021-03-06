import {makeStyles} from "@material-ui/core/styles";
import {useAuth} from "../contexts/AuthContext";
import React, {useEffect, useState} from "react";
import MediaCard from "./MediaCard";
import CheckBox from "./CheckBox";
import {getDietFilters, getFoodTypes} from "../addRecipe/Recipe";
import "./familyPage.css";
import SearchBox from "./SearchBox";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {Col, Row} from 'antd';
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {Star, StarBorder} from "@material-ui/icons";
import MediaCardComments from "./MediaCardComments";
import 'antd/dist/antd.css';
import {Card} from 'antd';

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
    },
    margin: {
        marginTop: "30px",
    },
    extendedIcon: {
        marginRight: theme.spacing(1.5),
    },
    mainRecipeGrid: {
        marginBottom: "40px",
    },
    mediaCardHover: {
        maxWidth: "350px",
    },

}));

const FilterOptionStates = {
    1: "FoodCategoryFilter",
    2: "DietFilter",
    3: "curMembers"
}

function GetRecipes() {
    const {recipes} = useAuth();
    return {recipes}.recipes;
}

export default function DishesView(props) {

    const classes = useStyles();
    const {member, members, findMemberInArr} = useAuth()
    const AllRecipes = GetRecipes();
    const [curRecipes, setCurRecipes] = useState(GetRecipes());
    const [sort, setSorted] = useState(false);
    const [searchField, setSearchField] = useState("");
    const [check, setCheck] = useState(false);

    const [Filters, setFilters] = useState({
        FoodCategoryFilter: [],
        DietFilter: [],
        curMembers: [],
        favChecked: false,
    })
    const membersArr = [];
    for (const member of {members}.members) {
        membersArr.push(member)
    }
    useEffect(() => {
    }, [curRecipes, Filters, check]);

    function checkFavoriteRecipes(recipe, newFilters) {

        if (!newFilters["favChecked"]) {
            return true;
        } else {
            return (member.favourites.has(parseInt(recipe.key)))
        }
    }


    const handleFilters = (filters, category) => {


        if (filters === "clearChoice") {
            const newFilters = {
                FoodCategoryFilter: [],
                DietFilter: [],
                curMembers: [],
                favChecked: false,
            }
            setCheck(false);
            updateCurRecipe(newFilters)
            setFilters(newFilters)
            return;
        }

        const newFilters = {...Filters}
        newFilters[category] = filters

        if (category === FilterOptionStates["1"]) {
            updateRecipesForFoodType(newFilters)
        } else if (category === FilterOptionStates["2"]) {
            updateRecipesForDiet(newFilters)
        } else if (category === FilterOptionStates["3"]) {
            updateFamilyMember(newFilters)
        } else {
            updateCurRecipe(newFilters)
        }
        setFilters(newFilters)
    }

    const updateFamilyMember = (newFilters) => {
        updateCurRecipe(newFilters)
    }
    const FamilyMembersCheck = (recipe, newFilter) => {
        let FamilyMemberdList = newFilter[FilterOptionStates["3"]];
        if (!FamilyMemberdList || FamilyMemberdList.length === 0) {
            return true
        }
        const uploadedBy = recipe.getUploadedBy()
        for (let i = 0; i < FamilyMemberdList.length; i++) {
            let tempMember = findMemberInArr(membersArr, FamilyMemberdList[i])
            if (tempMember.name === uploadedBy) {
                return true
            }
        }
        return false;
    }

    const dietFilterCheck = (recipe, newFilter) => {
        let DietList = newFilter[FilterOptionStates["2"]];
        const list = getDietFilters();

        if (!DietList || DietList.length === 0) {
            return true
        }
        let filtersArr = recipe.getFilters()
        for (let i = 0; i < DietList.length; i++) {
            if (!filtersArr.includes(list[DietList[i] - 100].name)) {
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
        let list = getFoodTypes();
        let category = recipe.getCategory();

        for (let i = 0; i < foodTypeList.length; i++) {
             
            if (list[foodTypeList[i]].name === category) {
                return true
            }
        }
        return false;
    }


    const updateRecipesForDiet = (newFilters) => {
        let dietList = newFilters[FilterOptionStates["2"]];
         
        updateCurRecipe(newFilters)
    }

    const updateCurRecipe = (newFilters) => {
        let tempRecipes = [];
        for (let recipe of AllRecipes) {
            if (FoodTypeCheck(recipe, newFilters) && dietFilterCheck(recipe, newFilters) &&
                FamilyMembersCheck(recipe, newFilters) && checkFavoriteRecipes(recipe, newFilters)) {
                tempRecipes.push(recipe)
            }
        }
        setCurRecipes(tempRecipes)
    }

    const updateRecipesForFoodType = (newFilters) => {
        updateCurRecipe(newFilters)
    }

    function recipeIngredientsList(ingredientsList) {
        for (let ing of ingredientsList) {
            if (ing && ing.toLowerCase().includes(searchField.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

    const getFilterRecipe = (curRecipes) => {
        const filteredRecipe = [];
        for (const recipe of curRecipes) {
            if (recipe.name.toLowerCase().includes(searchField.toLowerCase()) ||
                recipe.author.toLowerCase().includes(searchField.toLowerCase()) ||
                recipeIngredientsList(recipe.ingredientNameForFilter)) {
                filteredRecipe.push(recipe);
            }
        }
        return filteredRecipe;
    }
    const onSearchChange = (event) => {
        setSearchField(event.target.value)
    }

    function FloatingActionButtonSize() {
        const classes = useStyles();

        return (
            <div>
                <div>
                    <Fab
                        variant="extended"
                        size="large"
                        color="secondary"
                        aria-label="add"
                        className={classes.margin}
                        onClick={() => {
                            props.handleClickBtn()
                        }}
                    >
                        <AddIcon color="success" className={classes.extendedIcon}/>
                        Add Recipe
                    </Fab>
                </div>
            </div>
        );
    }


    const renderRecipes = (Recipes) => getFilterRecipe(Recipes).map((recipe, i) => (
        <Col lg={8} md={12} sm={24} id={i}
             className={classes.mediaCardHover}
        >
            <MediaCard
                recipe={recipe}
                author={recipe.getAuthor()}
                img={recipe.getMainImage() || 'https://ifoodreal.com/wp-content/uploads/2018/12/FG-healthy-spinach-salad-recipe.jpg'}
                title={recipe.getName()}
                recipeIndex={recipe.key}
            />
            <Card><MediaCardComments comments={recipe.comments}/></Card>
        </Col>
    ))
    return (

        <div className="filters_and_recipes">
            <FloatingActionButtonSize/>
            <FormControlLabel
                control={<Checkbox
                    icon={<StarBorder/>}
                    checkedIcon={<Star/>}
                    checked={check}
                    onChange={() => {
                        handleFilters(!check, "favChecked")
                        setCheck(!check);
                    }
                    }
                    inputProps={{'aria-label': 'primary checkbox'}}/>}
                label="My Favorites"
            />
            <div className={"searchRecipeMain"}>
                <SearchBox searchChange={onSearchChange}/>

            </div>
            <CheckBox className="filtersCheckbox" handleFilters={handleFilters}
                      FoodTypeCatList={getFoodTypes()}
                      DietList={getDietFilters()}
            />
            {(curRecipes.length === 0) &&
            <h1>
                {AllRecipes.length === 0 ? "\n Add Your First Recipe :)" : "\n There's nothing here! Add recipes and memories to your collection :)"}
            </h1>}
            <div className={"recipes"}>
                <Row className={classes.mainRecipeGrid} gutter={[55, 30]}>
                    {renderRecipes(curRecipes)}
                </Row>
            </div>
        </div>
    )
}
