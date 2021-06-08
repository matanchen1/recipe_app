import React, {useState} from 'react'
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

// const {Panel} = Collapse


function CheckBox2(props) {
    const [Checked, setChecked] = useState([])
    const [CheckedDiet, setCheckedDiet] = useState([])
    const [open, setOpen] = React.useState(true);
    const [open2, setOpen2] = React.useState(true);


    const handleToggle = (value, type) => {

        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        props.handleFilters(newChecked, type)
        //update this checked information into Parent Component
    }

    const handleToggle2 = (value, type) => {

        const currentIndex = CheckedDiet.indexOf(value);
        const newCheckedDiet = [...CheckedDiet];

        if (currentIndex === -1) {
            newCheckedDiet.push(value)
        } else {
            newCheckedDiet.splice(currentIndex, 1)
        }
        setCheckedDiet(newCheckedDiet)
        props.handleFilters(newCheckedDiet, type)
        //update this checked information into Parent Component
    }


    const renderCheckboxLists = (type) => props.FoodTypeCatList && props.FoodTypeCatList.map((value, index) => (
        <div>
            <React.Fragment key={index}>
                <Checkbox
                    onChange={() => handleToggle(value._id, type)}
                    type="checkbox"
                    checked={Checked.indexOf(value._id) !== -1}
                />&nbsp;&nbsp;
                <span>{value.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </React.Fragment>
        </div>
    ))
    const renderCheckboxLists2 = (type) => props.DietList && props.DietList.map((value, index) => (
        <div>
        <React.Fragment key={index}>
            <Checkbox
                onChange={() => handleToggle2(value._id, type)}
                type="checkbox"
                checked={CheckedDiet.indexOf(value._id) !== -1}
            />&nbsp;&nbsp;
            <span>{value.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </React.Fragment>
        </div>
    ))

    return (
        <div className={"filterHeader"}>
            {/*<Collapse defaultActiveKey={['0']} >*/}
            {/*<Panel header="Food Type" key="1"/>*/}
            <ListItem button onClick={() => {
                setOpen(!open);
            }}>
                <ListItemText primary={"Food Type"}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {renderCheckboxLists("FoodCategoryFilter")}
                </List>
            </Collapse>
            <ListItem button onClick={() => {
                setOpen2(!open2);
            }}>
                <ListItemText primary={"Diet Filter"}/>
                {open2 ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={open2} timeout="auto" unmountOnExit>
                <List>
                    {/*component="div" disablePadding*/}
                    {renderCheckboxLists2("DietFilter")}
                </List>
            </Collapse>
        </div>
    )
}

export default CheckBox2
