import React, {useEffect} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {useHistory, useParams} from "react-router";
import "./styles/app.css";
import GroupCode from "./pages/group-code";
import SignUp from "./pages/SignUp";
import AddStory from "./pages/AddStory";
import NavBar from "./pages/NavBar";
import AddRecipeMain from "./addRecipe/addRecipeMain";
import ShowRecipe from "./pages/ShowRecipe";
import ShowStory from "./pages/ShowStory"
import {AuthProvider, useAuth} from "./contexts/AuthContext"
import FamilyPage from "./familyPage/FamilyPage"
import SandBox2 from "./ShowRecipeDir/ShowRecipeCopy"
import ShowRecipeCopy from "./ShowRecipeDir/ShowRecipeCopy"

//
// import TestAddRecipeToFB from "./addRecipe/TestAddRecipeToFB";
// import uploadImage from "./addRecipe/UploadImage";
import PrivateRoute from "./PrivateRoute";
import AddStoryRecipe from "./addRecipe/AddStoryRecipe";
import {db} from "./firebase";
import {recipeConverter} from "./addRecipe/Recipe";
import {Alert} from "react-bootstrap";

function App() {
    const [showSignUp, setShowSignUp] = React.useState(false);

    function StartPage() {
        const {currentUser} = useAuth();
        if (currentUser) {
            return <FamilyPage/>;
        }
        else if (showSignUp) {
            return <SignUp setShowSignUp={setShowSignUp}/>;
        } else {
            return <GroupCode setShowSignUp={setShowSignUp}/>;
        }
    }

    function ShowRecipe() {
        let { id } = useParams();
        return <ShowRecipeCopy id={id}/>;
    }

    function LoginFromLink() {
        // TODO: shelly - check this!
        let {id} = useParams();
        const { login, currentUser, logout} = useAuth();
        const history = useHistory();
        if(currentUser) {
            logout().then(() => {
                login(id).then(() => {
                    history.push("/");
                }).catch(err => {
                    return <Alert variant="danger">Invalid Group Code: {err.message}</Alert>
                })
            })
        }
        else {
            login(id).then(() => {
                history.push("/");
            }).catch(err => {
                return <Alert variant="danger">Invalid Group Code: {err.message}</Alert>
            })
        }
        return null;
        // let {code} = useParams();
        // const { setLoading, setError, login} = useAuth();
        // const history = useHistory();
        // try {
        //     setError("");
        //     setLoading(true);
        //     await login(code);
        //     history.push("/");
        // } catch (err) {
        //     setError(err.message);
        // }
        // setLoading(false);
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
                            <Route path="/family/:id" children={<LoginFromLink/>} />
                            <PrivateRoute path="/recipe/:id" children={<ShowRecipe />} />
                            <PrivateRoute path="/addstory" component={AddStory} />
                            {/*<PrivateRoute path="/main" component={FamilyPage} />*/}
                            <PrivateRoute path="/addrecipe" component={AddRecipeMain}/>
                            <PrivateRoute path="/showrecipe" component={SandBox2}/>
                            <PrivateRoute path="/showstory" component={ShowStory}/>
                            <PrivateRoute path="/main" component={FamilyPage}/>
                            <PrivateRoute path="/sandbox2" component={SandBox2}/>
                            <PrivateRoute path="/test" component={AddStoryRecipe}/>
                        </Switch>

                    </div>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
