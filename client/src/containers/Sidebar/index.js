import React, { useState } from 'react'
import { useStyles } from './style'
import SidebarHeader from '../SidebarHeader'
import SidebarInfo from '../SidebarInfo'
import MenuIcon from '@material-ui/icons/Menu'

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true)
  const classes = useStyles({ showSidebar })
  const menuButtonClick = (event) => {
    setShowSidebar(!showSidebar)
  }
  return (
    <>
      <div
        className={`${classes.root} ${
          showSidebar ? classes.slideIn : classes.slideOut
        }`}
      >
        <SidebarHeader />
        <SidebarInfo />
      </div>
      <div className={classes.sidebarButton} onClick={menuButtonClick}>
        <MenuIcon />
      </div>
    </>
  )
}

export default Sidebar
