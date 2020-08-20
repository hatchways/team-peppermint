import React from "react";
import { useStyles } from "./style";
import MainContentFieldNavBar from "../MainContentFieldNavBar";
import MessageField from "../MessageField";
import UserContext from "../../Context/UserContext";
const MainContentField = () => {
  const classes = useStyles();

  return (

    <section className={classes.root}>
      <MainContentFieldNavBar />
      <UserContext.Consumer>
        {value => (
          !!value.userData.user &&
          <MessageField user={value.userData.user} />
        )}
      </UserContext.Consumer>
    </section>

  );
};

export default MainContentField;