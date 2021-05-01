import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // justifyContent: "space-between",
    width: '100%',
    justifyContent: 'space-around'
  },
  searchBar: {
    display: 'flex',
    width: '80%',
    margin: 'auto'
  }

}));
