import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    }, nested: {
        paddingLeft: theme.spacing(2),
    },
}));

export default function CheckboxListSecondary(props) {

    const classes = useStyles();
    const [checked, setChecked] = React.useState([1]);
    const values = props.values

    useEffect(()=>{
        console.log("value",Object.keys(values))
    },[values])
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        console.log("newChecked",checked)

        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
            props.clickChange(props.stateNum, value)

        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        console.log("check", newChecked)
        props.handlefilter();
    }
    return (
        <List dense className={classes.root}>
            {Object.keys(values).map((value) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                    <ListItem key={value} button className={classes.nested}>
                        {/*<ListItemIcon>*/}
                        {/*    maybe avatars in case of users?*/}
                        <span className="badge badge-primary badge-pill"
                              style={{
                                  background: "#269026",
                                  fontSize: "12px"
                              }}>{5}</span>
                        {/*</ListItemIcon>*/}
                        &nbsp;
                        <ListItemText id={labelId} primary={`${value}`}/>
                        <ListItemSecondaryAction>
                            <Checkbox
                                edge="end"
                                checked={checked.indexOf(value) !== -1 }
                                onChange={handleToggle(value)}
                                handlefilter={props.handlefilter}
                                inputProps={{'aria-labelledby': labelId}}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
}
