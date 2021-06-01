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
        <Grid container justify='center' alignContent='stretch'>
            <Grid item md={6} xs={12}>
                <BackgroundImage />
            </Grid>
            <Grid item md={6} xs={12}>
                {isLogin ?
                    <Login history={history} renderRegister={renderRegister} /> :
                    <Register history={history} renderLogin={renderLogin} />
                }
            </Grid>
        </Grid>
    )
}
export default LandingPage