import React from "react";
import { Typography, Switch, ButtonBase } from "@material-ui/core";
import { useStyles } from "./style";
import { MoreHoriz } from "@material-ui/icons";
import { useLanguageContext } from "context/language/languageContext";


const ChatHeader = () => {

  const classes = useStyles();
  const { isOriginalLanguage, toggleOrginalLanguage } = useLanguageContext()
  const handleChange = () => {
    toggleOrginalLanguage()
    console.log(isOriginalLanguage)
  };

  return (
    <div className={classes.root}>
      <div className={classes.leftRightSideStyle}>
        {isOriginalLanguage ? (
          <Typography variant="body2" className={classes.typography}>
            Original language
          </Typography>
        ) : (
          <Typography
            variant="body2"
            className={classes.typography}
            style={{
              color: 'grey',
              opacity: 0.5,
            }}
          >
            Original language
          </Typography>
        )}
        <Switch
          checked={isOriginalLanguage}
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

export default ChatHeader;
