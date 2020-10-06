import React from 'react';
import './UserList.css';

const usersData = [
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

const UserList = () => {
  return (
    <div className="UserList">
      <div className="list-title">People's List</div>
      <div className="list">
        {usersData && usersData.map((user) => 
          <div className="list-user">
            <div>
              <div className="list-user-name">{user.name}</div>
              <div className="list-user-company">
                <i class="material-icons list-icon">corporate_fare</i>
                {user.company}
              </div>
            </div>
            <div>
              <img src="" className="list-photo" alt={user.name} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
 
export default UserList;