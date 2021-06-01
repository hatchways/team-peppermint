import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: ({ isMyMessage }) => isMyMessage ? 'flex-end' : 'flex-start'
  },
  messageContianer: {
    minWidth: '12ch',
  },
  messageBox: {
    width: '100%',
    display: 'flex',
    padding: 10,
    borderRadius: 10,
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
    borderBottomRightRadius: ({ isMyMessage }) => isMyMessage && 0,
    borderBottomLeftRadius: ({ isMyMessage }) => !isMyMessage && 0,
    color: ({ isMyMessage }) => isMyMessage ? 'black' : 'white',
    background: ({ isMyMessage }) => isMyMessage ? theme.palette.background.default: '#4178BF'
  },
  messageDetails: {
    display: 'flex',
    justifyContent: ({ isMyMessage }) => isMyMessage ? 'end' : 'space-between',
    alignItems: 'center',
  },
  
  imageIcon:{
    width: '15%',
    borderRadius: theme.spacing(2),
    marginRight: theme.spacing(1)
  },
  image: {
    borderRadius: 10,
    display: "block",
    objectFit: "contain",
    marginLeft: "auto",
    marginRight: "auto",
    outline: "none",
  },
}));
