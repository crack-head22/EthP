// Import the necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Firebase configuration object (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyB2zG9h_MsnzjcgiCHp9tusfUpuCscG7tE",
  authDomain: "usdc-transfer-tracker.firebaseapp.com",
  projectId: "usdc-transfer-tracker",
  storageBucket: "usdc-transfer-tracker.firebasestorage.app",
  messagingSenderId: "672171636140",
  appId: "1:672171636140:web:9187ffe35c629cf9db3609",
  measurementId: "G-6YJTK4MT1N"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

// Get the FCM token for notifications
const getFirebaseToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "BL9RFN0-heB7eUpJQ_WF1IgE8ca799Y0GbKJx68ewdldv6wN8D9fsHlBHEfOfwjFYmbvK1QKOg0PjOvc5qdhsaw" // Add your VAPID key here
    });
    if (token) {
      console.log("FCM Token:", token);
      // Save this token on the server to send notifications to this device
      return token;
    }
  } catch (error) {
    console.error("Error getting token:", error);
  }
};

// Listen for incoming messages (foreground)
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // Handle the push notification here (e.g., show a custom notification)
  alert(`Notification: ${payload.notification.title}`);
});

