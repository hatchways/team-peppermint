import React from "react";
import PropTypes from "prop-types";
import { useStyles } from "./style";
import { Modal, Backdrop, Fade } from "@material-ui/core";

const PictureModal = ({ open, src, handleModalClose }) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="user-image"
      className={classes.modal}
      open={open}
      onClose={handleModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <img
          src={src && src}
          alt="userpicture"          
          className={classes.image}
        ></img>
      </Fade>
    </Modal>
  );
};

export default PictureModal;

PictureModal.propTypes = {
  open: PropTypes.bool,
  src: PropTypes.string,
  handleModalClose: PropTypes.func,
};
