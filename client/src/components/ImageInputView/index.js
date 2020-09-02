import React from "react";
import { ButtonBase } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close";
const ImageInputView = ({imageUrl, handleClose}) => {
    return (
        <div
            style={{
                borderRadius: 10,
                marginRight: 10,
            }}
        >
            <ButtonBase
                style={{
                    position: "absolute",
                    top: -5,
                    left: 60,
                }}
                onClick={handleClose}
            >
                <CloseIcon />
            </ButtonBase>
            <img
                src={imageUrl.url}
                alt="userpicture"
                width="50px"
                height="50px"
                style={{
                    borderRadius: 10,
                    display: "block",
                    outline: "none",
                }}
            ></img>
        </div>
    )
}
export default ImageInputView;