import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {

    height: '10%',
    width: '100%',
    backgroundColor: theme.palette.common.white,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'rgba(0,0,0,0.1)'
  },
  form: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  textField: {
    width: '96%',
   
    '& fieldset': {
      borderRadius: theme.spacing(4),
      padding: theme.spacing(0,4),
      boxShadow:'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
    },
  },
}))
