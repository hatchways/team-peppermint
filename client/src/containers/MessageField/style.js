import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection:"column",
    width: "100%",
    height: "90vh",
    padding: theme.spacing(2.5),
    paddingTop: 0,
  },
  messegesView:{
    width:"100%",
    flexGrow: 1,
    overflow: "auto",
    backgroundColor: "transparent",
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  messageInput:{
    
    justifyContent:"flex-end",

  }
}));
