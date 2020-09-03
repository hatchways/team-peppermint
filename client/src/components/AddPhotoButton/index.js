import React from "react";
import {    
    ButtonBase,
    Tooltip,
} from "@material-ui/core";
import { DropzoneDialog } from "material-ui-dropzone";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
const AddPhotoButton = ({ handleImageSelector, conversation, imageEl, handleImageSave, handleClose }) => {
    return (
        <>
            <Tooltip title="Add photos" placement="top" arrow>
                <span>
                    <ButtonBase
                        aria-label="select image"
                        onClick={handleImageSelector}
                        disabled={conversation ? false : true}
                    >
                        <FileCopyOutlinedIcon />
                    </ButtonBase>
                </span>
            </Tooltip>
            <DropzoneDialog
                open={Boolean(imageEl)}
                onSave={handleImageSave}
                showPreviews={true}
                maxFileSize={3000000}
                onClose={handleClose}
            />
        </>
    )
}
export default AddPhotoButton;