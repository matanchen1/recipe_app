import {WhatsappIcon, WhatsappShareButton} from "react-share";

function WhatsAppShare(props) {
    return (<span>
            <WhatsappShareButton
                title={props.message}
                url={props.shareValue}
            >
                <WhatsappIcon size={40} round/>
            </WhatsappShareButton>

        </span>
    )
}

export default WhatsAppShare
