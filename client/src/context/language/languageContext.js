import React, { createContext, useCallback, useContext, useState } from 'react'
const LanguageContext = createContext()

export const getMessageTextVersion = (message, isOriginal, targetLanguage) => {
    if (!message) return ''
    if (isOriginal)
        return Object.values(message.textVersions)[0]
    else
        return message.textVersions[targetLanguage] || Object.values(message.textVersions)[0]
}
const LanguageProvider = ({ children }) => {
    const [isOriginalLanguage, setIsOriginalLanguage] = useState(false)
    const toggleOrginalLanguage = useCallback(() => {
        setIsOriginalLanguage(!isOriginalLanguage)
    }, [isOriginalLanguage])
    return (
        <LanguageContext.Provider value={{ isOriginalLanguage, toggleOrginalLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}
export const useLanguageContext = () => useContext(LanguageContext)
export default LanguageProvider