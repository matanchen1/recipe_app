// import React from 'react';
// import Avatar from '@material-ui/core/Avatar';
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
// import 'antd/dist/antd.css';
// import {Card} from 'antd';
// import {useHistory} from "react-router-dom";
// import StoryDialog from "./StoryDialog";
// import WhatsAppIcon from '@material-ui/icons/WhatsApp';
// import FacebookIcon from '@material-ui/icons/Facebook';
//
// const {Meta} = Card;
//
// export default function MediaCard2(props) {
//     const history = useHistory();
//     const recipePath = "/recipe/"
//
//     return (
//         <Card hoverable={true}
//               style={{width: 300}}
//               cover={
//                   <img style={{height: 225, objectFit: "cover", objectPosition:"center"}}
//                        alt="example"
//                        src={props.img}
//                        onClick={() => history.push({
//                            pathname: recipePath + props.recipeIndex,
//                            author: props.author,
//                            recipe: props.recipe,
//                        })
//                        }
//                   />
//               }
//               actions={[
//                   <FavoriteBorderIcon color={"secondary"} key="Like"/>,
//                   <StoryDialog title={props.title} text={props.recipe.getStoryContent()}
//                                img={props.img}/>,
//                   // <WhatsAppIcon style={{fill: "#2faf27"}} key="ellipsis"/>,
//                   <ShareOutlinedIcon color={"primary"} key="ellipsis"/>
//               ]}
//         >
//             <Meta
//                 onClick={() => history.push({
//                     pathname: recipePath + props.recipeIndex,
//                     author: props.author,
//                     recipe: props.recipe,
//                 })
//                 }
//                 avatar={<Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/2.jpg" />}
//                 title={<span style={{fontSize:21, maxWidth:150}} >{props.title}</span>}
//                 description={props.author}
//             />
//         </Card>
//     );
// }
//
