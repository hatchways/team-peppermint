import Axios from 'axios'
const headers = {
    'Content-Type': 'application/json',
}

const UserServices = {
    login: (user) => {
        return Axios('/api/user/login', {
            method: 'POST',
            data: user,
            headers
        })

    },
    register: user => {
        return Axios('/api/user/', {
            method: 'POST',
            data: user,
            headers
        })
    },
    logout: () => {
        return Axios.get('/api/user/logout')
    },
    isAuthenticated: () => {
        return Axios.get('/api/user/authenticated')
            .then(response => {
                if (response.status !== 401)
                    return response
                else
                    return { isAuthenticated: false, user: { email: "", name: "", role: "" } }
            })
    },
    getUserConversations: () => {
        return Axios.get('/api/user/conversations')
    },
    getUserContacts: () => {
        return Axios.get('/api/user/contacts')
    },
    searchUsersByEmailOrName: (query) => {
        return Axios.get(`/api/user?searchTerm=${query}`)
    },
    addContact: (contactID) => {
        return Axios(`/api/user/contacts`, {
            method: 'POST',
            data: { contactID },
            headers,
        })
    }

}
export default UserServices