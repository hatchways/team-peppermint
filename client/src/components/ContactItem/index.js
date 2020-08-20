import React, { memo, useState, useContext } from "react";
import { useStyles } from "./style";
import PropTypes from "prop-types";
import UserAvatar from "../UserAvatar";
import {
  Typography,
  ListItem,
  ButtonBase,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";
import SelectContact from "../../Context/SelectContact";
const ContactItem = ({
  imageUrl,
  name,
  index,
  isOnline,
  handleDeleteContactButton,
  contact,
  select,
  selected
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const context = useContext(SelectContact);
  const classes = useStyles();
  const onContactClick = (event) => {
    select(event, index)
    context.setContact(contact)
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ListItem button className={classes.root} onClick={onContactClick} selected={selected === index}>
      <div className={classes.avatarNameContainer}>
        <UserAvatar imageUrl={imageUrl} isOnline={isOnline} />
        <Typography
          variant="body1"
          className={classes.contactName}
          gutterBottom
        >
          {name}
        </Typography>
      </div>
      <ButtonBase
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.buttonBase}
      >
        <MoreHoriz />
      </ButtonBase>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleDeleteContactButton("ya@ya.ru", index)}>
          Delete contact
        </MenuItem>
      </Menu>
    </ListItem>
  );
};

export default memo(ContactItem);

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  index: PropTypes.number.isRequired,
  isOnline: PropTypes.bool,
};
