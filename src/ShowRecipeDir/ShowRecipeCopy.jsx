import React, {useState, useRef} from "react";
import {Button, Card, Row, Col, Alert} from "react-bootstrap";
// import CardDeck from "react-bootstrap/CardDeck";
// import Nav from "react-bootstrap/Nav";
import "./ShowRecipeCopy.css";
import {useAuth} from "../contexts/AuthContext";
import {makeStyles} from "@material-ui/core/styles";
import {TextareaAutosize, TextField} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import Member from "../userSelect/Member";
import FaceBookShare from "../familyPage/FaceBookShare";
import WhatsAppShare from "../familyPage/WhatsAppShare";
import Avatar from "@material-ui/core/Avatar";
import {icons} from "../userSelect/ChooseUser";
import {element} from "prop-types";
import {Image} from "antd";
// import CardMedia from "@material-ui/core/CardMedia";
// import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        fontSize: "initial",
    },
    media: {
        height: 250,
        width: 500,
    },
    outer_div: {
        background: "url(https://firebasestorage.googleapis.com/v0/b/grandma-cooked-oatmeal.appspot.com/o/project%20files%2FleavesForksAppleMIDlen.png?alt=media&token=c8bc7ca2-0050-4ece-aa61-84b98eb33d84) no-repeat center center fixed",
        backgroundPosition: "top",
        backgroundSize: "cover",
    },
    container: {
        display: "flex",
        flexDirection: "column",
        maxWidth: "800px",
        margin: "0 auto",
    },
    header: {
        "& img": {
            width: "100%",
            height: "200px",
            objectFit: "cover",
        },
        "& h1": {
            textAlign: "center",
            fontSize: "4em",
            // flex: "1",

        },
        "& div": {
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            "& h1": {
                gridColumn: 2
            },
            "& span": {
                gridColumn: 3,
                justifySelf: 'end',
                alignSelf: "center",
            }
        },
        "& p": {
            textAlign: "center",
            fontSize: "initial",
        },
    },
    story: {
        marginTop: "20px",
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        columnGap: "20px",
        fontSize: "110%"
    },
    storyImages: {
        display: "grid",
        gridGap: "20px",
        "& img": {width: "100%"},
    },
    recipe: {
        paddingTop: "80px",
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: "15px",

    },
    notesAndButtons: {
        gridColumn: "1/-1",
        display: "grid",
        gridTemplateColumns: "1fr auto"
    },
    notes: {
        gridRow: "1/-1",
        gridColumn: "1",
    },
    recipeInfo: {
        display: "flex",
        justifyContent: "space-between",
        gridColumn: "1 / -1",
        fontSize: "20px",
    },
    editButton: {
        gridColumn: "2",
        // width: "",
        justifySelf: "end",
        background: '#f50057',
        marginLeft: "15px",
    },
    recipeIngredients: {
        fontSize: "large",
        "& li": {
            margin: "0 0 10px 0"

        },
    },
    li: {
        margin: "0 0 10px 0"
        // paddingBottom: "1rem",
    },
    recipeInstructions: {
        fontSize: "large",
    },

    tags: {
        gridColumn: "1 / -1",
        marginBottom: "0.9em"
    },

    comments: {
        borderTop: "outset",
        marginBottom: "40px",
    },
    comment: {
        display: "grid",
        gridTemplateColumns: "auto 1fr",
    },
    commentAuthor: {
        marginRight: "20px"
    },
    commentsItems: {
        display: "grid",
        gap: "20px",
    },
    commentInfo: {
        // borderRight: "outset",
        marginRight: "1em",
    },
    inputCommentsContainer: {
        display: "flex",
        // borderTop: "outset",
        "& button": {
            height: "40px",
            minWidth: "70px",
            margin: "auto",
            background: '#f50057',

        }
    },
    inputCommentsAuthor: {
        marginLeft: "5%",
        width: "75%",
        background: "white",
        opacity: "80%",
        marginTop: "auto",
        // borderRadius: "",
    },
    inputCommentsContent: {}
});

