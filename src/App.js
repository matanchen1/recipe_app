import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
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

function App() {
  const [showSignUp, setShowSignUp] = React.useState(false);

  function StartPage() {
    if (showSignUp) {
      return <SignUp setShowSignUp={setShowSignUp}/>;
    } else {
      return <GroupCode setShowSignUp={setShowSignUp}/>;
    }
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
                {/* <PrivateRoute path="/addstory" component={AddStory} />



                             */}
                <Route path="/addstory" component={AddStory}/>
                <Route path="/addrecipe" component={AddRecipeMain}/>
                <Route path="/showrecipe" component={ShowRecipe}/>
                <Route path="/showstory" component={ShowStory}/>
                <Route path="/main" component={FamilyPage}/>
              </Switch>

            </div>
          </AuthProvider>
        </Router>
      </div>
  );
  // }
}

export default App;
