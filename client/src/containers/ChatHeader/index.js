import React, { useEffect, useState } from 'react'
import { Typography, Switch, ButtonBase } from '@material-ui/core'
import { useStyles } from './style'
import { MoreVert } from '@material-ui/icons'
import { useLanguageContext } from 'context/language/languageContext'
import { useCurrentConversationStore } from 'context/currentConversation/currentConversationContext'
import { useUserStore } from 'context/user/userContext'
import UserAvatar from 'components/UserAvatar'

const ChatHeader = () => {
  const classes = useStyles()
  const { user } = useUserStore()
  const currentConversation = useCurrentConversationStore()

  const [currentConversationTitle, setCurrentConversationTitle] = useState([])
  const { isOriginalLanguage, toggleOrginalLanguage } = useLanguageContext()
  const handleChange = () => {
    toggleOrginalLanguage()
  }
  useEffect(() => {
    if (currentConversation.users.length > 0)
      setCurrentConversationTitle(
        currentConversation.users.filter(
          (currUser) => user._id !== currUser._id,
        ),
      )
  }, [currentConversation.users, user._id])
  return (
    <div className={classes.root}>
      <div className={classes.chatHeader}>
        {currentConversationTitle.length > 0 ? (
          <div className={classes.chatHeaderUserInfo}>
            <UserAvatar imageUrl={currentConversationTitle[0].imageUrl} />
            <Typography variant="h5">
              {currentConversationTitle[0].name}
            </Typography>
          </div>
        ): <div> </div>}
        <div className={classes.chatHeaderOptions}>
          {isOriginalLanguage ? (
            <Typography variant="body2" className={classes.typography}>
              Original language
            </Typography>
          ) : (
            <Typography
              variant="body2"
              className={classes.typography}
              style={{
                color: 'grey',
                opacity: 0.5,
              }}
            >
              Original language
            </Typography>
          )}
          <Switch
            checked={isOriginalLanguage}
            onChange={handleChange}
            color="primary"
            name="checked"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <ButtonBase
            onClick={() => console.log('Clicked')}
            style={{ marginLeft: 20 }}
          >
            <MoreVert />
          </ButtonBase>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader
