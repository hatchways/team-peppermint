import React, { useState } from 'react'
import { Button, Typography, TextField } from '@material-ui/core'
import { useUserDispatch } from 'context/user/userContext'
import UserServices from 'services/apiCalls/user.services'
import { Formik, Field, Form } from 'formik';
import Action, { ActionTypes } from 'types';

const Login = ({ renderRegister }) => {

    const userDispatch = useUserDispatch()
    const [message, setMessage] = useState(null)

    const loginValues = {
        email: '',
        password: ''
    }
    const handleLoginSubmit = (loginValues) => {
        UserServices.login(loginValues)
            .then(response => {
                userDispatch(Action(ActionTypes.SET_USER_DATA, response.data))
            })
            .catch(err => setMessage(err))
    }
    return (
        <div>
            <Formik
                initialValues={loginValues}
                onSubmit={handleLoginSubmit}
            >
                {({ values }) => (
                    <Form>
                        <Typography variant="h1">LOGIN</Typography>
                        <Field name="email" type="email" label="Email" as={TextField} />
                        <Field name="password" type="password" label="Password" as={TextField} />
                        <div>
                            <Button>Forgot Password?</Button>
                            <Button onClick={renderRegister}>Don't have an account yet?</Button>
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            <Typography variant="h3">
                                Login
                            </Typography>
                        </Button>

                    </Form>
                )}

            </Formik>
            {message && <div> {message}</div>}
        </div>
    )
}
export default Login