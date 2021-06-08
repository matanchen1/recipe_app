import {Image} from 'react-bootstrap';
import { Grid} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import WhatsAppShare from "./WhatsAppShare";
import DishesView from "./DishesView";
import {useAuth} from "../contexts/AuthContext";
import DishesView2 from "./DishesView2";
import {useHistory} from "react-router-dom";



function Header(props) {

// styles
    const useStyles = makeStyles({
        TitleStyle: {
            color: "#000",
            fontSize: '55px',
            border: "white",
            textAlign: "center",
            marginTop: "30px",
            marginLeft: "10px"
        },
        FamImgStyle: {
            width: "250px",
            minWidth: "150px",
            height: "160px",
            padding: "1px",
            margin: "30px 0 0 45px ",
            borderRadius: "10%",
            boxShadow: "0 0 1px 1px "
        }
    })
    const classes = useStyles();
    const {groupcode} = useAuth();
    const webSiteFamilyUrl = "https://grandma-cooked-oatmeal.web.app/family/";

    return (
        <Grid container>
            <Grid item xs={3} sm={2}>
                <br/>
                <div>
                    <Image
                        // className="img-thumbnail"
                        className={classes.FamImgStyle}
                           src={"https://images.unsplash.com/photo-1606787842514-a7998e6bee38?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGZhbWlseXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"}
                           alt="family's img"/>
                </div>
            </Grid>
            <Grid item sm={7}>
                <br/><br/><br/>
                <h1 className={classes.TitleStyle}> &emsp;&nbsp;&nbsp;{props.name}'s
                    family
                    CookBook
                </h1>
            </Grid>
            <Grid item xs={3} direction="column">
                <div>
                    <br/><br/>
                    <h5> Group code : <strong>{groupcode}</strong></h5>
                    <div>
                        <WhatsAppShare groupCode={webSiteFamilyUrl+{groupcode}.groupcode}/>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

function FamilyPage() {
    // const classes = useStyles();
    const {familyName} = useAuth();
    const  history= useHistory();
    function  handleClickBtn(){
        history.push("/addrecipe")
    }
    return (
        <div>
            {/*<Container maxWidth={"xl"} className={classes.backgroundImg}>*/}
                <div className="main_body_items_and_filter">
                    <div className={"header"}>
                        {familyName && <Header name={familyName}/>}
                        {!familyName && <Header name="Kaufman"/>}
                        <br/>
                        {/*TODO: send image to header from firebase*/}
                    </div>
                    <DishesView2 handleClickBtn={handleClickBtn}/>
                </div>
            {/*</Container>*/}
        </div>
    )
}

export default FamilyPage;

