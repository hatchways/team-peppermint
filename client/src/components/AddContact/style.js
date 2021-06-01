import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: 'space-around',
    width: '100%',
  },
  searchBar: {
    display: 'flex',
    width: '80%',
    margin: 'auto'
  }

}));
