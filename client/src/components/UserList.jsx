import React from 'react';
import { useSocket } from '../socket/socket';

const UserList = () => {
  const { users, sendPrivateMessage } = useSocket();

  const handlePrivateMessage = (userId) => {
    const message = prompt('Enter your private message:');
    if (message) {
      sendPrivateMessage(userId, message);
    }
  };

  return (
    <div>
      <h2>Online Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username}{' '}
            <button onClick={() => handlePrivateMessage(user.id)}>
              Private Message
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
