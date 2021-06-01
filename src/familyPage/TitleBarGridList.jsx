import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import MediaCard from "./mediaCard";
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';

const useStyles = makeStyles((theme) => ({
    root: {
        zoom: "100%",
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
    if (props.Dishes.length === 0)
        return (
                <h1>
                    Empty for now. add a recipe!
                </h1>
        )
    else
        return (
            <div className={classes.root}>
                <GridList spacing={70} cellWidth={getGridListCols() * 100} cellHeight={"auto"}
                          cols={getGridListCols()}>
                    {props.Dishes.map((tile) => (
                        <GridListTile>
                            <MediaCard img={tile.img} title={tile.title} author={tile.author}
                                       text={tile.text} alignItems="center"
                                       justify="center"/>
                        </GridListTile>
                    ))}

                </GridList>
            </div>
        );
}
export default withWidth()(TitleBarGridList);


//
// function plus(cols) {
//     if (cols === 2) {
//         return <AddBoxOutlinedIcon
//             style={{
//                 fontSize: plus_size_dictionary[cols]
//                 , color: "rgba(13,24,6,0.88)", margin: "0.5em 0 0 0.85em",
//             }}
//         />
//     }
//     return <AddBoxOutlinedIcon
//         style={{
//             fontSize: plus_size_dictionary[cols]
//             , color: "rgba(13,24,6,0.88)", marginTop: "0.15em"
//         }}
//     />
// }

{/*<GridListTile>*/
}
{/*    <label htmlFor="icon-button-file">*/
}
{/*        <IconButton size={"medium"} color="success"*/
}
{/*                    aria-label="upload picture"*/
}
{/*                    component="span">*/
}
{/*            {plus(getGridListCols())}*/
}
{/*        </IconButton>*/
}
{/*    </label>*/
}
{/*</GridListTile>*/
}
