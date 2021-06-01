import React, {Component} from "react";
import allDishes from "./allDishes"
import TitleBarGridList from "./TitleBarGridList";
import "./familyPage.css";
import NestedList from "./filterRecipes";
import {useAuth} from "../contexts/AuthContext";

// function GetRecipes(){
//     const {recipes} = useAuth();
//     console.log(recipes);
//     return recipes;
// }
Array.prototype.remove = function() {
    let what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


class DishesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            holidays: [],
            authors:[],
            dishes: allDishes
        }
    }
    onClickChange = (text,checked) => {
        if(this.state.categories.includes(text))
            return;
        checked? this.setState(prevState => ({
            categories: [...prevState.categories, text]
        })):   this.setState({categories: this.state.categories.filter(function(category) {
                return category !== text.target.value
            })});
        console.log(this.state.categories)
    }

render() {
        let checker = (arr, target) => target.some(v => arr.includes(v));
        const filteredDishes = this.state.dishes.filter(dish => {
            return (checker(this.state.categories,dish.categories) && // checker(dish.holidays,this.state.holidays) &&
                (this.state.authors.length===0 || dish.author.includes(this.state.authors))) //what if no author was selected?
        })
    // console.log(filteredDishes);
        return (<>
                {/*<GetRecipes/>*/}
                <div className="recipes">
                    <TitleBarGridList Dishes={filteredDishes}/>
                </div>
                <div className="filters">
                    <NestedList clickChange={this.onClickChange}/>
                    {/*<SelectedListItem clickChange={this.onClickChange} />*/}
                </div>
            </>
        )
    }
}

export default DishesView;