importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// var firebaseConfig = {
//     apiKey: "AIzaSyAHVJx4p9hQVMAknaH2ocNKnL9v0pb3lXw",
//     authDomain: "webpushdemo-6edfe.firebaseapp.com",
//     projectId: "webpushdemo-6edfe",
//     storageBucket: "webpushdemo-6edfe.appspot.com",
//     messagingSenderId: "994621199473",
//     appId: "1:994621199473:web:49decf39db04b524c037d0",
//     measurementId: "G-CWRPY7S2NW"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);


//   const messaging = firebase.messaging();


//   messaging.getToken()
//     .then(token => {
//         console.log('token :', token);
//         localStorage.setItem('token', token);
//     })
//     .catch(error => {
//         console.log('error :', error);
//     })

//     messaging.on


self.addEventListener('push', (event) => {
    console.info('Event: Push', event);
    const data = event.data.json();

    console.info('data', data);
//     console.info('data.title', data.title);
    
    var title = data.notification.title;
    var body = {
        body: data.notification.body,
        tag: data.notification.tag,
        image: data.notification.image,
    };

    console.info('body', body);
    event.waitUntil(
        self.registration.showNotification(title, body)
    );
});

// self.addEventListener("notificationclick", function (t) {
//     console.log('notificationclick :', t);
// });

// // const messaging = firebase.messaging();

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