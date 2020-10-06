import React, { useEffect, useState } from 'react';
import './UserList.css';
import UserModal from '../UserModal/UserModal';

const UserList = () => {
  
  const data = [
    {
      id: 1,
      name: 'Michael Barton',
      company: 'PerkinElmer Inc',
    },
    {
      id: 2,
      name: 'Charles Ross',
      company: 'CKE Restaurants Inc.'
    },
    {
      id: 3,
      name: 'Luelia Vasquez',
      company: 'Circuit City Stores Inc.'
    },
  ]

  const [usersData, setUsersData] = useState(data);
  const [modalData, setModalData] = useState(0);
  const [show, setShow] = useState(true);

  
  // useEffect(() => {
    //   setUsersData(data);
    // }, [])
    
  const handleOpenModal = (event) => {
    setModalData(event.target.id);
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
                {user.company}
              </div>
            </div>
            <div>
              <img src="" className="list-photo" alt={user.name} />
            </div>
          </div>
        )}
      </div>
      <UserModal show={show} modalData={modalData} handleClose={handleCloseModal} />
    </div>
  );
}
 
export default UserList;