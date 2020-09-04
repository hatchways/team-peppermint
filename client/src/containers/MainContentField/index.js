import React from "react";
import { useStyles } from "./style";
import MainContentFieldNavBar from "../MainContentFieldNavBar";
import MessageField from "../MessageField";
import { useUserState } from "../../context/user/userContext";

const MainContentField = () => {
  const { user } = useUserState();

  const classes = useStyles();

  return (
    <section className={classes.root}>
      <MainContentFieldNavBar />
      {!!user && <MessageField user={user} />}
    </section>
  );
};

export default MainContentField;
