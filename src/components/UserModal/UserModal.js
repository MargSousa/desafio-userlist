import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './UserModal.css';

const UserModal = (props) => {

  const { show, handleClose, modalData } = props; 
  
  return (
    <>
      <Modal id="modal-card" show={show} onHide={handleClose} centered>
        <Modal.Header id="modal-title" closeButton>
          Person Information
        </Modal.Header>
        <Modal.Body id="modal-info">
          <div className="modal-info-main">
            <div className="user-initials modal-photo">
              {modalData.first_char}{modalData.last_name.slice(0,1)}
            </div>
            <div className="user-name">{modalData.name}</div>
            <div className="user-number">{modalData.phone[0].value}</div>
          </div>
          <div className="modal-info-details">
            <div className="user-field">
              <div className="user-field-name">Email</div>
              <div>{modalData.email[0].value}</div>
            </div>
            <div className="user-field">
              <div className="user-field-name">Organization</div>
              <div>{modalData.org_name}</div>
            </div>
            <div className="user-field">
              <div className="user-field-name">Assistant</div>
              <div>{modalData['9632df94b56a8117253efbdb68d0654d298d7dd7']}</div>
            </div>
            <div className="user-field">
              <div className="user-field-name">Groups</div>
              <div>{modalData.organization['6d43f45c21c3265a5614068fd51042674d528fab']}</div>
            </div>
            <div className="user-field">
              <div className="user-field-name">Location</div>
              <div>
                { `${modalData.organization.address}, ${modalData.organization.address_country}`}
              </div>
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