import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './DeleteModal.css';

const DeleteModal = (props) => {

  const { show, handleClose, handleDelete, user } = props; 

  return (
    <>
      <Modal show={show} onHide={handleClose} centered >
        <Modal.Body className="modal-delete-body">
          Are you sure you want to delete <span className="modal-delete-user">{user}</span>'s from the list?
        </Modal.Body>
        <Modal.Footer id="modal-footer">
          <Button id="button-back" onClick={handleClose}>
            Back
          </Button>
          <Button id="button-delete" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
 
export default DeleteModal;