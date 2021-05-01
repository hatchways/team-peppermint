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
    borderBottomRightRadius: ({ isMyMessage }) => isMyMessage && 0,
    borderTopLeftRadius: ({ isMyMessage }) => !isMyMessage && 0,
    color: ({ isMyMessage }) => isMyMessage ? 'black' : 'white',
    background: ({ isMyMessage }) => isMyMessage ? 'lightgrey' : 'linear-gradient(130deg, rgba(39,31,208,1) 0%, rgba(32,167,253,1) 75%, rgba(106,194,255,1) 100%)'
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
