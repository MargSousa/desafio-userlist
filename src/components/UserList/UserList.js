import React, { useEffect, useState } from 'react';
import './UserList.css';
import UserModal from '../UserModal/UserModal';

const UserList = () => {
  
  const data = [
    {
      id: 1,
      name: 'Michael Barton',
      company: 'PerkinElmer Inc',
      phone: '+111 231 23 23',
      email: 'michaelbarton@email.com',
      groups: 'Tech',
      location: 'London, United Kingdom',
      assistant: 'John 1'
    },
    {
      id: 2,
      name: 'Charles Ross',
      company: 'CKE Restaurants Inc.',
      phone: '+333 100 10 01',
      email: 'charles.ross@email.com',
      groups: 'TV',
      location: 'New York, United States',
      assistant: 'John 2'
    },
    {
      id: 3,
      name: 'Luelia Vasquez',
      company: 'Circuit City Stores Inc.',
      phone: '+345 222 22 22',
      email: 'luelia.vasquez@email.com',
      groups: 'Women in Tech',
      location: 'Madrid, Spain',
      assistant: 'John 3'
    },
  ]

  const [usersData, setUsersData] = useState(data);
  const [modalData, setModalData] = useState(0);
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   setUsersData(data);
  // }, [])
    
  const handleOpenModal = (event) => {
    const id = Number(event.currentTarget.id)
    const selectedUser = usersData.filter(user => user.id === id)
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
                {user.company}
              </div>
            </div>
            <div>
              <img src="" className="list-photo" alt={user.name} />
            </div>
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