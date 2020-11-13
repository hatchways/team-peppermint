import React, { useState, useEffect, useRef } from "react";
import { useStyles } from "./style";
import Sidebar from "../Sidebar";
import MainContentField from "../MainContentField";
import SelectConversation from "../../context/SelectConversation";
import ToggleLanguage from "../../context/ToggleLanguage";
import { useHistory } from "react-router";

const MainPage = () => {
  const classes = useStyles();
  const [conversation, setConversation] = useState();
  const [original, setOriginal] = useState(false);
  const history = useHistory();

  const ref = useRef({
    token: localStorage.getItem("auth-token"),
  });

  useEffect(() => {
    !ref.current.token && history.push("/login");
  }, [ref, history]);

  return (
    ref.current.token && (
      <main className={classes.root}>
        <SelectConversation.Provider value={{ conversation, setConversation }}>
          <ToggleLanguage.Provider value={{ original, setOriginal }}>
            <Sidebar />
            <MainContentField />
          </ToggleLanguage.Provider>
        </SelectConversation.Provider>
      </main>
    )
  );
};

export default MainPage;
