import React, { useState, useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import Axios from "axios";
import { useUserState } from "../../context/user/userContext";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const CreateGroupChat = ({ open, onClose, contactsList }) => {
  const { user } = useUserState();
  const [checkedBoxes, setCheckedBoxes] = useState({});
  const handleChange = (event) => {
    setCheckedBoxes({ ...checkedBoxes, [event.target.name]: event.target.checked })
  }

  const createConversation = () => {
    let users = Object.entries(checkedBoxes).reduce((emails, [prop, val]) => {
      if (val === true){ 
        setCheckedBoxes(prevState => ({ ...prevState, [prop]: false }))
        emails.push(prop)
      }
      return emails;
    }, [])
    Axios.post(`/user/${user.email}/conversation`, [...users, user.email])
      .then((msg) => {
        Axios.post(`/user/${user.email}/groupchat`, [...users, user.email])
          .then((msg) =>onClose())
          .catch((err) => console.log(err))
          
      })
      .catch((err) => {
        if(err.response.data.code===11000){

          alert("chat already exists")
          onClose();
        }
        
      });
  }
  useEffect(() => {
    contactsList.forEach((contact) => {
      setCheckedBoxes(prevState => ({ ...prevState, [contact.email]: false }));
    })
  }, [contactsList])

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create Group Chat</DialogTitle>
      <DialogContent>
        <FormGroup>

          {!!contactsList.length &&
            contactsList.map((contact, i) =>
              <FormControlLabel
                key={i}
                control={<Checkbox
                  checked={checkedBoxes[contact.email]}
                  name={contact.email}
                  color="primary"
                  onChange={handleChange}

                />}
                label={contact.email}
              />
            )
          }
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
}
export default CreateGroupChat;