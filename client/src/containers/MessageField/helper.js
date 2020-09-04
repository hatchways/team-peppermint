import Axios from 'axios';
import { translateText } from "../../context/messages/helper"
import ISO6391 from 'iso-639-1';
import { addUknownUser } from "../../context/contacts/contactsContext";
const loadMessages = (email, room, setMessages, setUsers, usersData, unknownUsers, dispatch) => {
    Axios.get(`/user/conversation/${room}`)
        .then((response) => {
            setMessages(response.data.conversation.messages)
            setUsers(response.data.conversation.users)
            response.data.conversation.users.forEach((userEmail) => {
                if (!usersData[userEmail] && userEmail!==email) {
                    Axios.get(`/api/user/${userEmail}`)
                        .then((response) => {
                            addUknownUser(userEmail, unknownUsers, dispatch)
                        })
                        .catch((err) => console.log(err))
                }
            })
        })
        .catch((err) => console.error(err));
}
const addTextVersion = (newMsg, language, text) => {
    return new Promise(async (resolve, reject) => {
        try {
            newMsg.textVersions[language] = await translateText(text, ISO6391.getCode(language))
            resolve(newMsg)
        }
        catch (err) { reject(err); }
    })

}
const createMessageObject = async (date, text, user, languages, imageUrl) => {
    let newMsg = {
        sender: user.email,
        date: date,
        textVersions: {},
    };
    if (imageUrl) {
        newMsg.image = imageUrl;
    }
    if (text) {
        newMsg.textVersions[user.language] = text

        if (languages) {
            let promises = languages.map(async (language) => {
                if (language !== user.language) {
                    return addTextVersion(newMsg, language, text);
                }
            })
            await Promise.all(promises);
        }

    }
    return newMsg;
};
export {
    loadMessages,
    createMessageObject
}