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

    var title = data.notification.title;
    var body = {
        body: data.notification.body,
        tag: data.notification.tag || data.data.tag,
        image: data.notification.image || data.data.image,
        // requireInteraction: true
    };

    console.log('body', body);
    var messageId = data.data.message_id
    console.log('messageId', messageId);

    var bodyService = {
        data: [
            {
                id: messageId,
                type: 'sent',
                status: 1,
                reason: 'Success'
            }
        ]
    }
    const init = {
        method: 'post',
        headers: new Headers({
            'Content-Type':'application/json'
        }),
        body: JSON.stringify(bodyService),
    };

    const url = 'https://api-test1.mobio.vn/nm/webhook/api/v2.0/webhook/channel/webpush/batch';

    self.fetch(url, init)
        .then(response => {

        })
        .catch(error => {
            console.error(error);
        })

    event.waitUntil(
        self.registration.showNotification(title, body)
    );



});

// self.addEventListener('fetch', function (event) {
// 	console.log("Request -->", event.request.url);

// 	//To tell browser to evaluate the result of event
// 	event.respondWith(
// 		caches.match(event.request) //To match current request with cached request it
// 		.then(function(response) {
// 			//If response found return it, else fetch again.
// 			return response || fetch(event.request);
// 		})
// 		.catch(function(error) {
// 			console.error("Error: ", error);
// 		})
//   );
// });

self.addEventListener("notificationclick", function (t) {
    console.log('notificationclick :', t);
});

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