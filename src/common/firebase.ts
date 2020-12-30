import firebase from 'firebase/app';
import 'firebase/messaging';
import { ConfigSDK } from '../config/config';

export class FireBase {
    constructor() {

    }

    init(config?: any) {
        // var config = {
        //     apiKey: "AIzaSyAHVJx4p9hQVMAknaH2ocNKnL9v0pb3lXw",
        //     authDomain: "webpushdemo-6edfe.firebaseapp.com",
        //     projectId: "webpushdemo-6edfe",
        //     storageBucket: "webpushdemo-6edfe.appspot.com",
        //     messagingSenderId: "994621199473",
        //     appId: "1:994621199473:web:49decf39db04b524c037d0",
        //     measurementId: "G-CWRPY7S2NW"
        // };

        firebase.initializeApp(config);
        // console.log('firebase :', firebase);
        // return firebase;
        const messaging = firebase.messaging();

        // console.log('messaging' ,messaging);
        
        // console.log('isSupported :', firebase.messaging.isSupported());

        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('firebase-messaging-sw.js')
                    .then(registration => {
                        messaging.getToken()
                            .then(token => {
                                console.log('token :', token);
                                window.localStorage.setItem(ConfigSDK.TOKEN_FIREBASE, token);
                            })
                            .catch(error => {
                                console.log('error :', error);
                            })
                                
                    });
            })
        }

        // messaging.onMessage((payload) => {
        //     console.log('Message received. ', payload);
        //     // ...
        //   });

        //   messaging.onBackgroundMessage(function(payload) {
        //     console.log('[firebase-messaging-sw.js] Received background message ', payload);
        //     // Customize notification here
        //     // const notificationTitle = 'Background Message Title';
        //     // const notificationOptions = {
        //     //   body: 'Background Message body.',
        //     //   icon: '/firebase-logo.png'
        //     // };
          
        //     // self.registration.showNotification(notificationTitle,
        //     //   notificationOptions);
        //   });

        // messaging.onTokenRefresh(() => {
        //     messaging.getToken().then((currentToken) => {
        //         console.log('currentToken :', currentToken);
        //     //   saveUserToken(currentToken);
        //     });
        //   });
            

        // firebase.messaging().

        // navigator.serviceWorker.ready
        //     .then(registration => {
        //         if (!registration.pushManager) {
        //             console.log('This browser does not support push notification.');
        //             return;
        //         }

        //         registration.pushManager.subscribe( { userVisibleOnly: true})
        //             .then((subscription) => {
        //                 console.log('Push notification subscribed');
        //                 console.log(subscription);
        //             })
        //             .catch(error => {
        //                 console.error('Push notification subscription error: ', error);
        //             })
        //     });

        
    }

    getFirebase() {
        return firebase;
    }

    

}