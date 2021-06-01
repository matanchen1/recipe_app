import {WhatsappIcon, WhatsappShareButton} from "react-share";

function WhatsAppShare(GroupCode) {
    return (<div>
            <WhatsappShareButton
                title="Family Share"
                url={GroupCode.codeUrl}
            >
                <WhatsappIcon size={64} round/>
            </WhatsappShareButton>

        </div>
    )
}

export default WhatsAppShare
