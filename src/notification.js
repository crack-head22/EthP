import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications from the backend (assuming notifications are stored or calculated there)
  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get-notifications');
      if (response.data.notifications) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Poll for notifications at regular intervals (e.g., every 30 seconds)
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 30000);  // Every 30 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="notification-container">
      <h2>Transfer Notifications</h2>
      {notifications.length === 0 ? (
        <p>No new transfers</p>
      ) : (
        <ul>
          {notifications.map((notif, index) => (
            <li key={index} className="notification-item">
              <strong>{notif.title}</strong>
              <p>{notif.message}</p>
              <span>{new Date(notif.timestamp).toLocaleTimeString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
