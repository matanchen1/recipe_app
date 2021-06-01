import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import StoryDialog from './StoryDialog'
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        backgroundColor: "transparent"
    },
    media: {
        height: 240,
    borderRadius:"12%",
    textAlign:"center"},
});

export default function MediaCard(props) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Card className={classes.root}  onClick={()=> history.push("/showrecipe")}>
            <CardActionArea >
                <CardMedia
                    className={classes.media}
                    image={props.img}
                    title={props.title}
                />

                    <Typography gutterBottom variant="h5" component="h4">
                        {props.title}
                    </Typography>
                <Typography gutterBottom style={{fontSize:"1em"}} variant="h6" component="h5">
                    {props.author}
                </Typography>
            </CardActionArea>
            <CardActions>
                    <StoryDialog title={props.title} text={props.text} img = {props.img}/>
            </CardActions>
        </Card>
    );
}

