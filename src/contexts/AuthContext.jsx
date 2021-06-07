import React, {useContext, useState, useEffect} from 'react'
import {auth, db} from "../firebase"
import firebase from 'firebase';
import {recipeConverter} from "../addRecipe/Recipe"
import {func} from "prop-types";

/**
 * Authentication context for user signup with firebase
 */

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider( {children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [gettingData, setGettingData] = useState(true);
    const [groupcode, setGroupcode] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [familyName, setFamilyName] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            if (user) {
                setGroupcode(user.uid);
                console.log("byee");
            }
            setLoading(false);
        })
        return unsubscribe;
    }, [setGroupcode])

    function addRecipe(recipe) {
        console.log(recipe)
        return db.collection('users').doc(groupcode).update({
                recipes: firebase.firestore.FieldValue.arrayUnion(recipeConverter.toFirestore(recipe))
            })
    }



    useEffect(() => {
        if(groupcode) {
            setGettingData(true);
            try {
                const fetchData=async()=>{
                    db.collection('users').doc(groupcode).get().then( doc => {
                        const allRecipes = doc.data().recipes;
                        const recipeArray = []
                        for (let i = 0; i < allRecipes.length; i++) {
                            recipeArray.push(recipeConverter.fromFirestore(allRecipes[i]))
                        }
                        setRecipes(recipeArray)
                        setFamilyName(doc.data().family_name)
                        setGettingData(false);
                        console.log("hi");

                    })
                }
                fetchData();
            } catch (err) {
                console.log(err.message);
            }
        } else {
            setRecipes([])
            setFamilyName("")
        }
    }, [groupcode, setRecipes, setFamilyName])

    function signup(email, password, familyname) {
        return auth.createUserWithEmailAndPassword(email, password).then(cred => {
            return db.collection("users").doc(cred.user.uid).set({
                admin_email: email,
                admin_password: password,
                family_name: familyname,
                members: [],
                recipes: []
            });
        });
    }


    function login(groupcode) {
        return db.collection("users").doc(groupcode).get().then(doc  => {
            if (doc.exists) {
                return auth.signInWithEmailAndPassword(doc.data().admin_email, doc.data().admin_password);
            } else {
                throw new Error("Group code " + groupcode + " does not exist");
            }
        })
    }

    function logout() {
        return auth.signOut()
    }

    const value = {
        addRecipe,
        currentUser,
        groupcode,
        // fetchData,
        familyName,
        recipes,
        login,
        signup,
        logout,

    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && !gettingData && children}
        </AuthContext.Provider>
    )
}
