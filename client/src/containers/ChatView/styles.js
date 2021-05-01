import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        maxHeight: '100%',
        height: '100%',
        width: '65%'
    },
    messagesContainer: {
        minHeight: '80%',
        maxHeight: '80%',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    }
}));
