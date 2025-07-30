import React, { useState, useEffect } from 'react';
import { useSocket } from '../socket/socket';

const Chat = () => {
  const { messages, sendMessage, setTyping, typingUsers } = useSocket();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(false);
        setTyping(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isTyping, setTyping]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
      setTyping(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
      setIsTyping(false);
      setTyping(false);
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg) => (
          <div key={msg.id} style={{ fontStyle: msg.system ? 'italic' : 'normal', color: msg.isPrivate ? 'blue' : 'black' }}>
            {msg.system ? (
              <span>{msg.message}</span>
            ) : (
              <span>
                <strong>{msg.sender}:</strong> {msg.message}
              </span>
            )}
          </div>
        ))}
      </div>
      <div>
        {typingUsers.length > 0 && (
          <p>
            <em>{typingUsers.join(', ')} {typingUsers.length > 1 ? 'are' : 'is'} typing...</em>
          </p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
