import React, { useState, useContext } from "react";
import { Typography, Switch, ButtonBase } from "@material-ui/core";
import { useStyles, StyledBadge } from "./style";
import { MoreHoriz } from "@material-ui/icons";
import { useUserState } from "../../context/user/userContext";
import ToggleLanguage from "../../context/ToggleLanguage";

const MainContentFieldNavBar = () => {
  const [checked, setChecked] = useState(false);
  const classes = useStyles();
  const toggleLanguageContext = useContext(ToggleLanguage);
  const { user } = useUserState();

  const handleChange = () => {
    setChecked(!checked);
    toggleLanguageContext.setOriginal(!checked);
  };

  return (
    <div className={classes.root}>
      <div className={classes.leftRightSideStyle}>
        <Typography
          variant="h6"
          style={{ fontWeight: 600, marginLeft: 20, marginRight: 20 }}
        >
          {user.name}
        </Typography>
        <div className={classes.onOfflineStyle}>
          <StyledBadge overlap="circle" variant="dot">
            <span></span>
          </StyledBadge>
          <Typography variant="body2" style={{ fontSize: "0.8rem" }}>
            Online
          </Typography>
        </div>
      </div>
      <div className={classes.leftRightSideStyle}>
        {checked ? (
          <Typography
            variant="body2"
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#3A8DFF",
            }}
          >
            Original language
          </Typography>
        ) : (
          <Typography
            variant="body2"
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              opacity: 0.5,
            }}
          >
            Original language
          </Typography>
        )}
        <Switch
          checked={checked}
          onChange={handleChange}
          color="primary"
          name="checked"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
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

export default MainContentFieldNavBar;
