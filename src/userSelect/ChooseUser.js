import React, {useRef, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {CssBaseline} from "@material-ui/core";
import s from "./Avatars/Body.png"
import s1 from "./Avatars/Body1.png"
import s2 from "./Avatars/Body2.png"
import s3 from "./Avatars/Body3.png"
import s4 from "./Avatars/Body4.png"
import s5 from "./Avatars/Body5.png"
import {Col, Radio, Row} from 'antd';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {useAuth} from "../contexts/AuthContext";
import Member from "./Member";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {Alert, Form} from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";


export const icons = [s, s1, s2, s3, s4, s5];

const useStyles = makeStyles(theme => ({
    font: {
        // color: 'rgba(80,13,9,0.9)',
    },
    backgroundImg: {
        backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/grandma-cooked-oatmeal.appspot.com/o/project%20files%2FallButTop.png?alt=media&token=dfef7639-c472-49bd-bc9a-faf47c45122c)`,
        height: "auto",
        // position: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
        backgroundAttachment: "fixed"
        // minHeight: "88.5vh"
    }, layout: {
        pa: "3px",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 800,
            height: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    title: {
        marginTop: "80px",
    },
    membersClass: {
        Width: 70,
        height: 200,
        // border: 0
    },
    margin: {
        margin: theme.spacing(1),
        width: "100px",
        height: "100px"
    },
    marginDialog: {
        margin: theme.spacing(1),
        width: "150px",
        height: "150px"
    },
    addIcon: {
        width: "100px",
        height: "100px",
        // marginTop:"30px"
    },
    ChosenMembersClassDialog: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        // -moz-box-shadow:    "inset 0 0 10px #000000",
        // -webkit-box-shadow:" inset 0 0 10px #000000",
        boxShadow: "inset 0 0 4px #000000",
        border: "1px solid #555",
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        }
    },
    membersClassDialog: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        }
    }
}))


export default function ChooseUser() {
    const history = useHistory();
    let {members} = useAuth();
    const getAllMembers = () => {
        const membersArr = []
        for (const member of {members}.members) {
            let element = {
                name: member.name,
                avatar: member.avatar,
                recipesNum: member.recipesNum,
                key: member.key,
            }
            membersArr.push(element);
        }
        return membersArr;
    }
    const classes = useStyles();
    const {setMember} = useAuth()

    function FormDialog() {
        const [selectedAvatar, setSelectedAvatar] = useState([0]);
        const {addMember} = useAuth();
        const [open, setOpen] = useState(false);
        const [error, setError] = useState("");
        const memberNameRef = useRef();


        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setError("")
            setOpen(false);
        };

        async function handleSave(e) {
            e.preventDefault();
            if (memberNameRef.current.value === '') {
                return setError("Please enter your Name!");
            }
            //create new member
            let toAdd = new Member(memberNameRef.current.value, selectedAvatar[0])
            addMember(toAdd);
            setMember(toAdd);
            setStorageMemberKey(toAdd.getMemberKey());
            history.push("/");
            setOpen(false);
        }

        return (
            <div>
                <Fab onClick={handleClickOpen} color="secondary" aria-label="add"
                     className={classes.marginDialog}>
                    <AddIcon className={classes.addIcon}/>
                </Fab>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle style={{textAlign: "center"}} id="form-dialog-title"><h2>Add
                        aChef</h2>
                    </DialogTitle>

                    <DialogContent>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <DialogContentText>
                            <b> Insert your Name </b>
                        </DialogContentText>
                        <Form.Control
                            // type="email"
                            // placeholder="Email"
                            ref={memberNameRef}
                            required
                        />
                        <br/> <br/>

                        <DialogContentText>
                            Choose your Avatar
                        </DialogContentText>

                        <Row style={{marginTop: "30px"}} gutter={[2, 2]}>
                            <Radio.Group name="radiogroup" defaultValue={0}>
                                {icons.map((icon, index) => (
                                    <Radio onClick={() => {
                                        setSelectedAvatar([index])
                                    }} value={index}>
                                        <br/>
                                        <Avatar
                                            className={selectedAvatar[0] === index ? classes.ChosenMembersClassDialog : classes.membersClassDialog}
                                            src={icon} alt={index}/>
                                    </Radio>
                                ))}
                            </Radio.Group>
                        </Row>
                    </DialogContent>

                    <DialogActions style={{marginRight: "30px"}}>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} color="secondary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    function ShowMembers(member, index) {
        return (<Col style={{display: "table-column"}} lg={8} md={12} sm={24}>
            <Button>
                <img onClick={() => {
                    setMember(member);
                    setStorageMemberKey(member.getMemberKey());
                    history.push("/");
                }} className={classes.membersClass}
                     src={icons[member.avatar]} alt={index}/>
            </Button>
            <br/> <br/>
            <h5><b>{member.name}</b></h5>
        </Col>);
    }

    const renderMembers = () =>
        members.map((member, index) => (
            <Col style={{display: "table-column"}} lg={8} md={12} sm={24}>
                <Button>
                    <img onClick={() => {
                        setMember(member);
                        setStorageMemberKey(member.getMemberKey());
                        history.push("/");
                    }} className={classes.membersClass}
                         src={icons[member.avatar]} alt={index}/>
                </Button>
                <br/> <br/>
                <h5><b>{member.name}</b></h5>
            </Col>))
    return (
        <div className={classes.backgroundImg}>
            <React.Fragment>
                <CssBaseline/>
                <main className={classes.layout}>
                    <div className={classes.title}>
                        <h1 style={{fontSize: "55px"}}>Who's cooking? </h1>
                    </div>
                    <div>
                        <Row style={{marginTop: "30px"}} gutter={[35, 35]}>
                            <Col lg={8} md={12} sm={24}>
                                <FormDialog/>
                                <h5 style={{marginTop: "30px"}}><b>Add Chef</b></h5>
                            </Col>
                            {members && members.map((member, index) => (ShowMembers(member, index)))}
                        </Row>
                    </div>
                </main>
            </React.Fragment>
        </div>
    )
}

export function setStorageMemberKey(key) {
    window.sessionStorage.setItem("curMemberKey", key);
}

export function getStorageMemberKey() {
    return window.sessionStorage.getItem("curMemberKey")
}

