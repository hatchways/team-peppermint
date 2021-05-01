import React, { useState } from "react";
import Picker from 'emoji-picker-react';
import { ButtonBase, Menu } from "@material-ui/core";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
const EmojiButton = ({ value, onSelect }) => {
  const [anchorEmojisMenu, setAnchorEmojisMenu] = useState(null)
  const handleEmojiPick = (_, emojiObject) => {
    onSelect('message', value + emojiObject.emoji)
  }
  const handleEmojiButtonClick = (event) => {
    setAnchorEmojisMenu(event.currentTarget)
  }
  const handleEmojisClose = () => {
    setAnchorEmojisMenu(null)
  }
  return (
    <div>
      <ButtonBase
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleEmojiButtonClick}
      >
        <SentimentSatisfiedOutlinedIcon />
      </ButtonBase>
      <Menu
        id="customized-menu"
        anchorEl={anchorEmojisMenu}
        open={Boolean(anchorEmojisMenu)}
        onClose={handleEmojisClose}
      >
        <div>
          <Picker
            onEmojiClick={handleEmojiPick}
            groupNames={{ smileys_people: "PEOPLE" }}
            native
          />
        </div>
      </Menu>
    </div>
  );
};
export default EmojiButton;
