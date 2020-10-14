import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import UserModal from '../UserModal/UserModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import NewUserModal from '../NewUserModal/NewUserModal';
import './UserList.css';

const UserList = () => {
  
  const [searchData, setSearchData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [orgsData, setOrgsData] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showNewUser, setShowNewUser] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const personsURL = `http://api.pipedrive.com/v1/persons?api_token=1113ec917592c2787272af04dfaf51159b34a443`;
    const orgsURL = `http://api.pipedrive.com/v1/organizations?api_token=1113ec917592c2787272af04dfaf51159b34a443`;
    
    axios.get(personsURL)
      .then(res => {
        setUsersData(res.data.data);
        setSearchData(res.data.data);
      })
      .catch(err => console.log('Error retrieving persons'))

    axios.get(orgsURL)
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

    if (event.target.name === "delete") {
      setShowDelete(true);
    } else {
      setShow(true);
    }
  }
  
  const handleCloseModal = () => {
    setShow(false);
    setShowDelete(false);
    setShowNewUser(false);
  }

  const handleOnDragEnd = (params) => {
    const sourceIndex = params.source.index;
    const destinIndex = params.destination.index;
    let orderData = [...usersData];
    orderData.splice(sourceIndex, 1);
    orderData.splice(destinIndex, 0, usersData[sourceIndex]);
    setUsersData(orderData);
  }

  const handleDeletePerson = () => {
    const deleteURL = `https://api.pipedrive.com/v1/persons/${modalData.id}?api_token=1113ec917592c2787272af04dfaf51159b34a443`;
    axios.delete(deleteURL)
      .then(res => {
        const newData = usersData.filter(user => user.id !== modalData.id)
        setUsersData(newData);
        setShowDelete(false);
      })
      .catch(err => console.log('Error deleting person'))
  }

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearch(value);
    
    const data = searchData;
    const searchResults = data.filter(user => user.name.toLowerCase().includes(value.toLowerCase()) === true);
    setUsersData(searchResults);
  }

  const handleSubmitSearch = (event) => {
    event.preventDefault();
  }

  const handleOpenNewUser = () => {
    setShowNewUser(true);
  }

  const handleNewUser = (data) => {
    handleCloseModal();
    window.location.reload();
  }

  return (
    <div className="UserList">
      <div className="list-header">
        <div className="list-title">People's List</div>
        <div className="list-features">
          <button id="list-add-user" onClick={handleOpenNewUser}>
            <i className="material-icons add-icon">add</i>
            <span className="add-title">Person</span>
          </button>
          <div className="list-search">
            <i className="material-icons search-icon">search</i>
            <form onSubmit={handleSubmitSearch}>
              <input type="text" name="search" value={search} className="search-input" onChange={handleSearch} placeholder="Search by name..." autoComplete="off" />
            </form>
          </div>
        </div>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable-1">
          {(provided, snapshot) => (
            <div className="list" ref={provided.innerRef} {...provided.droppableProps} >
              {usersData && usersData.map((user, index) => (
              <Draggable key={user.id} draggableId={`draggable-${user.id}`} index={index}>
                {(provided, snapshot) => (
                  <div className="list-user" id={user.id} onClick={handleOpenModal} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                    <div>
                      <div className="list-user-name">{user.name}</div>
                      <div className="list-user-company">
                        <i className="material-icons list-icon">corporate_fare</i>
                        {user.org_name}
                      </div>
                    </div>
                    <div className="right-section">
                      <div className="user-initials list-user-initials">
                        {user.first_char}{user.last_name.slice(0,1)}
                      </div>
                      <div className="button-section">
                        <button className="button-delete" name="delete">
                          <i className="material-icons delete-icon">delete</i>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable> 
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    { modalData && 
      <UserModal show={show} modalData={modalData} handleClose={handleCloseModal} />
    }
    { modalData && 
      <DeleteModal show={showDelete} user={modalData.name} handleClose={handleCloseModal} handleDelete={handleDeletePerson}/>
    }
    <NewUserModal show={showNewUser} handleClose={handleCloseModal} handleAddNew={handleNewUser} />
    </div>
  );
}
 
export default UserList;