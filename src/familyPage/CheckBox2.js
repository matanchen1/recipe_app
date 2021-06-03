import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd';

const { Panel } = Collapse


function CheckBox2(props) {

    const [Checked, setChecked] = useState([])
    const [CheckedDiet, setCheckedDiet] = useState([])

    const handleToggle = (value,type) => {

        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        props.handleFilters(newChecked,type)
        //update this checked information into Parent Component
    }

    const handleToggle2 = (value,type) => {

        const currentIndex = CheckedDiet.indexOf(value);
        const newCheckedDiet = [...CheckedDiet];

        if (currentIndex === -1) {
            newCheckedDiet.push(value)
        } else {
            newCheckedDiet.splice(currentIndex, 1)
        }
        setCheckedDiet(newCheckedDiet)
        props.handleFilters(newCheckedDiet,type)
        //update this checked information into Parent Component
    }



    const renderCheckboxLists = (type) => props.FoodTypeCatList && props.FoodTypeCatList.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox
                onChange={() => handleToggle(value._id,type)}
                type="checkbox"
                checked={Checked.indexOf(value._id) !== -1}
            />&nbsp;&nbsp;
            <span>{value.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </React.Fragment>
    ))
    const renderCheckboxLists2 = (type) => props.DietList && props.DietList.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox
                onChange={() => handleToggle2(value._id,type)}
                type="checkbox"
                checked={CheckedDiet.indexOf(value._id) !== -1}
            />&nbsp;&nbsp;
            <span>{value.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </React.Fragment>
    ))

    return (
        <div>
            <Collapse defaultActiveKey={['0']} >
                <Panel header="Food Type" key="1">
                    {renderCheckboxLists("FoodCategoryFilter")}
                </Panel>
                <Panel header="Special Diets" key="2">
                    {renderCheckboxLists2("DietFilter")}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox2
