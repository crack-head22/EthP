import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import Dashboard from './Dashboard.js';
import './index.css';
import './App.css';
import './Dashboard.css';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2zG9h_MsnzjcgiCHp9tusfUpuCscG7tE",
  authDomain: "usdc-transfer-tracker.firebaseapp.com",
  projectId: "usdc-transfer-tracker",
  storageBucket: "usdc-transfer-tracker.firebasestorage.app",
  messagingSenderId: "672171636140",
  appId: "1:672171636140:web:9187ffe35c629cf9db3609",
  measurementId: "G-6YJTK4MT1N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const App = () => {
  const [transfers, setTransfers] = useState([]);
  const [notificationError, setNotificationError] = useState(null);

  useEffect(() => {
    // Request notification permissions and get the token
    const requestNotificationPermission = async () => {
      try {
        const token = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' });  // Replace with your VAPID key
        if (token) {
          console.log('FCM Token:', token);
          // Send this token to your server to store and use it to send notifications
        } else {
          setNotificationError('Failed to get token for notifications.');
        }
      } catch (error) {
        console.error('Error getting notification permission:', error);
        setNotificationError('Notification permission denied. Please enable it in your browser settings.');
      }
    };

    requestNotificationPermission();

    // Fetch USDC transfers from your backend
    const fetchTransfers = async () => {
      try {
        const response = await fetch('http://localhost:8000/get-transfers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address: "0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" }), // Replace with actual address
        });

        if (!response.ok) {
          throw new Error('Failed to fetch transfers');
        }

        const data = await response.json();
        setTransfers(data.transfers);

        if (data.transfers.length > 0) {
          sendPushNotification(data.transfers[data.transfers.length - 1]);
        }
      } catch (error) {
        console.error("Error fetching transfers:", error);
      }
    };

    fetchTransfers();
    const interval = setInterval(fetchTransfers, 60000); // Polling every minute

    return () => clearInterval(interval);
  }, []);

  // Handle push notifications while app is in the foreground
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // Customize notification UI as needed
  });

  const sendPushNotification = (transfer) => {
    // Send push notification using Firebase Cloud Messaging
    if (Notification.permission === 'granted') {
      new Notification("New USDC Transfer", {
        body: `From: ${transfer.from} To: ${transfer.to} Amount: ${transfer.value} USDC`,
        icon: 'https://your-icon-url.png'
      }).then(() => {
        console.log("Push notification sent successfully");
      }).catch((error) => {
        console.error("Error sending push notification:", error);
      });
    } else {
      console.log("Push notification permission not granted");
    }
  };

  return (
    <div>
      {notificationError && <p>{notificationError}</p>}
      <Dashboard transfers={transfers} />
    </div>
  );
};

export default App;
