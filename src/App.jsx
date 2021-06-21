import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {useHistory, useParams} from "react-router";
import "./styles/app.css";
import GroupCode from "./pages/group-code";
import SignUp from "./pages/SignUp";
// import AddStory from "./pages/AddStory";
import NavBar from "./pages/NavBar";
// import ShowRecipe from "./pages/ShowRecipe";
// import ShowStory from "./pages/ShowStory"
import {useAuth, AuthProvider} from "./contexts/AuthContext";
// import SandBox2 from "./ShowRecipeDir/ShowRecipeCopy"
import ShowRecipeCopy from "./ShowRecipeDir/ShowRecipeCopy"
import ChooseUser from "./userSelect/ChooseUser";

//
// import TestAddRecipeToFB from "./addRecipe/TestAddRecipeToFB";
// import uploadImage from "./addRecipe/UploadImage";
import PrivateRoute from "./PrivateRoute";

import {Alert} from "react-bootstrap";
import ViewOnlyRecipe from "./ShowRecipeDir/ViewOnlyRecipe";
import FamilyPage from "./familyPage/FamilyPage";
import AddRecipeMain from "./addRecipe/addRecipeMain";
import NewStoryDropImg from "./addRecipe/NewStoryDropImg";


function App() {
    const [showSignUp, setShowSignUp] = React.useState(false);
    const history = useHistory();

    function StartPage() {
        const {currentUser, member} = useAuth();
        const history = useHistory();
        if (currentUser) {
            if (member) {
                return <FamilyPage/>;
            }
            history.push("/changeuser");
            return null;
            // return <ChooseUser/>;
        } else if (showSignUp) {
            return <SignUp setShowSignUp={setShowSignUp}/>;
        } else {
            return <GroupCode setShowSignUp={setShowSignUp}/>;
        }
    }

    function ShowRecipe() {
        let {id} = useParams();
        return <ShowRecipeCopy id={id}/>;
    }

    function EditRecipe() {
        let {id} = useParams();
        let {recipes, findRecipeInArr} = useAuth();
        return (<AddRecipeMain recipe={findRecipeInArr(recipes, id)}/>)
    }

    function ViewOnly() {
        let {group, key} = useParams();
        const {getSingleRecipe, viewOnly} = useAuth();
        // const [viewOnly, setViewOnly] = useState();
        // try {
            getSingleRecipe(group, key);
            //     .then(viewRecipe => {
            //     console.log("view-only "+viewRecipe);
            //     if (!viewRecipe) {
            //         return <Alert variant="danger">Invalid Recipe Link</Alert>
            //     }
            //     // return (<ViewOnlyRecipe recipe={viewRecipe}/>)
            // }); //TODO: maybe try to make async and use .then?
            // while (!viewOnly) {
            //
            // }
            if (viewOnly === -1) {
                return <Alert variant="danger">Invalid Recipe Link</Alert>
            }
            console.log("view-only "+viewOnly);
            return null;
            // return (<ViewOnlyRecipe recipe={viewRecipe}/>)
            // return <ShowRecipeCopy id={id}/>;
        // } catch (err) {
        //     return <Alert variant="danger">Invalid Recipe Link</Alert>
        // }
         //TODO: shelly - check it works
    }

    function LoginFromLink() {
        let {id} = useParams();
        const {login, currentUser, logout} = useAuth();

        if (currentUser) {
            logout().then(() => {
                login(id).then(() => {
                    history.push("/changeuser");
                }).catch(err => {
                    return <Alert variant="danger">Invalid Group Code: {err.message}</Alert>
                })
            })
        } else {
            login(id).then(() => {

                history.push("/changeuser");
            }).catch(err => {
                return <Alert variant="danger">Invalid Group Code: {err.message}</Alert>
            })
        }
        return <h1>Logging in with Group Code: {id}</h1>;

    }


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
                            <Route path="/family/:id" children={<LoginFromLink/>}/>
                            <Route path="/shared-recipe/:group/:key" children={<ViewOnly/>}/>
                            <PrivateRoute path="/recipe/:id" children={<ShowRecipe/>}/>
                            <PrivateRoute path="/edit/:id" children={<EditRecipe/>}/>
                            {/*<PrivateRoute path="/addstory" component={AddStory} />*/}
                            {/*<PrivateRoute path="/main" component={FamilyPage} />*/}
                            <PrivateRoute path="/addrecipe" component={AddRecipeMain} />
                            {/*<PrivateRoute path="/showrecipe" component={SandBox2}/>*/}
                            {/*<PrivateRoute path="/showstory" component={ShowStory}/>*/}
                            {/*<PrivateRoute path="/main" component={FamilyPage}/>*/}
                            {/*<PrivateRoute path="/sandbox2" component={SandBox2}/>*/}
                            {/*<PrivateRoute path="/chooseuser" component={ChooseUser}/>*/}
                            <PrivateRoute path="/changeuser" component={ChooseUser}/>
                            <PrivateRoute path="/test" component={NewStoryDropImg}/>
                        </Switch>

                    </div>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
