import {useEffect, useRef, useState} from "react"
import firebase from "firebase";
import {tempRecipe} from "./addRecipeMain";
import {makeStyles} from "@material-ui/core";
import {PhotoCamera} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import {green} from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";

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


export default function UploadImage(FilesFlag) {
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const timer = useRef();
    const classes = useStyles();

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleFocusBack = () => {
        console.log('focus-back');
        setLoading(false);
        window.removeEventListener('focus', handleFocusBack);
    }

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
        }
        window.addEventListener('focus', handleFocusBack);
    };

    const upload = async (e) => {
        let target = e.target.files[0];
        if (!target) return;
        await setFile(target);
        const storageRef = await firebase.storage().ref("images");
        let fileName = target.name;
        const fileRef = await storageRef.child(fileName)

        // const response = await fetch(uri)
        // const blob = await response.blob()
        setLoading(true);
        await fileRef.put(target).on(
            "state_changed",
            (snapshot) => {
                setLoading(true);
            },
            error => {
                console.log(error);
            },
            () => {
                storageRef.child(fileName)
                    .getDownloadURL()
                    .then(url => {
                        setUrl(url);
                        const arr = [url,...(tempRecipe.getImageArr())]
                        tempRecipe.setImages(arr)
                        setLoading(false);
                        setSuccess(true);
                    });
            }
        );
    };


    console.log("url: ", url);


    function getPreviewImg() {
        if (url !== "") {
            return (<div className={classes.imgCenter}>
                <img src={url}
                     height="135" width="150"
                     alt="Recipe Photo"/>
            </div>)
        }
        return <div className={classes.imgCenter}/>
    }

    return (
        <div>
            <div className={classes.imgCenter}>
                <input accept="image/*" className={classes.input} id="icon-button-add-image-1" type="file"
                       onChange={upload}/>
                <Typography>Add photo (optional)</Typography>

                <label htmlFor="icon-button-add-image-1">
                    <div className={classes.wrapper}>
                        <Fab
                            onClick={handleButtonClick}
                            component="span"
                            aria-label="upload"
                            color="primary"
                            className={buttonClassname}>
                            {success ? <CheckIcon/> : <PhotoCamera/>}
                        </Fab>
                        {loading && <CircularProgress
                            size={64} className={classes.fabProgress}/>
                        }

                        {!loading && file != null &&
                        "     " + file.name}
                    </div>
                </label>
            </div>
            {getPreviewImg()}

            {/*{/{<LinearProgress variant="determinate" value={progress}/>}/}*/}
            {/*{/<input accept="image/" className={classes.input} id="icon-button-file" type="file"*!/*/}
            {/*/!*       onChange={upload}*!/*/}
            {/*{//>/}*/}
            {/*{/<label htmlFor="icon-button-file">/}*/}
            {/*/!*    <IconButton color="primary" aria-label="upload picture" component="span">*!/*/}
            {/*/!*        <PhotoCamera/>*!/*/}
            {/*/!*    </IconButton>*!/*/}
            {/*{/</label>/}*/}

            {/*// {/{/{file !== null &&/}/}*/}
            {/*// {/{/<Button className={classes.button}/}/}*/}
            {/*//!        startIcon={<CloudUploadIcon/>}!//}*/}
            {/*// {//!        onClick={upload}>!//}*/}
            {/*// {/{/</Button>/}/}*/}
            {/*// {//!    // <img src={url || "http://via.placeholder.com/300"} alt="firebase-image"/>!//}*/}
            {/*// {/{/}/}/}*/}
        </div>
    );

}