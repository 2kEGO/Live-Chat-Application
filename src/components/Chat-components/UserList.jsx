import React from 'react';
import UserListItem from './UserListItem.jsx';

const UserList = ({ chats, selectedChatId, onSelect, error }) => {
  if (error) return <span>Error loading chats</span>;

  if (!chats || Object.keys(chats).length === 0) return <span>No chats available</span>;

  return (
    <div className="user-list">
      {Object.entries(chats).map(([chatId, chat]) => (
        <UserListItem 
          key={chatId} 
          chatId={chatId} 
          chat={chat} 
          isSelected={selectedChatId === chatId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default UserList;
