import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Checkbox from "@material-ui/core/Checkbox";
import Axios from "axios";
import { useUserStore } from "../../context/user/userContext";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  useConversationsDispatch,
  fetchConversations,
} from "../../context/conversations/conversationsContext";
const CreateGroupChat = ({ open, onClose, contactsList }) => {
  const { user } = useUserStore();
  const [checkedBoxes, setCheckedBoxes] = useState({});
  const dispatch = useConversationsDispatch();
  const handleChange = (event) => {
    setCheckedBoxes({
      ...checkedBoxes,
      [event.target.name]: event.target.checked,
    });
  };

  const createConversation = () => {
    let users = Object.entries(checkedBoxes).reduce((emails, [prop, val]) => {
      if (val === true) {
        setCheckedBoxes(prevState => ({ ...prevState, [prop]: false }))
        emails.push(prop)
      }
      return emails;
    }, [])
    Axios.post(`/user/groupchat`, [...users, user.email])
      .then((msg) => {
        fetchConversations(user.email, dispatch);
        onClose()
      })
      .catch((err) => {
        if (err.response.data.code === 11000) {
          alert("chat already exists")
          onClose();
        }
      })
  }
  useEffect(() => {
    Object.keys(contactsList).forEach((contact) => {
      setCheckedBoxes((prevState) => ({
        ...prevState,
        [contact]: false,
      }));
    });
  }, [contactsList]);

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create Group Chat</DialogTitle>
      <DialogContent>
        <FormGroup>
          {!!Object.keys(contactsList).length &&
            Object.keys(contactsList).map((contact, i) => (
              <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    checked={checkedBoxes[contact]}
                    name={contact}
                    color="primary"
                    onChange={handleChange}
                  />
                }
                label={contact}
              />
            ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={createConversation} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default CreateGroupChat;
