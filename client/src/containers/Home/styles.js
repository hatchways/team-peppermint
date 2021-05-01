import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        padding: 0,
        height: '100vh',
        overflow: 'hidden'
    },
    item: {
        maxHeight: '100%'
    }
}));
