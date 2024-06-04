import React, { useState } from 'react';
import FeatherIcon from 'feather-icons-react';

function NotificationBox({ notifications, onClose, markAsRead, markAllRead }) {
  const [expanded, setExpanded] = useState([]);
  const [notificationsList, setNotificationsList] = useState([])

  const toggleExpand = (index) => {
    const updatedExpanded = [...expanded];
    updatedExpanded[index] = !updatedExpanded[index];
    setExpanded(updatedExpanded);
  };

  return (
    <div className="notification-box">
      <div className="notification-header">
        <h3>Notifications</h3>
        <button onClick={markAllRead} className="mark-all-read-button" title="Mark All as Read">
          Mark All Read
        </button>
        <button onClick={onClose}>&times;</button>
      </div>
      <ul className="notification-list">
        {notifications.map((notification, index) => (
          <li
            key={index}
            className={notification.read ? 'read' : 'unread'}
            onClick={() => {
              if (!notification.read) {
                markAsRead(index);
              }
            }}
          >
            <div className="notification-item">
              <div className="notification-content">
                <h4 className="notification-heading">{notification.messageTopic}</h4>
                <div
                  className={`notification-text ${expanded[index] ? 'expanded' : ''}`}
                >
                  {notification.message}
                  
                  {/* {notification.sender}
                  {notification.updatedAt} */}
                  
                </div>
              </div>
            </div>
            <div className="notification-actions">
              <p className="notification-time">
              
                {/* let myDate = {notification.updatedAt} */}
                {`${new Date(notification.updatedAt).getFullYear()}-${new Date(notification.updatedAt).getMonth()}-${new Date(notification.updatedAt).getDay()} at  ${new Date(notification.updatedAt).getHours()}:${new Date(notification.updatedAt).getMinutes()}`}</p>
              <button
                className="toggle-expand-button"
                onClick={() => toggleExpand(index)}
              >
                <FeatherIcon
                  icon={expanded[index] ? 'chevron-up' : 'chevron-down'}
                  size={20}
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationBox;
