import React, { useContext, useEffect, useState }from "react";
import { Typography, ButtonBase } from "@material-ui/core";
import { useStyles } from "./style";
import { MoreHoriz } from "@material-ui/icons";
import UserAvatar from "../../components/UserAvatar/index";
import UserContext from '../../Context/UserContext';

const SidebarNavBar = () => {
  const classes = useStyles();
  const userContext = useContext(UserContext);


  const [user, setUser]=useState({});
  useEffect(()=>{
    setUser(userContext.userData.user)
  },[userContext])
  if(user) {  
    return (
      <div className={classes.root}>
        <div className={classes.leftRightSideStyle}>
          <UserAvatar />
          <Typography variant="body2" className={classes.typography}>
          {user.name}
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
  }else{
    return null;
  }
};
export default SidebarNavBar;
