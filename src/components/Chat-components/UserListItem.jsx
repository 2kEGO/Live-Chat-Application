import React from 'react';

const UserListItem = ({ chatId, chat, isSelected, onSelect }) => {
  const handleClick = () => onSelect(chat.userInfo, chatId);

  return (
    <div 
      className={`users-list-items ${isSelected ? 'active' : ''}`} 
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }}
    >
      <div className="chat-list-user-info">
        <div className="chat-list-img">
          <span>{chat.userInfo.displayName?.charAt(0).toUpperCase()}</span>
        </div>
        <div className="user-info">
          <div className="user-info-display">
            <h3 className="displayName">{chat.userInfo.displayName}</h3>
            {/* <h5 className="displayName">@{chat.userInfo.userName}</h5> */}
          </div>
          <div className="user-info-message">
            <p>{chat.userInfo.lastMessage?.text || ''}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
