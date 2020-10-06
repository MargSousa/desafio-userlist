import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './UserModal.css';

const UserModal = (props) => {

  const { show, handleClose, modalData } = props; 

  // console.log("card", modalData);

  return (
    <>
      <Modal id="modal-card" show={show} onHide={handleClose} centered>
        <Modal.Header id="modal-title" closeButton>
          Person Information
        </Modal.Header>
        <Modal.Body id="modal-info">
          <div className="modal-info-main">
            <img src="" className="user-avatar" alt="user" />
            <div className="user-name">{modalData.name}</div>
            <div className="user-number">{modalData.phone}</div>
          </div>
          <div className="modal-info-details">
            <div className="user-field">
              <div className="user-field-name">Email</div><div>{modalData.email}</div>
            </div>
            <div className="user-field">
              <div className="user-field-name">Organization</div><div>{modalData.company}</div>
            </div>
            <div className="user-field">
              <div className="user-field-name">Assistant</div><div>{modalData.assistant}</div>
            </div>
            <div className="user-field">
              <div className="user-field-name">Groups</div><div>{modalData.groups}</div>
            </div>
            <div className="user-field">
              <div className="user-field-name">Location</div><div>{modalData.location}</div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer id="modal-footer">
          <Button id="button-back" onClick={handleClose}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
 
export default UserModal;