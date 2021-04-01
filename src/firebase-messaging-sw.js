importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

console.log('self :', self);


self.addEventListener('push', (event) => {
    console.info('Event: Push', event);
    const data = event.data.json();

    console.info('data', data);

    var title = data.notification.title;
    var body = {
        body: data.notification.body,
        tag: data.notification.tag || data.data.tag,
        image: data.notification.image || data.data.image,
    };
    // icon: self.SDK.funcGlobal.getFavicon(),
    // actions: [{action: data.data.url_target, title: "Đồng Ý"}]
    self.urlTarget =  data?.data?.url_target;
    console.log('url_target', urlTarget);
    // console.log('FAVICON', win.localStorage.getItem('m_favicon'));
    console.log('FAVICON', self);
    var messageId = data.data.message_id
    console.log('messageId', messageId);
    // alert('1111111111111111');
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

self.addEventListener("notificationclick", (event) => {
    console.log('notificationclick :', event);
    const url = self.urlTarget;
    event.notification.close();
    if (!url) {
        return;
    }
    console.log('url_target', self.urlTarget);
    event.waitUntil(
        clients.matchAll({ type: 'window'}).then( wdClient => {
            // Check if there is already a window/ tab open width the target URL
            for (let i = 0; i < wdClient.length; i++) {
                const client = wdClient[i];
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }             
            }
            // If not, the open then target URL in a new window/tab.
            if (clients.openWindow) {
                clients.openWindow(url);
            }
        })
    );
});

self.addEventListener("notificationshow", (event) => {
    console.log('notificationShow :', event);
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