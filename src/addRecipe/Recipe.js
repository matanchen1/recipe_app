export const filterOptions = [
    'Vegan',
    'Kosher',
    'GlutenFree'];

export const categoryOption = [
    {
        "_id": 0,
        "name": "Salads"
    },
    {
        "_id": 1,
        "name": "Pies"
    },
    {
        "_id": 2,
        "name": "Fish"
    },
    {
        "_id": 3,
        "name": "Deserts"
    },
    {
        "_id": 4,
        "name": "Soup"
    },
    {
        "_id": 5,
        "name": "Other"
    },


];

export const dietOption = [
    {
        "_id": 100,
        "name": "Vegan"
    },
    {
        "_id": 101,
        "name": "Kosher"
    },
    {
        "_id": 102,
        "name": "GlutenFree"
    },
];

export const holidayOption = [
    'Passover',
    'Purim',
    'Rosh Hashana',
    'Shavuot'
];
export const AllFiltersOption = {
    filterOptions: [
        'Vegan',
        'Kosher',
        'GlutenFree'],

    categoryOption: [
        'Salads',
        'Pies',
        'Fish',
        'Deserts',
        'Soup',
        'Other',
    ],

    holidayOption: [
        'Passover',
        'Purim',
        'Rosh Hashana',
        'Shavuot'
    ],
    getDietFilters() {
        return dietOption
    },
    getFoodTypes() {
        return categoryOption;
    },
    getOnlyNameCategoryOption() {
        return ['Salads',
            'Pies',
            'Fish',
            'Deserts',
            'Soup',
            'Other',
        ];
    },


    size() {
        return 3;
    }
}


export default class Recipe {

    constructor(name = "", author = "", serving = "", images = [], notes = "", tags = "",
                prepTime = "Not mentioned", ingredientsList =[{ingredient: "", amount: "", typeAmount: ""}], ovenHeat = "", instructionDetails = [],
                storyContent = "", storyImages = [], category = "Other", filtersList = [],
                likeCounter = 0,
                Vegan = false, Kosher = false, GlutenFree = false, holiday = "",) {
        this.name = name;
        this.author = author;
        this.serving = serving;
        this.images = images;
        this.notes = notes;
        this.tags = tags;
        this.prepTime = prepTime;
        this.IngredientsList = ingredientsList;
        this.ovenHeat = ovenHeat;
        this.instructionDetails = instructionDetails;
        this.story = {
            content: storyContent,
            images: storyImages,
        };
        this.category = category;
        this.holiday = holiday;
        this.filtersList = filtersList;
        this.likeCounter = likeCounter;
    }

    setStoryContent(text){
        this.story.content = text;
    }

    setName(name) {
        this.name = name;
    }


    setAuthor(author) {
        this.author = author
    }

    setServing(serving) {
        this.serving = serving;
    }

    setNotes(notes) {
        this.notes = notes;
    }

    setTags(tags) {
        this.tags = tags;
    }

    setIngredientsList(IngredientsList) {
        this.IngredientsList = IngredientsList;
        console.log(this.IngredientsList); //  TODO:REMOVE THIS
    }

    setInstruction(stepsList) {
        this.instructionDetails = stepsList;
        console.log(this.instructionDetails); //  TODO:REMOVE THIS
    }

    setOvenHeat(ovenHeat) {
        this.ovenHeat = ovenHeat;
    }

    setPrepTime(prepTime) {
        this.prepTime = prepTime;
        console.log(this.prepTime); //  TODO:REMOVE THIS
    }

    setImages(image) {
        this.images = image;
        console.log(this.images)
    }

    setCategory(category) {
        this.category = category;
    }

    setFilterList(filterArr) {
        this.filteresList = filterArr
    }

    getStoryContent() {
        return this.story.content;
    }

    setAnotherFilter(filterList) {
        this.filtersList = filterList;
        console.log("filterList: ", this.filtersList)
    }

    getFilters() {
        return this.filtersList;
    }


    getName() {
        return this.name;
    }

    getCategory() {
        return this.category;
    }

    getAuthor() {
        return this.author;
    }

    getMainImage() {
        return this.images[0];
    }

    getImageArr(){
        return this.images;
    }
    getFilterOption() {
        return filterOptions;
    }

    getCategoryOption() {
        return categoryOption;
    }

    getHoliday() {
        return this.holiday;
    }

    setHoliday(value) {
        this.holiday = value;
    };


}


export const recipeConverter = {
    toFirestore: function (Recipe) {
        return {
            name: Recipe.name,
            author: Recipe.author,
            serving: Recipe.serving,
            notes: Recipe.notes,
            tags: Recipe.tags,
            prepTime: Recipe.prepTime,
            IngredientsList: Recipe.IngredientsList,
            OvenHeat: Recipe.ovenHeat,
            instructionDetails: Recipe.instructionDetails,
            images: Recipe.images,
            category: Recipe.category,
            filtersList: Recipe.filtersList,
        };
    },


    fromFirestore: function (recipe) {
        console.log(recipe.IngredientsList)
        const ingredient = [];
        recipe.IngredientsList.forEach(item => (
            ingredient.push(item.amount + item.typeAmount + " of " + item.ingredient)
        ))
        return new Recipe(recipe.name, recipe.author, recipe.serving, recipe.images, recipe.notes, recipe.tags,
            recipe.prepTime, ingredient, recipe.OvenHeat, recipe.instructionDetails,
            "", [], recipe.category, recipe.filtersList);
    }

};

//
// this.name = recipe.name;
// this.author = recipe.author;
// this.serving = recipe.serving;
// this.images = recipe.images;
// this.notes = recipe.notes;
// this.tags = recipe.tags;
// this.prepTime = recipe.prepTime;
// this.IngredientsList = recipe.IngredientsList;
// this.OvenHeat = recipe.OvenHeat;
// this.StepDetails = recipe.StepDetails;
// this.story = {
//     content: "",
//     images: [],
// };
//
// const RecipesFilter = () => {
//     //food Type Filter
//     let tempList = AllRecipes;
//     let foodTypeList = getSelectedFoodType()
//     if (foodTypeList.length > 0) {
//         tempList = (tempList.filter((recipe) => {
//             foodTypeList.includes(recipe.getCategory())
//         }));
//     }
//
//     let dietFilter = getSelectedDietFilter()
// // no battery
//     if (dietFilter.length > 0) {
//         tempList.filter((recipe) => {
//             filterRecipeByDiet(recipe)
//         });
//     }
//
//     setCurRecipes(tempList);
// }