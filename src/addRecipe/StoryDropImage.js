import {DropzoneArea} from "material-ui-dropzone";
import {useEffect, useRef, useState} from "react";
import Button from "@material-ui/core/Button";
import {CircularProgress, makeStyles} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import clsx from "clsx";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";
import firebase from "firebase";
import {tempRecipe} from "./addRecipeMain";
import {PhotoCamera} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
        input: {
            display: 'none',
        },
        imgCenter: {
            alignItems: 'center',
            justifyContent: "centre",
            textAlign: 'center',
            margin: 'auto'
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative',
        },

        buttonSuccess: {
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700],
            },
        },
        fabProgress: {
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
        },
        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
        button: {
            background:
                "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(1)
        },


    }
));

export default function StoryDropImage(props) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [filesArr, setFilesArr] = useState()
    const [urlArr, setUrlArr] = useState([])

    const classes = useStyles();

    useEffect(() => {
        console.log("urlArr", urlArr);
        console.log("13", success)
    }, [success, urlArr])


    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    function resolveAfter2Seconds() {

        return new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, 2000);
        });
    }


    const uploadFile = async (files) => {
        if (!files) return;
        const storageRef = await firebase.storage().ref("images");
        for (const file of files) {
            let fileName = file.name;
            const fileRef = await storageRef.child(fileName)
            await fileRef.put(file).on(
                "state_changed",
                (snapshot) => {
                },
                error => {
                    console.log(error);
                },
                () => {
                    storageRef.child(fileName)
                        .getDownloadURL()
                        .then(url => {
                            setUrlArr([...urlArr, url]);
                        });
                }
            );
            await resolveAfter2Seconds()
        }
    }


    return (<div>
          <DropzoneArea
        acceptedFiles={['image/*']}
        dropzoneText={"Drag and drop an image here or click"}
        onChange={(files) => {
            setFilesArr(files);
            setSuccess(false)
        }
        }
    />
        <div className={classes.wrapper}>
            <Fab
                onClick={async () => {
                    setFilesArr([])
                    setLoading(true);
                    setSuccess(false)
                    const urlArrAwait = await uploadFile(filesArr)
                    setSuccess(true)
                    tempRecipe.setImages(urlArrAwait);
                    setLoading(false);

                }}
                component="span"
                aria-label="upload"
                color="primary"
                className={buttonClassname}>
                {success ? <CheckIcon/> : <SaveIcon lab> Save </SaveIcon>}
            </Fab>
            {loading && <CircularProgress
                size={64} className={classes.fabProgress}/>
            }
        </div>

    </div>)

}