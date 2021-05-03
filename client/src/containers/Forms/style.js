import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        background:'#FFFFFF',
        width: '100%',
        height: '100%',
        display:'flex',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    formField: {
        width: '70%',
        margin: theme.spacing(1, 0),
    },
    submitButton: {
        width: '50%',
        borderRadius: 0
    }
}));
