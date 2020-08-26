import React, { useState } from "react";
import PropTypes from "prop-types";
import { useStyles } from "./style";
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  ButtonBase,
  Tooltip,
  Collapse,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ChatList from "../ChatList";
import ContactsList from "../ContactsList";
import InvitationsList from "../InvitationsList";
import { DebounceInput } from "react-debounce-input";
import ClearIcon from "@material-ui/icons/Clear";
import {
  useContactsDispatch,
  fetchContactsAndInvitations,
  userEmailFromLocalStorage,
  findContacts,
} from "../../context/contacts/contactsContext";
import Alert from "@material-ui/lab/Alert";

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
  const [tabNumber, setTabNumber] = useState(0);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useContactsDispatch();

  const userEmail = userEmailFromLocalStorage();

  const handleChange = (event, newValue) => {
    setTabNumber(newValue);
  };

  const handleSearch = async (query) => {
    setQuery(query);
    const res = await findContacts(userEmail, query, dispatch);
    setTabNumber(1);
    if (!res) {
      setIsOpen(true);
      setTimeout(() => setIsOpen(false), 2000);
    }
  };

  const handleSearchClear = (params) => {
    fetchContactsAndInvitations(userEmail, dispatch);
    setQuery("");
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
          value={tabNumber}
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
        <DebounceInput
          className={classes.debounceInput}
          onChange={(e) => handleSearch(e.target.value)}
          debounceTimeout={300}
          value={query}
          minLength={2}
        />
        <Tooltip title="Clear search" placement="bottom" arrow>
          <ButtonBase
            onClick={handleSearchClear}
            className={classes.clearIcon}
          >
            <ClearIcon />
          </ButtonBase>
        </Tooltip>
      </div>
      <Collapse in={isOpen} className={classes.collapse}>
        <Alert severity="info" className={classes.alert}>
          <Typography variant="body1">Contact not found</Typography>
        </Alert>
      </Collapse>
      <TabPanel value={tabNumber} index={0} className={classes.tabPanel}>
        <ChatList />
      </TabPanel>
      <TabPanel value={tabNumber} index={1} className={classes.tabPanel}>
        <ContactsList />
      </TabPanel>
      <TabPanel value={tabNumber} index={2} className={classes.tabPanel}>
        <InvitationsList />
      </TabPanel>
    </div>
  );
};

export default SidebarInfo;
