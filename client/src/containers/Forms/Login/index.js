import React, { useState } from 'react'
import { Button, Typography, TextField } from '@material-ui/core'
import { useUserDispatch } from 'context/user/userContext'
import UserServices from 'services/apiCalls/user.services'
import { Formik, Field, Form } from 'formik';
import Action, { ActionTypes } from 'types';
import { useStyles } from '../style'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
const Login = ({ renderRegister }) => {

    const userDispatch = useUserDispatch()
    const [message, setMessage] = useState(null)

    const loginValues = {
        email: '',
        password: ''
    }
    const classes = useStyles()
    const handleLoginSubmit = (loginValues) => {
        UserServices.login(loginValues)
            .then(response => {
                userDispatch(Action(ActionTypes.SET_USER_DATA, response.data))
            })
            .catch(err => setMessage(err))
    }
    return (
        <div className={classes.root}>
            <Formik
                initialValues={loginValues}
                onSubmit={handleLoginSubmit}
            >
                {({ values }) => (
                    <Form className={classes.form}>
                        <Typography variant="h3">Login</Typography>
                        <Field
                            className={classes.formField}
                            name="email"
                            type="email"
                            label="Email"
                            variant='outlined'
                            as={TextField}
                        />
                        <Field className={classes.formField} name="password" type="password" label="Password" variant='outlined' as={TextField} />

                        <Button>Forgot Password?</Button>


                        <Button
                            className={classes.submitButton}
                            type="submit"
                            variant="contained"
                            color="primary"

                        >
                            <Typography variant="h5">
                                Login
                            </Typography>
                        </Button>
                        <Button onClick={renderRegister}>Create Account</Button>
                    </Form>
                )}

            </Formik>
            {message && <div> {message}</div>}
        </div>
    )
}
export default Login