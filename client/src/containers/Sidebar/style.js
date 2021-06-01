import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display:'flex' ,
    flexDirection: 'column',
    alignItems: 'center',

    width: '35%',
    height: '100%',

    backgroundColor: theme.palette.common.white,
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
    '@media (max-width:510px)': {
      position: 'fixed',
      display: 'flex',
      
      width: '100%',
      zIndex: 5,
    },
  },
  sidebarButton: {
    position: 'absolute',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    top: theme.spacing(2),
    left: 0 ,
    
    width: theme.spacing(5),
    height: theme.spacing(5),
    borderRadius: theme.spacing(0, 1, 1, 0),
    backgroundColor: theme.palette.primary.main,
    
    color: '#FFFFFF',
    
    transition: 'all 0.5s',
    zIndex: '6',
    '@media (max-width:510px)': {
      display: 'flex',
    },
  },
  slideIn: {
    animation:  '$slidein 0.5s ease-in-out forwards',
  },
  slideOut: {
    animation: '$slideout 0.5s ease-in-out forwards'
  },
  '@keyframes slidein': {
    '0%': {
      transform: 'translateX(-100%)',
    },
    '100%': {
      transform: 'translateX(0)',
    },
  },
  '@keyframes slideout': {
    '0%': {
      transform: 'translateX(0)',
    },
    '100%': {
      
      transform: 'translateX(-100%)',
    },
  },
}))
