import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 4),
    width: '100%',
    margin: theme.spacing(0, 'auto'),
  

  },
  avatarNameContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '75%',
    height: '100%',
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  chip: {
    display: 'block',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))
