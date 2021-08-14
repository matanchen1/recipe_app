import React, {useContext, useState, useEffect} from 'react'
import {auth, db} from "../firebase"
import firebase from 'firebase';
import {recipeConverter} from "../addRecipe/Recipe";

import {memberConverter} from "../userSelect/Member";
import {getStorageMemberKey, setStorageMemberKey} from '../userSelect/ChooseUser'


/**
 * Authentication context for user signup with firebase
 */

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [member, setMember] = useState(null)
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [gettingData, setGettingData] = useState(true);
    const [groupcode, setGroupcode] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [familyName, setFamilyName] = useState("");
    const [updateValue, setUpdateValue] = useState(0);
    const [members, setMembers] = useState([]);
    const [familyImgUrl, setFamilyImgUrl] = useState([]);
    const [viewOnly, setViewOnly] = useState();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            if (user) {
                setGroupcode(user.uid);
                console.log("updated groupcode");
            }
            setLoading(false);
        })
        return unsubscribe;
    }, [setGroupcode])

    async function changeFamilyImg(imgUrl) {
        db.collection('users').doc(groupcode).get().then(doc => {
            db.collection('users').doc(groupcode).update({
                FamilyImgUrl: imgUrl
            }).then(() => {
                return true;
            })
        })
    }

    function addRecipe(recipe) {
        db.collection('users').doc(groupcode).get().then(doc => {
            const key = doc.data().key_counter;
            recipe.setKey(key);
            db.collection('users').doc(groupcode).update({
                key_counter: key + 1,
                recipes: firebase.firestore.FieldValue.arrayUnion(recipeConverter.toFirestore(recipe))
            })
        })

    }


    function addMember(member) {
        let dataDoc = db.collection('users').doc(groupcode);

        dataDoc.get().then(doc => {
            const key = doc.data().member_key_counter;
            member.setMemberkey(key);
            dataDoc.update({
                member_key_counter: key + 1
            }).then(() => {
                return dataDoc.update({
                    members: firebase.firestore.FieldValue.arrayUnion(memberConverter.toFirestore(member))
                })
            })
        })
    }


    function ForceFetchData() {
        setUpdateValue(updateValue => updateValue + 1);
    }

    useEffect(() => {
        setGettingData(true);
        if (groupcode) {
            try {
                const fetchData = async () => {
                    db.collection('users').doc(groupcode).get().then(doc => {
                        //fetch members
                        const allMembers = doc.data().members;
                        const memberArray = []
                        for (let i = 0; i < allMembers.length; i++) {
                            memberArray.push(memberConverter.fromFirestore(allMembers[i]))
                        }
                        console.log("start", memberArray)
                        console.log("Storage", getStorageMemberKey())
                        console.log(findMemberInArr(memberArray, getStorageMemberKey()))
                        console.log(memberArray, "5555555")
                        setMembers(memberArray)
                        let key = getStorageMemberKey();
                        if (key != '-1') {
                            let tempMember = memberArray[0];
                            for (let i = 0; i < memberArray.length; i++) {
                                if (memberArray[i].getMemberKey() == key) {
                                    tempMember = memberArray[i];
                                    setMember(tempMember);
                                }
                            }
                            setMember(tempMember);
                        }
                        //fetch recipes
                        setFamilyImgUrl(doc.data().FamilyImgUrl)
                        setFamilyName(doc.data().family_name)
                        const allRecipes = doc.data().recipes;
                        const recipeArray = []
                        for (let i = allRecipes.length - 1; i >= 0; i--) {
                            recipeArray.push(recipeConverter.fromFirestore(allRecipes[i]))
                        }
                        setRecipes(recipeArray)
                        setGettingData(false);
                        console.log("reloaded data");
                    })
                }
                fetchData();
            } catch (err) {
                console.log(err.message);
            }
        } else {
            setRecipes([]);
            setFamilyName("");
            setMembers([]);
            setMember(null);
            setGettingData(false);
        }

    }, [groupcode, updateValue])

    function signup(email, password, familyname) {
        return auth.createUserWithEmailAndPassword(email, password).then(cred => {
            return db.collection("users").doc(cred.user.uid).set({
                admin_email: email,
                admin_password: password,
                family_name: familyname,
                members: [],
                recipes: [],
                key_counter: 0,
                member_key_counter: 0,
                FamilyImgUrl: "https://firebasestorage.googleapis.com/v0/b/grandma-cooked-oatmeal.appspot.com/o/images%2FFamilyPicture.jpg?alt=media&token=afb61411-d50a-492f-a048-06da1cc2777e"
            });
        });
    }

    async function addFavourite(memberKey, recipeKey, removeFlag = false) {
        const memberByKey = await findMemberInArr(members, memberKey);
        await db.collection('users').doc(groupcode).update({
            members: firebase.firestore.FieldValue.arrayRemove(memberConverter.toFirestore(memberByKey))
        })
        await db.collection('users').doc(groupcode).update({
            members: firebase.firestore.FieldValue.arrayUnion(memberConverter.toFirestore(memberByKey.addFavouriteToArray(recipeKey, removeFlag)))
        }).then();
    }

    function findMemberInArr(membersArr, key) {
        console.log("insidefunc", membersArr)
        for (let i = 0; i < membersArr.length; i++) {
            if (membersArr[i].getMemberKey() === key) {
                return membersArr[i];
            }
        }
        return membersArr[0];
    }


    function addComment(key, author, date, content, imgUrl = "") {
        const recipeByKey = findRecipeInArr(recipes, key);
        db.collection('users').doc(groupcode).update({
            recipes: firebase.firestore.FieldValue.arrayRemove(recipeConverter.toFirestore(recipeByKey))
        }).then(() => {
            recipeByKey.addComment(author, date, content,imgUrl);
            return db.collection('users').doc(groupcode).update({
                recipes: firebase.firestore.FieldValue.arrayUnion(recipeConverter.toFirestore(recipeByKey))
            }).then(() => {
                ForceFetchData();
            })
        })
    }

    function resolveAfter2Seconds() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, 2000);
        });
    }


    const getOldRecipes = async () => {
        const recipeArray = []
        await db.collection('users').doc(groupcode).get().then(doc => {
            const allRecipes = doc.data().recipes;
            for (let i = allRecipes.length - 1; i >= 0; i--) {
                recipeArray.push(recipeConverter.fromFirestore(allRecipes[i]))
            }
        })
        return recipeArray;
    }

    function findRecipeInArr(recipeArray, key) {
        for (let i = 0; i < recipeArray.length; i++) {
            if (recipeArray[i].key == key) {
                return recipeArray[i];
            }
        }
        return recipeArray[0];
    }


    async function editRecipe(newRecipe) {
        const recipeArray = await getOldRecipes()
        const key = newRecipe.key
        await db.collection('users').doc(groupcode).update({
            recipes: firebase.firestore.FieldValue.arrayUnion(recipeConverter.toFirestore(newRecipe))
        })
        let res = await resolveAfter2Seconds()
        let recipeByKey = findRecipeInArr(recipeArray, key);
        await db.collection('users').doc(groupcode).update({
            recipes: firebase.firestore.FieldValue.arrayRemove(recipeConverter.toFirestore(recipeByKey))
        })
        res = await resolveAfter2Seconds()
        if (res !== null) ForceFetchData();
    }

    function deleteRecipe(key) {
        const recipeByKey = findRecipeInArr(recipes, key);
        db.collection('users').doc(groupcode).update({
            recipes: firebase.firestore.FieldValue.arrayRemove(recipeConverter.toFirestore(recipeByKey))
        }).then(() => {
            ForceFetchData();
        })
    }


    function getSingleRecipe(code, key) {
        return db.collection('users').doc(code).get().then(doc => {
            const allRecipes = doc.data().recipes;
            console.log("getting single recipe");
            for (let i = 0; i < allRecipes.length; i++) {
                if (allRecipes[i].key == key) {
                    const recipe = recipeConverter.fromFirestore(allRecipes[i]);
                    setViewOnly(recipe);
                    return;
                }
            }
            throw new Error();
        }).catch(() => {
            throw new Error("Recipe does not exist");
        })
    }


    function login(groupcode) {
        return db.collection("users").doc(groupcode).get().then(doc => {
            if (doc.exists) {
                return auth.signInWithEmailAndPassword(doc.data().admin_email, doc.data().admin_password);
            } else {
                throw new Error("Family Code " + groupcode + " does not exist");
            }
        })
    }

    function loginWithEmail(email, pass) {
        return auth.signInWithEmailAndPassword(email, pass);
    }

    function logout() {
        return auth.signOut().then(() => {
                setStorageMemberKey(-1);
                setMember(null);
                setMembers([]);

            }
        )
    }

    const value = {
        addMember,
        addRecipe,
        currentUser,
        groupcode,
        ForceFetchData,
        deleteRecipe,
        getSingleRecipe,
        addComment,
        editRecipe,
        familyName,
        recipes,
        viewOnly,
        loginWithEmail,
        login,
        signup,
        logout,
        members,
        setMember,
        member,
        setLoading,
        changeFamilyImg,
        addFavourite,
        familyImgUrl,
        setStorageMemberKey,
        findRecipeInArr,
        findMemberInArr,
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && !gettingData && children}
        </AuthContext.Provider>
    )
}

