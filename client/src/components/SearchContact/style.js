import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '90%',
    margin: 'auto',
    padding: theme.spacing(1, 2),
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
  },
  toggleButton: {
    height: '90%',
    padding: theme.spacing(0, 1),
    margin: 'auto'
  },
  toggleButtonSelected: {
    color: theme.palette.success.main
  }
}));
