import React, { memo, useState } from "react";
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

const ContactItem = ({
  imageUrl,
  name,
  index,
  isOnline,
  handleDeleteContactButton,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ListItem button className={classes.root}>
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
        <MenuItem onClick={() => handleDeleteContactButton("ya@ya.ru", index)}>
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
