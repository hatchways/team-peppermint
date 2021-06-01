import React, { useState } from 'react'
import { useStyles } from './style'
import { AppBar, Tabs, Tab, Box } from '@material-ui/core'
import ChatList from '../ChatList'
import ContactsList from 'containers/ContactsList'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const SidebarInfo = () => {
  const classes = useStyles()
  const [tabNumber, setTabNumber] = useState(0)
  const handleChange = (event, newValue) => {
    setTabNumber(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          color: 'black',
          maxWidth: '100%',
          backgroundColor: '#f5f7fb',
          boxShadow: 'none',
        }}
      >
        <Tabs
          className={classes.tabsHeader}
          value={tabNumber}
          onChange={handleChange}
          aria-label="tabs header"
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab
            label="Chats"
            {...a11yProps(0)}
            style={{
              minWidth: '50%',
              outline: 'none',
            }}
          />
          <Tab
            label="Contacts"
            {...a11yProps(1)}
            style={{ minWidth: '50%', outline: 'none' }}
          />
        </Tabs>
      </AppBar>

      <TabPanel value={tabNumber} index={0} className={classes.tabPanel}>
        <ChatList />
      </TabPanel>
      <TabPanel value={tabNumber} index={1} className={classes.tabPanel}>
        <ContactsList />
      </TabPanel>
    </div>
  )
}

export default SidebarInfo
