import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './NewUserModal.css';

const NewUserModal = (props) => {

  const { show, handleClose, handleAddNew } = props; 

  const { register, handleSubmit, errors } = useForm();

  const onFormSubmit = async (data) => {
    const { org_name, groups, address, city, country, lastName, ...newPersonData } = data;
    newPersonData.name = `${data.name} ${lastName}`;
    newPersonData.email = { value: newPersonData.email };
    let orgID = 0;
    const getOrgURL = `https://api.pipedrive.com/v1/organizations/search?term=${org_name}&fields=name&exact_match=true&start=0&api_token=1113ec917592c2787272af04dfaf51159b34a443`;
    const newOrgURL = `https://api.pipedrive.com/v1/organizations?api_token=1113ec917592c2787272af04dfaf51159b34a443`;
    const postURL = `https://api.pipedrive.com/v1/persons?api_token=1113ec917592c2787272af04dfaf51159b34a443`;

    // Check if organization exists
    await axios.get(getOrgURL)
      .then( res => {
        const itemsLength = res.data.data.items.length;
        if (itemsLength > 0) {
          orgID = res.data.data.items[0].item.id;
        }
      })

    // If organization doesnt exist, it will be created
    if (orgID === 0) {
      const newOrg = { 
        name: org_name,
        address: `${address}, ${city}`,
        address_country: country,
        address_locality: city,
        '6d43f45c21c3265a5614068fd51042674d528fab': groups,
       };

      await axios.post(newOrgURL, newOrg)
        .then(res => {
          orgID = res.data.data.id;
        })
        .catch(err => console.log('Error creating org'))
    }

    newPersonData.org_id = orgID;

    //Add new Person
    await axios.post(postURL, newPersonData)
      .then(res => {
        handleAddNew();
      })
      .catch(err => console.log('Error adding person'))
  
  }

  return (
    <>
      <Modal id="modal-card" show={show} onHide={handleClose} centered>
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <Modal.Header id="modal-title" closeButton>
              Add Person
            </Modal.Header>
            <Modal.Body id="modal-info">
              <div className="new-form">
                <div>
                  <div className="new-input"> 
                    <span className="new-input-name">First Name</span>
                    <input type="text" name="name" ref={register({ required:true })} />
                  </div>
                  {errors.name && <div className="form-error">* Field required</div>}
                </div>
                <div>
                  <div className="new-input"> 
                    <span className="new-input-name">Last Name</span>
                    <input type="text" name="lastName" ref={register({ required:true })} />
                  </div>
                  {errors.name && <div className="form-error">* Field required</div>}
                </div>
                <div>
                  <div className="new-input"> 
                    <span className="new-input-name">Phone Number</span>
                    <input type="tel" name="phone" ref={register({ required:true })} />
                  </div>
                  {errors.phone && <div className="form-error">* Field required</div>}
                </div>
                <div>
                  <div className="new-input"> 
                    <span className="new-input-name">Email</span>
                    <input type="text" name="email" ref={register({ required:true })} />
                  </div>
                  {errors.email && <div className="form-error">* Field required</div>}
                </div>
                <div>
                  <div className="new-input"> 
                    <span className="new-input-name">Organization</span>
                    <input type="text" name="org_name" ref={register({ required:true })} />
                  </div>
                  {errors.org_name && <div className="form-error">* Field required</div>}
                </div>
                <div>
                  <div className="new-input"> 
                    <span className="new-input-name">Assistant</span>
                    <input type="text" name="9632df94b56a8117253efbdb68d0654d298d7dd7" ref={register({ required:true })} />
                  </div>
                  {errors.assistant && <div className="form-error">* Field required</div>}
                </div>
                <div>
                  <div className="new-input"> 
                    <span className="new-input-name">Groups</span>
                    <input type="text" name="groups" ref={register({ required:true })} />
                  </div>
                  {errors.groups && <div className="form-error">* Field required</div>}
                </div>
                <div>
                  <div className="new-input"> 
                    <span className="new-input-name">Address</span>
                    <input type="text" name="address" ref={register({ required:true })} />
                  </div>
                  {errors.location && <div className="form-error">* Field required</div>}
                </div>
                <div>
                  <div className="new-input"> 
                    <span className="new-input-name">City</span>
                    <input type="text" name="city" ref={register({ required:true })} />
                  </div>
                  {errors.location && <div className="form-error">* Field required</div>}
                </div>
                <div>
                  <div className="new-input"> 
                    <span className="new-input-name">Country</span>
                    <input type="text" name="country" ref={register({ required:true })} />
                  </div>
                  {errors.location && <div className="form-error">* Field required</div>}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer id="modal-footer">
              <Button id="button-back" onClick={handleClose}>
                Back
              </Button>
              <Button id="button-add" type="submit">
                Save
              </Button>
            </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
 
export default NewUserModal;