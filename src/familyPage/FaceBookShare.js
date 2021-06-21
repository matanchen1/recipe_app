import {FacebookIcon, FacebookShareButton} from "react-share";

function FaceBookShare(props) {
    return (<span>
            <FacebookShareButton url={'google.com'}
                                 quote={"blabla"} >

                <FacebookIcon size={40} round/>
            </FacebookShareButton>
        </span>
    )
}

export default FaceBookShare
