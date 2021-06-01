import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {useParams} from "react-router";
import "./styles/app.css";
import GroupCode from "./pages/group-code";
import SignUp from "./pages/SignUp";
import AddStory from "./pages/AddStory";
import NavBar from "./pages/NavBar";
import AddRecipeMain from "./addRecipe/addRecipeMain";
import ShowRecipe from "./pages/ShowRecipe";
import ShowStory from "./pages/ShowStory"
import {AuthProvider} from "./contexts/AuthContext"
import FamilyPage from "./familyPage/FamilyPage"
import SandBox2 from "./ShowRecipeDir/ShowRecipeCopy"


import TestAddRecipeToFB from "./addRecipe/TestAddRecipeToFB";
import uploadImage from "./addRecipe/UploadImage";
import PrivateRoute from "./PrivateRoute";
import ImageCarousel from "./ShowRecipeDir/ImageCarousel";


function App() {
    const [showSignUp, setShowSignUp] = React.useState(false);

    function StartPage() {
        if (showSignUp) {
            return <SignUp setShowSignUp={setShowSignUp}/>;
        } else {
            return <GroupCode setShowSignUp={setShowSignUp}/>;
        }
    }

    function TempShowRecipe() {
        let { id } = useParams();
        return <ShowRecipe id={id}/>;
    }

    //TODO: shelly - use private routes
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <NavBar/>
                    <div className="content">
                        <Switch>
                            <Route exact path="/">
                                <div className="fix">
                                    <StartPage/>
                                </div>

                            </Route>

                            <Route path="/recipe/:id" children={<TempShowRecipe />} />
                            {/*<PrivateRoute path="/addstory" component={AddStory} />*/}
                            <PrivateRoute path="/main" component={FamilyPage} />
                            <Route path="/addstory" component={AddStory}/>
                            <Route path="/addrecipe" component={AddRecipeMain}/>
                            <Route path="/showrecipe" component={ShowRecipe}/>
                            <Route path="/showstory" component={ShowStory}/>
                            <Route path="/main" component={FamilyPage}/>
                            <Route path="/sandbox2" component={SandBox2}/>
                            <Route path="/test" component={ImageCarousel}/>
                        </Switch>

                    </div>
                </AuthProvider>
            </Router>
        </div>
    );
    // }
}

export default App;
