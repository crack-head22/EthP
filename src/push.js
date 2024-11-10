import Push from 'push.js'; // Push.js library

export const triggerNotification = (message) => {
  if (Push.Permission.has()) {
    Push.create("New USDC Transfer", {
      body: message,
      timeout: 4000,
      onClick: () => {
        window.focus();
        this.close();
      }
    }).then(() => {
      console.log("Push notification sent successfully");
    }).catch(error => {
      console.error("Error sending push notification:", error);
    });
  } else {
    console.log("Notification permission not granted");
  }
};
