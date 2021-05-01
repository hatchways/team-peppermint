import { translateText } from "context/messages/helper"
import unescape from 'unescape'
const generateMessageVersions = async (users, currentUser, message) => {
    const textVersions = {}
    textVersions[currentUser.language] = message
    for (let conversationUser of users) {
        if (currentUser.language !== conversationUser.language) {
            let newVersion = await translateText(message, conversationUser.language)

            textVersions[conversationUser.language] = unescape(newVersion)

        }
    }
    return textVersions
}

export { generateMessageVersions }