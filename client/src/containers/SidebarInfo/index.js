import React from "react";
import PropTypes from "prop-types";
import { useStyles } from "./style";
import { AppBar, Tabs, Tab, Box, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ChatList from "../ChatList";
import ContactsList from "../ContactsList";
import InvitationsList from "../InvitationsList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SidebarInfo = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          color: "black",
          maxWidth: "100%",
          backgroundColor: "#f5f7fb",
          boxShadow: "none",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          variant="fullWidth"
          className={classes.tabs}
        >
          <Tab
            label="Chats"
            {...a11yProps(0)}
            style={{
              minWidth: "33%",
            }}
          />
          <Tab label="Contacts" {...a11yProps(1)} style={{ minWidth: "33%" }} />
          <Tab
            label="Invitations"
            {...a11yProps(2)}
            style={{ minWidth: "33%" }}
          />
        </Tabs>
      </AppBar>

      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>

      <TabPanel value={value} index={0} className={classes.tabPanel}>
        <ChatList />
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tabPanel}>
        <ContactsList />
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.tabPanel}>
        <InvitationsList />
      </TabPanel>
    </div>
  );
};

export default SidebarInfo;
