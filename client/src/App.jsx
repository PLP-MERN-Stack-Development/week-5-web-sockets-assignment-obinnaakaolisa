import React, { useState } from 'react';
import { useSocket } from './socket/socket';
import Login from './components/Login';
import Chat from './components/Chat';
import UserList from './components/UserList';

function App() {
  const { connect, disconnect, isConnected } = useSocket();
  const [username, setUsername] = useState('');

  const handleLogin = (name) => {
    setUsername(name);
    connect(name);
  };

  const handleLogout = () => {
    disconnect();
    setUsername('');
  };

  return (
    <div className="App">
      <h1>Socket.io Chat</h1>
      {isConnected ? (
        <div>
          <p>Welcome, {username}!</p>
          <button onClick={handleLogout}>Logout</button>
          <div style={{ display: 'flex' }}>
            <Chat />
            <UserList />
          </div>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
