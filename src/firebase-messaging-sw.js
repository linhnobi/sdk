importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// console.log('firebase :', firebase);
// console.log('firebase.messaging() :', firebase.messaging());
// var config = {
//             apiKey: "AIzaSyAHVJx4p9hQVMAknaH2ocNKnL9v0pb3lXw",
//             authDomain: "webpushdemo-6edfe.firebaseapp.com",
//             projectId: "webpushdemo-6edfe",
//             storageBucket: "webpushdemo-6edfe.appspot.com",
//             messagingSenderId: "994621199473",
//             appId: "1:994621199473:web:49decf39db04b524c037d0",
//             measurementId: "G-CWRPY7S2NW"
//         };
            
        
//             firebase.initializeApp(config);

// self.addEventListener('push', this.pushHandler.bind(this));
// self.addEventListener("notificationclick", this.notificationClickListener.bind(this)),
function pushReceivedTracking(messageId) {
    const bodyService = {
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

    const url = 'https://api-test1.mobio.vn/nm/webhook/api/v2.0/webhook/channel/WEB_PUSH/batch';

    self.fetch(url, init)
        .then(response => {
            console.log('webhook/batch', response);
        })
        .catch(error => {
            console.error(error);
        })
}

function showNotification(data) {
    const title = data.notification.title;
    const body = {
        body: data.notification.body,
        tag: data.notification.tag || data.data.tag,
        image: data.notification.image || data.data.image,
        data: {
            url: data?.data?.url_target
        }
    };
    console.log('url_target', data?.data?.url_target);
    try {
        return self.registration.showNotification(title, body).then(response => {
            console.log('showNotification :', response);
        })
    } catch (error) {
        console.log('showNotification :', showNotification);        
    }
}

function getFavicon() {
    console.log('self', self);
    console.log('document', self.localStorage);
}

function pushHandler(params) {
    console.log('pushHandler :',params);
}

function notificationClickListener(params) {
    console.log('notificationClickListener :',params);
}

self.addEventListener('push', (event) => {
    const data = event.data.json();
    console.info('data', data);
    const messageId = data.data.message_id;
    const analyticsPromise = pushReceivedTracking(messageId);
    const pushInfoPromise = showNotification(data);

    const promiseChain = Promise.all([
        pushInfoPromise
      ]);
    
      event.waitUntil(promiseChain);

    // self.registration.getNotifications({ tag : 'user_alerts' }).then(function(notifications) {
    //     console.log("getNotifications -->", notifications);
    // })

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

self.addEventListener("notificationclick", (event) => {
    console.log('notificationclick :', event);
    const url = event.notification.data?.url;
    console.log('url_target', url);
    event.notification.close();
    event.waitUntil(
        Promise.all([this.openNotification(url)])
    );
});

self.addEventListener("notificationclose", (event) => {
    console.log('notificationclose :', event);
});

self.addEventListener("activate", function (t) {
    return t.waitUntil(self.clients.claim());
});

self.addEventListener("install", function (t) {
    return t.waitUntil(self.skipWaiting());
}),


function isValidUrl(url) {
    return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url);
}

function openNotification(url) {
    return self.clients.matchAll({ type: 'window'}).then(wdClient => {
        if (self.clients.openWindow) {
            return self.clients.openWindow(url);
        }
    });
}
