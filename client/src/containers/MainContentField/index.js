import React, { useState } from "react";
import { useStyles } from "./style";
import MainContentFieldNavBar from "../MainContentFieldNavBar";
import MessageField from "../MessageField";
import ToggleLanguage from "../../context/ToggleLanguage"
import { useUserState } from "../../context/user/userContext";

const MainContentField = () => {
  const { user } = useUserState();

  const classes = useStyles();
  const [original, setOriginal] = useState(false)
  return (
    <section className={classes.root}>
      <ToggleLanguage.Provider value={{original, setOriginal}}>
        <MainContentFieldNavBar />      
        {!!user && <MessageField user={user} />}
      </ToggleLanguage.Provider>
    </section>
  );
};

export default MainContentField;
