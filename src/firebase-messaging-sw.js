self.addEventListener('push', function(event) {
    console.info('Event: Push', event);
    const data = event.data.json;

    console.info('data', data);
    console.info('data.title', data.title);
    
    var title = 'Breaking News';
    var body = {
        'body': 'Click to see the latest breaking news',
        'tag': 'pwa',
        'icon': './images/48x48.png'
    };
    event.waitUntil(
        self.registration.showNotification(title, body)
    );
});

// const messaging = firebase.messaging();

// messaging.setBackgroundMessageHandler(function(payload) {   
//     console.log('payload :', payload)

//     var notificationTitle = payload.data.title;
//     var notificationOptions = {
//       body: payload.data.body,
//       icon: payload.data.icon,
//       locator:payload.data.locator
//     };
//     return self.registration.showNotification(notificationTitle,
//       notificationOptions);
//   });