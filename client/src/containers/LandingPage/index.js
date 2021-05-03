import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import BackgroundImage from '../../components/bgImage'
import Login from 'containers/Forms/Login'
import Register from 'containers/Forms/Register'
const LandingPage = ({ history }) => {
    const [isLogin, setIsLogin] = useState(true)
    const renderLogin = () => setIsLogin(true)
    const renderRegister = () => setIsLogin(false)
    return (
        <Grid container justify='center' alignItems='stretch'>
            <Grid item xs={6}>
                <BackgroundImage />
            </Grid>
            <Grid item xs={6}>
                {isLogin ?
                    <Login history={history} renderRegister={renderRegister} /> :
                    <Register history={history} renderLogin={renderLogin} />
                }
            </Grid>
        </Grid>
    )
}
export default LandingPage