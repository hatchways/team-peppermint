import React, { useState } from "react";
import { StyledMenu } from "./style";
import { ButtonBase, Tooltip } from "@material-ui/core";
import { Picker } from "emoji-mart";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
const EmojiButton = ({ conversation, setMessage, message }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleEmojiClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip title="Choose an emoji" placement="top" arrow>
        <span>
          <ButtonBase
            aria-controls="customized-menu"
            aria-haspopup="true"
            onClick={handleEmojiClick}
            disabled={conversation ? false : true}
            style={{ marginRight: 15 }}
          >
            <SentimentSatisfiedOutlinedIcon />
          </ButtonBase>
        </span>
      </Tooltip>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Picker
          set="google"
          title="Peppermint chat"
          onSelect={(emoji) => setMessage(message.concat(emoji.native))}
          emojiSize={20}
          onClick={handleClose}
        />
      </StyledMenu>
    </>
  );
};
export default EmojiButton;
