import {WhatsappIcon, WhatsappShareButton} from "react-share";

function WhatsAppShare(props) {
    return (<div>
            {/*{props.groupCode}*/}
            <WhatsappShareButton
                title="Family Share"
                url={props.groupCode}
            >
                <WhatsappIcon size={64} round/>
            </WhatsappShareButton>

        </div>
    )
}

export default WhatsAppShare
