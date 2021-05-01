import React, { useState } from 'react'
import { IconButton, InputBase, } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import PublicIcon from '@material-ui/icons/Public';
import { useStyles } from './style'
import { Formik, Field, Form } from 'formik'
import UserServices from 'services/apiCalls/user.services';
const SearchContact = ({ contacts, updateContactList, updateUnknownList }) => {
    const classes = useStyles()
    const searchValues = { searchQuery: '' }
    const [isGlobal, setIsGlobal] = useState(true)
    let timeout
    const handleSearchSubmit = (searchQuery) => {

        if (isGlobal) {
            UserServices.searchUsersByEmailOrName(searchQuery.toLowerCase())
                .then((response) => updateUnknownList(response.data.users))
                .catch(err => console.log(err))
        }

        else {
            let newContactList = contacts.filter(contact =>
                contact.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                contact.email.toLowerCase().startsWith(searchQuery.toLowerCase())
            )
            updateContactList(newContactList)
        }
    }
    const handleSearchChange = (text, setFieldValue) => {
        setFieldValue('searchQuery', text)
        if (timeout) clearTimeout(timeout)
        if (text.length >= 3)
            timeout = setTimeout(() => handleSearchSubmit(text), 700)
        if (text === '') {
            updateContactList(contacts)
            updateUnknownList([])
        }
    }
    return (
        <div className={classes.root}>

            <IconButton onClick={() => setIsGlobal(!isGlobal)}>
                <PublicIcon color={isGlobal ? 'primary' : 'disabled'} />
            </IconButton>

            <Formik
                initialValues={searchValues}
                onSubmit={handleSearchSubmit}
            >
                {({ values, setFieldValue }) => (
                    <Form className={classes.searchBar}>
                        <Field
                            className={classes.seachTextField}
                            name='searchQuery'
                            type='text'
                            placeholder='Search Contact'
                            as={InputBase}
                            onChange={(e) => handleSearchChange(e.target.value, setFieldValue, values)}
                            endAdornment={<SearchIcon color='disabled' />}
                        />
                    </Form>
                )}
            </Formik>


        </div >
    )
}
export default SearchContact