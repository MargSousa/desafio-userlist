import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserModal from '../UserModal/UserModal';
import './UserList.css';

const UserList = () => {
  
  const [usersData, setUsersData] = useState([]);
  const [orgsData, setOrgsData] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get('/persons')
    .then(res => {
      console.log(res.data.data[0])
      setUsersData(res.data.data)
    })
    .catch(err => console.log('Error retrieving persons'))

    axios.get('/organizations')
    .then(res => {
      setOrgsData(res.data.data)
    })
    .catch(err => console.log('Error retrieving organizations'))

  }, [])
    
  const handleOpenModal = (event) => {
    const id = Number(event.currentTarget.id)
    const selectedUser = usersData.filter(user => user.id === id)
    const orgName = selectedUser[0].org_name;
    const selectedOrg = orgsData.filter(org => org.name === orgName)
    selectedUser[0].organization = selectedOrg[0];
    setModalData(selectedUser[0]);
    setShow(true);
  }
  
  const handleCloseModal = () => {
    setShow(false)
  }

  return (
    <div className="UserList">
      <div className="list-title">People's List</div>
      <div className="list">
        {usersData && usersData.map((user) => 
          <div className="list-user" key={user.id} id={user.id} onClick={handleOpenModal}>
            <div>
              <div className="list-user-name">{user.name}</div>
              <div className="list-user-company">
                <i className="material-icons list-icon">corporate_fare</i>
                {user.org_name}
              </div>
            </div>
            <div className="user-initials list-user-initials">
              {user.first_char}{user.last_name.slice(0,1)}
            </div>
            {/* <div>
              <img src="" className="list-user-photo" alt={user.name} />
            </div> */}
          </div>
        )}
      </div>
    { modalData && 
      <UserModal show={show} modalData={modalData} handleClose={handleCloseModal} />
    }
    </div>
  );
}
 
export default UserList;