export default function ShowRecipe(props) {
    const {recipes, deleteRecipe, findMemberInArr} = useAuth();
    const history = useHistory();
    const [recipeDetails, setRecipeDetails] = useState(null);
    const commentRef = useRef();
    const {addComment, member, members} = useAuth();
    const classes = useStyles();

    function EditRecipeClick(id) {
        console.log("be")
        history.push("/edit/" + id)
    }

    function DeleteRecipeClick(id) {
        if (!window.confirm("Are you sure you want to delete this recipe?")) return;
        deleteRecipe(id)
        history.push("/")
    }


    function HandleCommentAdd() {

        const date = new Date();
        // console.log(recipeDetails);
        // console.log(commentRef.current.value, date.getDate() + "/" + (date.getMonth() + 1));

        addComment(recipeDetails.key, member.key, date.getDate() + "/" + (date.getMonth() + 1), commentRef.current.value);
    }

    function GetRecipe() {
        if (props.id && recipes) {
            // eslint-disable-next-line eqeqeq
            for (const recipe of recipes) {
                if (recipe.key == props.id) {
                    setRecipeDetails(recipe);
                    break;
                }
            }
            // setRecipeDetails(recipes.find(recipe => recipe.key == props.id));
        }
        if (recipeDetails) {

            return (
                <div className={classes.container}>
                    <Header recipe={recipeDetails}/>
                    <Story recipe={recipeDetails}/>
                    <Recipe recipe={recipeDetails}/>
                    {recipeDetails.comments &&
                    <Comments comments={recipeDetails.comments}/>
                    }
                    {!recipeDetails.comments &&
                    <Comments comments={recipeDetails.comments}/>}
                </div>);
        } else {
            return (<Alert variant="danger">Error: recipe does not exist!</Alert>);
        }

    }


    function Header({recipe}) {
        const classes = useStyles();
        const scrollToRecipe = () => {
            document.getElementById("recipeDetails").scrollIntoView({behavior: 'smooth'})
        }

        return (
            <div className={classes.header}>
                <img src={recipe.images[0]}/>
                <div>
                    <h1>{recipe.name}</h1>
                    <span>
                        <WhatsAppShare shareValue="blabla"/>
                        <FaceBookShare shereValue="url.com"/>
                        </span>
                </div>
                <p>
                    {recipe.uploadedBy === recipe.author ? <span> By {recipe.uploadedBy} </span> :
                        <span> Uploaded by {recipe.uploadedBy}, recipe by {recipe.author} </span>}
                    <br/>
                    don't want to read the whole story?{" "}
                    <Button variant="link" onClick={scrollToRecipe}>get straight to the food! </Button>
                </p>
            </div>
        );
    }

    function Story({recipe}) {
        const classes = useStyles();

        return (
            <div className={classes.story}>
                <div>{recipe.story.content}</div>
                <div className={classes.storyImages}>
                    {recipe.story.images && recipe.story.images.map((image, index) => (
                        <div id={index}>
                            <Image src={image}/></div>
                    ))}
                </div>
            </div>
        );
    }


    function Recipe(props) {
        const classes = useStyles();

        function Item(props) {
            return <li>{props.message} </li>;
        }

        return (
            <div className={classes.recipe} id="recipeDetails">
                <div className={classes.recipeInfo}>
                    {props.recipe.serving && <span>Servings: {props.recipe.serving} </span>}
                    {props.recipe.prepTime && <span>Preparation Time: {props.recipe.prepTime}</span>}
                    {props.recipe.getOvenHeatShowRecipe() !== "None" ?
                        <span>Oven Temperature: {props.recipe.ovenHeat}C </span> :
                        <span> </span>}
                </div>
                {/*{props.recipe.}*/}
                <div className={classes.notesAndButtons}>
                    {(props.recipe && props.recipe.getUploadedBy() && props.recipe.getUploadedBy() === member.name) && (
                        <Button className={classes.editButton} onClick={() => EditRecipeClick(props.recipe.key)}
                                variant="danger">Edit Recipe</Button>
                    )}
                    {(props.recipe.getUploadedBy() === member.name) && <Button className={classes.editButton}
                                                                               onClick={() => DeleteRecipeClick(props.recipe.key)}
                                                                               variant="danger">Delete Recipe</Button>}
                    <p className={classes.notes}>{props.recipe.notes}</p>
                </div>
                <div className={classes.recipeIngredients}>
                    <h2>Ingredients</h2>
                    <ul className="show_ingredients">
                        {props.recipe.getIngredientsListMap().map(message => {
                            return <Item key={message} message={message}/>;
                        })}
                    </ul>
                </div>
                <div className={classes.recipeInstructions}>
                    <h2>Instructions</h2>
                    <ol className="show_instruction">
                        {props.recipe.getStepsListMap().map(recipeStep => {
                            return <Item key={recipeStep} message={recipeStep}/>;
                        })}
                    </ol>
                </div>
                <div className={classes.tags}>
                    Tags & categories: {props.recipe.category} {props.recipe.tags}
                </div>
            </div>
        );
    }

    function Comment({comment}) {
        const classes = useStyles()
        let Commentmember;
        try {
            Commentmember = findMemberInArr(members, comment.author)
        } catch {
            Commentmember = {
                name: "test",
                avatar: 0
            }
        }

        return (
            <div className={classes.comment}>
                {/*<img alt="avatar"*/}
                {/*        src={icons[Commentmember.avatar]}/>*/}
                <div className={classes.commentInfo}>
                    {(Commentmember) && <Avatar src={icons[Commentmember.avatar]}/>}
                    {(Commentmember) &&
                    <span className={classes.commentAuthor}>
                        {Commentmember.name}</span>}
                    <span>{comment.date}</span>
                </div>
                <p>{comment.content}</p>
            </div>
        );
    }

    function Comments({comments}) {
        const classes = useStyles();
        return (
            <div className={classes.comments}>
                <h2>Comments</h2>
                <div className={classes.commentsItems}>
                    {comments.map((comment) => (
                        <Comment comment={comment}/>
                    ))}
                </div>
                <div className={classes.inputCommentsContainer}>
                    <div>
                        {member && member.name}
                        {member && <Avatar src={icons[member.avatar]}
                                           alt={3}/>} {/*set margin to this div and set position to center in the bigger div*/}
                    </div>
                    <TextareaAutosize className={classes.inputCommentsAuthor}
                                      ref={commentRef}
                                      aria-label="empty textarea" rowsMin={2.5}
                                      placeholder=" add a comment or memory - add to the story "/>
                    <Button
                        onClick={() => HandleCommentAdd()}
                        size="sm"
                        variant="danger">
                        save
                    </Button>
                </div>

            </div>
        );
    }


    return (
        <div className={classes.outer_div}>
            <GetRecipe/>
        </div>
    );
}


