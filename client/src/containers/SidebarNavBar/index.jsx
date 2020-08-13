import React from "react";
import { Typography, ButtonBase } from "@material-ui/core";
import { useStyles } from "./style";
import { MoreHoriz } from "@material-ui/icons";
import UserAvatar from "../../components/UserAvatar/index";

const SidebarNavBar = () => {
  const classes = useStyles();

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
          onClick={() => console.log("Clicked")}
          style={{ marginLeft: 20 }}
        >
          <MoreHoriz />
        </ButtonBase>
      </div>
    </div>
  );
};
export default SidebarNavBar;
