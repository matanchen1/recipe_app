// import {TextareaAutosize} from "@material-ui/core";
// import {Button} from "react-bootstrap";
// import React from "react";
//
//
//
// function Comment({comment}) {
//     const classes = useStyles()
//     const Commentmember = members[parseInt(comment.author)];
//     if(Commentmember) console.log(Commentmember.name)
//     // let member = members[parseInt(comment.author)]
//     // const commentMember = members[comment.author];
//     return (
//         <div>
//
//
//             { (Commentmember) && <span className={classes.commentAuthor}>
//                         {Commentmember.name}</span>}
//             <span>{comment.date}</span>
//             <span>{}</span>
//             <p>{comment.content}</p>
//         </div>
//     );
// }
// export default function Comments({comments}) {
//     const classes = useStyles();
//     return (
//         <div className={classes.comments}>
//             <h2>Comments</h2>
//             <div className={classes.commentsItems}>
//                 {comments.map((comment) => (
//                     <Comment comment={comment}/>
//                 ))}
//             </div>
//             <div className={classes.inputCommentsContainer}>
//                 <div>
//                     user display
//                     {/*set margin to this div and set position to center in the bigger div*/}
//                 </div>
//                 <TextareaAutosize className={classes.inputCommentsAuthor}
//                                   ref={commentRef}
//                                   aria-label="empty textarea" rowsMin={2.5}
//                                   placeholder=" add a comment - add to the story "/>
//                 <Button
//                     onClick={() => HandleCommentAdd()}
//                     size="sm"
//                     variant="danger">
//                     save comment
//                 </Button>
//             </div>
//         </div>
//     );
// }