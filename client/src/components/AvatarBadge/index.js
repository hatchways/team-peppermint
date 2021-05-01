import { Badge, makeStyles } from '@material-ui/core'
import React from 'react'
const useStyles = makeStyles(theme => ({

    badge: ({ isOnline }) => ({
        backgroundColor: isOnline ? "#44b700" : "#D3D3D3",
        boxShadow: '0 0 0 2px #FFF',
        height: theme.spacing(1.2),
        width: theme.spacing(1.2),
        borderRadius: '50%',
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(1),
    }),

}))

const AvatarBadge = ({ children, isOnline }) => {
    const classes = useStyles({ isOnline })
    return (
        <Badge
            classes={{
                badge: classes.badge
            }}
            badgeContent=''
            variant='dot'
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
        >
            { children}
        </Badge >
    )
}
export default AvatarBadge