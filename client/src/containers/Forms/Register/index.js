import React, { useEffect, useState } from 'react'
import { Link, Button, Typography, TextField, MenuItem, Select, Collapse } from '@material-ui/core'
import { useUserStore } from 'context/user/userContext'
import UserServices from 'services/apiCalls/user.services'
import { Formik, Field, Form } from 'formik';
import { useStyles } from '../style'
import * as Yup from 'yup';
import { Alert } from '@material-ui/lab';
const SingUpSchema = Yup.object().shape({
    name: Yup.string().max(50, 'Too Long').required('Required'),
    email: Yup.string().email('Invalid Email').required('Required'),
    password: Yup.string().min(8, 'Password is too short, should be at least 8 characters').required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    language: Yup.string().required('Required')
})
const registerValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    language: 'english'
}
const Register = ({ history, renderLogin }) => {

    const userState = useUserStore()
    const [message, setMessage] = useState(null)
    const classes = useStyles()

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
        <div className={classes.root}>
            <Formik
                initialValues={registerValues}
                onSubmit={handleLoginSubmit}
                validationSchema={SingUpSchema}
            >
                {({ errors, touched }) => (
                    <Form className={classes.form}>
                        <Typography variant="h3">Sign Up</Typography>
                        <Field
                            className={classes.formField}
                            name="email"
                            type="email"
                            label="Email"
                            variant="outlined"
                            error={errors.email && touched.email}
                            helperText={errors.email}
                            as={TextField}
                        />
                        <Field
                            className={classes.formField}
                            name="name"
                            type="text"
                            label="Name"
                            variant="outlined"
                            error={errors.name && touched.name}
                            helperText={errors.name}
                            as={TextField}
                        />
                        <Field
                            className={classes.formField}
                            name="password"
                            type="password"
                            label="Password"
                            variant="outlined"
                            error={errors.password && touched.password}
                            helperText={errors.password}
                            as={TextField}
                        />
                        <Field
                            className={classes.formField}
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            variant="outlined"
                            error={errors.confirmPassword && touched.confirmPassword}
                            helperText={errors.confirmPassword}
                            as={TextField}
                        />
                        <Field className={classes.formField} name="language" label={'Language'} variant="outlined" as={Select} >
                            <MenuItem value="english">English</MenuItem>
                            <MenuItem value="french">French</MenuItem>
                            <MenuItem value="chinese">Chinese</MenuItem>
                            <MenuItem value="russian">Russian</MenuItem>
                        </Field>
                        <Button
                            className={classes.submitButton}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            <Typography variant="h5">
                                Sign Up
                            </Typography>
                        </Button>
                        <Button onClick={renderLogin}>Sign In</Button>
                    </Form>
                )}

            </Formik>
            {message && <div> {message}</div>}
        </div>
    )
}
export default Register