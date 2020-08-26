import React, { useState } from "react";
import { useStyles } from "./style";
import MainContentFieldNavBar from "../MainContentFieldNavBar";
import MessageField from "../MessageField";
import UserContext from "../../Context/UserContext";
import ToggleLanguage from "../../Context/ToggleLanguage"
const MainContentField = () => {
  const classes = useStyles();
  const [original, setOriginal] = useState(false)
  return (

    <section className={classes.root}>
      <ToggleLanguage.Provider value={{original, setOriginal}}>
        <MainContentFieldNavBar />
        <UserContext.Consumer>
          {value => (
            !!value.userData.user &&
            <MessageField user={value.userData.user} />
          )}
        </UserContext.Consumer>
      </ToggleLanguage.Provider>
    </section>

  );
};

export default MainContentField;