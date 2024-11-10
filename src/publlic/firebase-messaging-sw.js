importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging.js');

// Initialize Firebase in the service worker
const firebaseConfig = {
  apiKey: "AIzaSyB2zG9h_MsnzjcgiCHp9tusfUpuCscG7tE",
  authDomain: "usdc-transfer-tracker.firebaseapp.com",
  projectId: "usdc-transfer-tracker",
  storageBucket: "usdc-transfer-tracker.firebasestorage.app",
  messagingSenderId: "672171636140",
  appId: "1:672171636140:web:9187ffe35c629cf9db3609",
  measurementId: "G-6YJTK4MT1N"
};

// Initialize Firebase Messaging in the service worker
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background message (this will be triggered when app is in the background or closed)
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  // Show notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});
