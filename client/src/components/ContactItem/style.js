import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: 'center',
    width: '100%'
  },
  contactButton: {
    width: '100%',
    justifyContent: 'start',
    '&:focus': {
      outline: 'none'
    }
  },
  avatarNameContainer: {
    display: "flex",
    alignItems: "center",
    width: "50%",
    height: "100%",
  },
  chip: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  buttonBase: {
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    borderRadius: "50%",
  },
  contactName: {
    marginBottom: 0,
    fontWeight: 600,
  },
  [`@media (max-width:400px)`]: {
    avatarNameContainer: {
      flexDirection: "column",
      justifyContent: "center",
    },
    contactName: {
      fontSize: "1.3rem",
    },
  },
}));
