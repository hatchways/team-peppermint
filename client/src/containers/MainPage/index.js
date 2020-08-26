import React, { useState } from "react";
import { useStyles } from "./style";
import Sidebar from "../Sidebar";
import MainContentField from "../MainContentField";
import SelectConversation from "../../context/SelectConversation"
const MainPage = () => {
  const classes = useStyles();
  const [conversation, setConversation] = useState()
  return (
    <main className={classes.root}>
      <SelectConversation.Provider value={{ conversation, setConversation }}>
        <Sidebar />
        <MainContentField />
      </SelectConversation.Provider>
    </main>
  );
};

export default MainPage;
