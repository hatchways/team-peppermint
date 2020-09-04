import React, { useState } from "react";
import { useStyles } from "./style";
import Sidebar from "../Sidebar";
import MainContentField from "../MainContentField";
import SelectConversation from "../../context/SelectConversation"
import ToggleLanguage from "../../context/ToggleLanguage"
const MainPage = () => {
  const classes = useStyles();
  const [conversation, setConversation] = useState()
  const [original, setOriginal] = useState(false)

  return (
    <main className={classes.root}>
      <SelectConversation.Provider value={{ conversation, setConversation }}>
        <ToggleLanguage.Provider value={{ original, setOriginal }}>
          <Sidebar />
          <MainContentField />
        </ToggleLanguage.Provider>
      </SelectConversation.Provider>
    </main>
  );
};

export default MainPage;
