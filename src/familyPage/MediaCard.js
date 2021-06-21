import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import 'antd/dist/antd.css';
import {Card} from 'antd';
import {useHistory} from "react-router-dom";
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import IconButton from "@material-ui/core/IconButton";
import {useAuth} from "../contexts/AuthContext";
import {icons} from "../userSelect/ChooseUser";
import StoryDialog from "./StoryDialog";
import StarIcon from '@material-ui/icons/Star';
import Member from '../userSelect/Member'

const {Meta} = Card;

export default function MediaCard(props) {
    const history = useHistory();
    const {member, members, addFavourite} = useAuth();
    const recipePath = "/recipe/"
    const [memberFav, setMemberFav] = useState(member.getFavourites());

    const [render, setrender] = useState(false)
    useEffect(() => {
        console.log("memberFaUSEffect", memberFav)
    },[memberFav])

    function getAvatar() {
        let avatar = null;
        const uploadedBy = props.recipe.getUploadedBy()
        for (let i = 0; i < members.length; i++) {
            if (uploadedBy === members[i].name) {
                avatar = members[i].getAvatarIndex();
            }
        }
        console.log(avatar)
        return (
            <Avatar alt="avatar"
                    src={icons[avatar]}/>)
    }

    function renderFavBtn(memberFav, recipeKey) {
        console.log("memberFAV", memberFav)

        return (!memberFav || !memberFav.has(recipeKey)) ?
            (
                <StarOutlineIcon style={{fill: "#e5a407"}} key="ellipsis" onClick={async () => {
                    let tempMemberFav = new Set([...memberFav])
                    tempMemberFav.add(recipeKey)
                    setMemberFav(tempMemberFav)
                    await addFavourite(memberFav.key, recipeKey)
                }}/>)
            :
            (
                <StarIcon style={{fill: "#e5a407"}} key="ellipsis" onClick={async () => {
                    let tempMemberFav = new Set([...memberFav])
                    tempMemberFav.delete(recipeKey);
                    setMemberFav(tempMemberFav)
                    await addFavourite(memberFav.key, recipeKey, true)
                }}/>);
    }

    return (
        <Card hoverable={true}
              style={{width: "100%", maxWidth: "350px"}}
              cover={
                  <img style={{height: 225, objectFit: "cover", objectPosition: "center"}}
                       alt="example"
                       src={props.img}
                       onClick={() => {
                           history.push({
                               pathname: recipePath + props.recipeIndex,
                               author: props.author,
                               recipe: props.recipe,
                           })
                       }
                       }
                  />
              }
              actions={[
                  <IconButton size={"small"} color="primary" aria-label="upload picture"
                              component="span">
                      <FavoriteBorderIcon color={"secondary"} key="Like" onClick={() => {
                          console.log(member)
                      }}/>
                  </IconButton>,
                  // <WhatsAppIcon style={{fill: "#2faf27"}} key="ellipsis"/>,
                  <IconButton size={"small"} aria-label="upload picture" component="span">
                      {renderFavBtn(memberFav, props.recipe.key,render)}
                  </IconButton>,
                  <StoryDialog title={props.title} text={props.recipe.getStoryContent()}
                               author={props.author}
                               img={props.img}/>,
              ]}

        >
            <Meta
                onClick={() => history.push({
                    pathname: recipePath + props.recipeIndex,
                    author: props.author,
                    recipe: props.recipe,
                })
                }
                avatar={getAvatar()}
                title={<span style={{fontSize: 21, maxWidth: 150}}>{props.title} </span>}
                description={
                    <span> <b>{props.author || props.recipe.getUploadedBy()}</b> <br/> Uploaded by: {props.recipe.getUploadedBy()}</span>}


            />
        </Card>
    );
}

