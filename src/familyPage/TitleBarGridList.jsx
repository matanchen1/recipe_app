import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import tileData from '../familyPage/tileData.js';
import {useHistory} from "react-router-dom";
import MediaCard from "./mediaCard";
import IconButton from "@material-ui/core/IconButton";

import withWidth, {isWidthUp} from '@material-ui/core/withWidth';

const plus_size_dictionary = {
    2: '135px',
    3: '230px',
    4: '300px'
};

const useStyles = makeStyles((theme) => ({


// }
    root: {
        zoom: "100%",
        // display: 'flex',
        // flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        background: "none",
    },
    gridList: {
        width: "auto",
        height: "auto"
    }
}));


/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
const TitleBarGridList = props => {
    const getGridListCols = () => {
        if (isWidthUp('md', props.width)) {
            return 3;
        }
        return 2;
    }
    const classes = useStyles();
    const history = useHistory();

    function plus(cols) {
        if (cols === 2) {
            return <AddBoxOutlinedIcon
                style={{
                    fontSize: plus_size_dictionary[cols]
                    , color: "rgba(13,24,6,0.88)", margin: "0.5em 0 0 0.85em",
                }}
                onClick={() => history.push("/addrecipe")}/>
        }
        return <AddBoxOutlinedIcon
            style={{
                fontSize: plus_size_dictionary[cols]
                , color: "rgba(13,24,6,0.88)",marginTop:"0.15em"
            }}
            onClick={() => history.push("/addrecipe")}/>
    }


    return (
        <div className={classes.root}>
            <GridList spacing={70} cellWidth={getGridListCols() * 100} cellHeight={"auto"}
                      cols={getGridListCols()}
                      className={classes.gridList}>
                <GridListTile>
                    <label htmlFor="icon-button-file">
                        <IconButton size={"medium"} color="success" aria-label="upload picture"
                                    component="span">
                            {plus(getGridListCols())}
                        </IconButton>
                    </label>
                </GridListTile>


                {tileData.map((tile) => (
                    <GridListTile>
                        <br/>
                        <MediaCard img={tile.img} title={tile.title} author={tile.author}
                                   text={tile.text} />
                    </GridListTile>
                ))}

            </GridList>
        </div>
    );
}
export default withWidth()(TitleBarGridList);
