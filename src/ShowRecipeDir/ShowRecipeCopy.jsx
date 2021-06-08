import React from "react";
import { Button, Card, Row, Col, Alert } from "react-bootstrap";
import CardDeck from "react-bootstrap/CardDeck";
import Nav from "react-bootstrap/Nav";
import "../styles/ShowRecipe.css";
import { useAuth } from "../contexts/AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
    width: 500,
  },
  outer_div: {
  //  put background
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
    },
    "& p": {
      textAlign: "center",
    },
  },
  story: {
    marginTop: "20px",
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    columnGap: "20px",
  },
  storyImages: {
    display: "grid",
    gridGap: "20px",
    "& img": { width: "100%" },
  },
  recipe: {
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: "20px",
  },
  recipeInfo: {
    display: "flex",
    justifyContent: "space-between",
    gridColumn: "1 / -1",
    fontSize: "20px",
  },
  recipeIngredients: {},
  recipeInstructions: {},
  comments: {},
  commentAuthor: {
    marginRight: "40px"
  },
  commentsItems: {
    display: "grid",
    gap: "20px",
  }
});

export default function ShowRecipe(props) {
  const { recipes } = useAuth();

  const classes = useStyles();

  const recipe = {
    ...recipes[0],
    story: {
      content:
          "היי היי!  לפני שבועיים עלה לבלוג גלאט פטל מבצק ספידי שהיה הצלחה מסחררת.  אחרי שהוא עלה הותקפתי בהודעות ששואלות איך אפשר לעשות את הבצק הזה מלוח.  ואני מבינה אתכן, זה בצק מושלם, הכי קל לעבודה, הכי מהיר להכנה ומתאים להכל.  אני מכינה אותו מלוח המון בבית בכל מיני צורות וטעמים אז ברגע שביקשתן קפצתי על המציאה להעלות מתכון לזה בבלוג.  בחרתי להכין מהבצק שבלולי פסטו וגבינות טבעוניות כי זה קל וטעים וכולם אוהבים את זה 🙂",
      images: [
        "https://tivoneat.co.il/wp-content/uploads/2021/06/IMG_0231.jpg",
      ],
    },
  };

  const default_comments = [
    { author: "sivan", date: 12346645452, content: "וואי סבתא, פינקת." },
    {
      author: "דן",
      date: 12346645455,
      content: "סבא היה עושה את זה יותר טעים.",
    },
    {
      author: "sivan",
      date: 12346645452,
      content: "דן, יא מאנייק, הוא מת מזמן כבר.",
    },
    {
      author: "דן",
      date: 12346645455,
      content: "וסבתא עדיין לא שיפרה את הגרסה שלה מאז",
    },
  ];


  return (
      <div className="outer_div">
        {props.id && recipes && recipes.length <= props.id &&
        <Alert variant="danger">Error: recipe does not exist!</Alert>}
        {props.id && recipes.length > props.id &&
        <div className={classes.container}>
          <Header recipe={recipes[props.id]} />
          <Story recipe={recipes[props.id]} />
          <Recipe recipe={recipes[props.id]} />
          {recipes[props.id].comments &&
          <Comments comments={recipes[props.id].comments} />
          }
          {!recipes[props.id].comments &&
          <Comments comments={default_comments} /> }
        </div>
        }
      </div>
  );
}

function Header({ recipe }) {
  const classes = useStyles();

  return (
      <div className={classes.header}>
        <img src={recipe.images[0]} />
        <h1>{recipe.name}</h1>
        <p>
          don't want to read the whole story?{" "}
          <a href="#recipeDetails">get straight to the recipe </a>
        </p>
      </div>
  );
}

function Story({ recipe }) {
  const classes = useStyles();

  return (
      <div className={classes.story}>
        <div>{recipe.story.content}</div>
        <div className={classes.storyImages}>
          {recipe.story.images.map((image) => (
              <img src={image} />
          ))}
        </div>
      </div>
  );
}

function Recipe({ recipe }) {
  const classes = useStyles();

  function Item(props) {
    return <li>{props.message}</li>;
  }

  return (
      <div className={classes.recipe} id = "recipeDetails">
        <div className={classes.recipeInfo}>
          {recipe.author && <span>By: {recipe.author} </span>}
          {recipe.serving && <span>Servings: {recipe.serving} </span>}
          {recipe.prepTime && <span>Preparation Time: {recipe.prepTime}</span>}
        </div>
        <div className={classes.recipeIngredients}>
          <h2>Ingredients</h2>
          <ul className="show_ingredients">
            {recipe.IngredientsList.map(message => {
              return <Item key={message} message={message}/>;
            })}
          </ul>
        </div>
        <div className={classes.recipeInstructions}>
          <h2>Instructions</h2>
          <ol className="show_instruction">
            {recipe.instructionDetails.map(recipeStep => {
              return <Item key={recipeStep} message={recipeStep}/>;
            })}
          </ol>
        </div>
        <button variant="outline-success">Edit Recipe</button>
      </div>
  );
}

function Comment({ comment }) {
  const classes = useStyles()
  return (
      <div>
        <span className={classes.commentAuthor}>{comment.author}</span>
        <span>{comment.date}</span>
        <p>{comment.content}</p>
      </div>
  );
}

function Comments({ comments }) {
  const classes = useStyles();

  return (
      <div>
        <h2>Comments</h2>
        <div className={classes.commentsItems}>
          {comments.map((comment) => (
              <Comment comment={comment} />
          ))}
        </div>
      <div>djfsklsdfsj</div>
      </div>
  );
}