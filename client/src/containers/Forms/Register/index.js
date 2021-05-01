import React, { useEffect, useState } from 'react'
import { Link, Button, Typography, TextField, MenuItem, Select } from '@material-ui/core'
import { useUserStore } from 'context/user/userContext'
import UserServices from 'services/apiCalls/user.services'
import { Formik, Field, Form } from 'formik';

const Register = ({ history, renderLogin }) => {

    const userState = useUserStore()
    const [message, setMessage] = useState(null)

    const registerValues = {
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        language: 'english'
    }
    const handleLoginSubmit = (registerValues) => {
        UserServices.register(registerValues)
            .then(response => {
                console.log(response)
                if (response.status !== 'error')
                    history.push('/home')
                else
                    setMessage(response.message)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => { console.log(userState) }, [userState])
    return (
        <div>
            <Formik
                initialValues={registerValues}
                onSubmit={handleLoginSubmit}
            >
                {({ values }) => (
                    <Form>
                        <Typography variant="h1">REGISTRATION</Typography>
                        <Field name="email" type="email" label="Email" as={TextField} />
                        <Field name="name" type="text" label="Name" as={TextField} />
                        <Field name="password" type="password" label="Password" as={TextField} />
                        <Field name="confirmPassword" type="password" label="Confirm Password" as={TextField} />
                        <Field name="language" as={Select} >
                            <MenuItem value="english">English</MenuItem>
                            <MenuItem value="french">French</MenuItem>
                            <MenuItem value="chinese">Chinese</MenuItem>
                            <MenuItem value="russian">Russian</MenuItem>
                        </Field>
                        <div >
                            <Link >Forgot Password?</Link>
                            <Link onClick={renderLogin}>Don't have an account yet?</Link>
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            <Typography variant="h3">
                                Register
                            </Typography>
                        </Button>

                    </Form>
                )}

            </Formik>
            {message && <div> {message}</div>}
        </div>
    )
}
export default Register