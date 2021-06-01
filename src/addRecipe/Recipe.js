export const filterOptions = [
    'Vegan',
    'Kosher',
    'GlutenFree'];

export const categoryOption = [
    'Salads',
    'Pies',
    'Fish',
    'Holidays',
    'Deserts',
    'Vegan',
    'Soup',
    'Other',
];


export default class Recipe {
    constructor(name = "", author = "", serving = "", images = [], notes = "", tags = "",
                prepTime = "", ingredientsList = [], ovenHeat = "", instructionDetails = [],
                storyContent = "", storyImages = [], category = "",
                Vegan = false, Kosher = false, GlutenFree = false,
                flitterArr = []) {
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
        this.filter = {
            isVegan: Vegan,
            isKosher: Kosher,
            isGlutenFree: GlutenFree,
            filterList: flitterArr
        };
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

    setImage(image) {

        this.images = image;
        console.log(this.images)
    }

    setCategory(category) {
        this.category = category;
    }

    setFilterList(filterArr) {
        this.filter.filterList = filterArr
    }

    setAnotherFilter(filterList) {
        this.filter.isVegan = filterList.includes("Vegan");
        this.filter.isKosher = filterList.includes("Kosher");
        this.filter.isGlutenFree =filterList.includes("GlutenFree");
        this.filter.filterList = filterList;
        console.log("this: ",this.filter)
        console.log("not this:", filterList)

    }


    getName() {
        return this.name;
    }

    getCategory() {
        return this.category;
    }
    getAuthor(){
        return this.author;
    }

    getImages() {
        return this.images[0];
    }
    getFilterOption(){
        return filterOptions;
    }
    getCategoryOption(){
        return categoryOption;
    }
    ;
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
            story: Recipe.story,
            category: Recipe.category,
        };
    },


    fromFirestore: function (recipe) {
        const ingredient = [];
            recipe.IngredientsList.forEach(item => (
            ingredient.push(item.amount + item.typeAmount + " " + item.ingredient)
        ))
        return new Recipe(recipe.name, recipe.author, recipe.serving, recipe.images, recipe.notes, recipe.tags,
            recipe.prepTime, ingredient, recipe.OvenHeat, recipe.instructionDetails,
            recipe.story.content, recipe.story.images, recipe.category);
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