import { InputAdornment, TextField } from '@material-ui/core'
import React from 'react'
import { Formik, Field, Form } from 'formik'
import { useStyles } from './styles'
import EmojiButton from 'components/EmojiButton'
import ConversationServices from 'services/apiCalls/conversation.services'
import { useUserStore } from 'context/user/userContext'
import { useCurrentConversationStore } from 'context/currentConversation/currentConversationContext'
import { generateMessageVersions } from './helper'


const MessageInput = () => {
    const classes = useStyles()
    const { user, socket } = useUserStore()
    const currentConversation = useCurrentConversationStore()
    const inputValues = {
        message: '',
        image: undefined
    }
    const handleMessageSubmit = async ({ message, image }, { resetForm }) => {
        if (currentConversation._id) {
            const messageData = {
                textVersions: {}
            }
            if (message !== '')
                messageData.textVersions = await generateMessageVersions(currentConversation.users, user, message)
            if (image)
                messageData.image = image
            ConversationServices.sendMessage(currentConversation._id, messageData)
                .then((res) => {
                    //currentConversationDispatch(Action(ActionTypes.PUSH_MESSAGE, res.data.messageObject))
                    socket.emit('new-message', {
                        ...res.data.messageObject,
                        conversationID: currentConversation._id
                    })
                    resetForm()
                })
                .catch((res) => console.log(res))
        }
    }
    return (
        <div className={classes.root}>
            <Formik
                initialValues={inputValues}
                onSubmit={handleMessageSubmit}
            >
                {({ values, setFieldValue }) =>
                    <Form>
                        <Field
                            className={classes.textField}
                            name='message'
                            type='text'
                            placeholder='Send message...'
                            variant='outlined'
                            InputProps={{
                                endAdornment:
                                    <InputAdornment>
                                        <EmojiButton value={values.message} onSelect={setFieldValue} />
                                    </InputAdornment>,
                            }}
                            as={TextField}
                        />
                    </Form>
                }
            </Formik>
        </div>
    )
}
export default MessageInput