import {WhatsappIcon, WhatsappShareButton} from "react-share";

function WhatsAppShare(props) {
    return (<span>
            <WhatsappShareButton
                title="Family Share"
                url={props.shareValue}
                quote={"blabla"}
            >
                <WhatsappIcon size={40} round/>
            </WhatsappShareButton>

        </span>
    )
}

export default WhatsAppShare
