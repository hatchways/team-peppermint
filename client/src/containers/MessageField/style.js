import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "90vh",
    padding: theme.spacing(2.5),
    paddingTop: 0,
  },
  messegesView: {
    width: "100%",
    flexGrow: 1,
    overflow: "auto",
    backgroundColor: "transparent",
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  messageInput: {
    justifyContent: "flex-end",
  },
  [`@media (max-width:820px)`]: {
    root: {
      height: "45vh",
    },
  },
}));

