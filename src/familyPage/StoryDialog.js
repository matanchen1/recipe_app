import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import MenuBookIcon from "@material-ui/icons/MenuBook";
import {Image} from "react-bootstrap";
import {Grid} from "@material-ui/core";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function StoryDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button size="small" color="secondary" variant="outlined"  onClick={handleClickOpen}>
                <b>Story&nbsp;&nbsp;</b>
                <MenuBookIcon />
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    The story of the plate:
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container xs={12} spacing={30}>
                        <Grid item xs={4}>
                            <br/><br/><br/><br/><br/>
                            <Typography gutterBottom style={{fontSize: "2em"}}>
                                {props.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}/>
                        <Grid item xs={4}>

                            <Image className="img-thumbnail"
                                   style={{maxHeight: "250px", alignContent: "center"}}
                                   src={props.img}
                                   alt="family's img"/>
                        </Grid>
                    </Grid>
                    <br/><br/>
                    <Typography  style={{padding:"12px"}} gutterBottom>
                        {props.text}
                    </Typography>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Back
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
