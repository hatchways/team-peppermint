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
  Tooltip,
} from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";
import SelectContact from "../../context/SelectContact";
const ContactItem = ({
  pictureUrl,
  name,
  email,
  index,
  isOnline,
  handleDeleteContactButton,
  contact,
  select,
  selected,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const context = useContext(SelectContact);
  const classes = useStyles();
  const onContactClick = (event) => {
    select(event, index);
    context.setContact(contact);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ListItem
      button
      className={classes.root}
      onClick={onContactClick}
      selected={selected === index}
    >
      <div className={classes.avatarNameContainer}>
        <UserAvatar imageUrl={pictureUrl} isOnline={isOnline} />
        <Typography
          variant="body1"
          className={classes.contactName}
          gutterBottom
        >
          {name}
        </Typography>
      </div>
      <Tooltip title="Delete contact" placement="bottom" arrow>
        <ButtonBase
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          className={classes.buttonBase}
        >
          <MoreHoriz />
        </ButtonBase>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleDeleteContactButton(email)}>
          Delete contact
        </MenuItem>
      </Menu>
    </ListItem>
  );
};

export default memo(ContactItem);

ContactItem.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  index: PropTypes.number.isRequired,
  isOnline: PropTypes.bool,
};
