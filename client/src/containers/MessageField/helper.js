import Axios from 'axios';
import { translateText } from "../../context/messages/helper"
import ISO6391 from 'iso-639-1';
const loadMessages = (room, setMessages, setUsers, usersData, setUsersData, email) => {
    Axios.get(`/user/conversation/${room}`)
        .then((response) => {
            setMessages(response.data.conversation.messages)
            setUsers(response.data.conversation.users)
            response.data.conversation.users.forEach((userEmail) => {
                if (!Object.keys(usersData).includes(userEmail) && userEmail !== email) {
                    Axios.get(`/api/user/${userEmail}`)
                        .then((response) => {
                            setUsersData(prevState => {
                                prevState[userEmail] = {
                                    name: response.data.name,
                                    language: response.data.language,
                                    pictureUrl: response.data.pictureUrl
                                }
                                return prevState;
                            })
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
            newMsg.textVersions[language]= await translateText(text, ISO6391.getCode(language))
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
    console.log(newMsg)
    return newMsg;
};
export {
    loadMessages,
    createMessageObject
}