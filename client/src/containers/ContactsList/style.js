import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    maxHeight: "63vh",
    flexGrow: 1,
    overflow: "auto",
    backgroundColor: "transparent",
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    paddingBottom: "90px",
  },
  inviteFriendsContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    width: "100%",
    backgroundColor: "transparent",
  },
  typography: {
    marginBottom: 0,
    marginLeft: 10,
    fontWeight: 600,
  },
  [`@media (max-width:400px)`]: {
    root: {
      paddingBottom: "250px",
    },
    typography: {
      fontSize: "1.3rem",
    },
  },
}));
