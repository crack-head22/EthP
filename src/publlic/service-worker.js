/* eslint-disable no-restricted-globals */
self.addEventListener('push', function(event) {
    const options = {
      body: event.data.text(),
      icon: 'icon.png', // replace with your icon
      badge: 'badge.png', // replace with your badge
    };
    
    event.waitUntil(
      self.registration.showNotification('New Transfer Alert', options)
    );
  });
  