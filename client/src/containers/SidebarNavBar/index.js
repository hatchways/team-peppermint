import React, { useState } from "react";
import { Typography, ButtonBase, Menu, MenuItem } from "@material-ui/core";
import { useStyles } from "./style";
import { MoreHoriz } from "@material-ui/icons";
import UserAvatar from "../../components/UserAvatar/index";

const SidebarNavBar = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <div className={classes.leftRightSideStyle}>
        <UserAvatar />
        <Typography variant="body2" className={classes.typography}>
          Santiago
        </Typography>
      </div>
      <div className={classes.leftRightSideStyle}>
        <ButtonBase
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          style={{ marginLeft: 20 }}
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
          <MenuItem onClick={() => console.log("Logged out")}>
            Log out
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};
export default SidebarNavBar;
