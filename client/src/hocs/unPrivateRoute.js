import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useUserStore } from 'context/user/userContext'
const UnPrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useUserStore()
    return (
        <Route {...rest} render={props => {
            if (isAuthenticated)
                return <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
            return <Component {...props} />
        }} />
    )
}
export default UnPrivateRoute