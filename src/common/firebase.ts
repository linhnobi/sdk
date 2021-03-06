import firebase from 'firebase/app';
import 'firebase/messaging';
import { ConfigSDK } from '../config/config';
import { FuncGlobal } from './function';

export class FireBase {
    private funcGlobal;
    constructor() {
        this.funcGlobal = new FuncGlobal();
    }

    init(config?: any) {
        // var configx = {
        //     apiKey: "AIzaSyAHVJx4p9hQVMAknaH2ocNKnL9v0pb3lXw",
        //     authDomain: "webpushdemo-6edfe.firebaseapp.com",
        //     projectId: "webpushdemo-6edfe",
        //     storageBucket: "webpushdemo-6edfe.appspot.com",
        //     messagingSenderId: "994621199473",
        //     appId: "1:994621199473:web:49decf39db04b524c037d0",
        //     measurementId: "G-CWRPY7S2NW"
        // };
        try {
            
        
        firebase.initializeApp(config);
        const messaging = firebase.messaging();

        /**
         * - Register firebase service worker
         * - Get token in Firebase
         * - Send permission notification to server
         */
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                // if (navigator && navigator.serviceWorker) {
                //     return;
                // }
                navigator.serviceWorker.register('firebase-messaging-sw.js')
                    .then(registration => {
                        console.log('registration service worker success');
                    })
                    .catch(error => {
                        console.log('registration service worker:', error);
                    });
            })
        }

        const deviceId = window.localStorage.getItem(ConfigSDK.DEVICE_ID);

        const oldToken = window.localStorage.getItem(ConfigSDK.TOKEN_FIREBASE);
        if (!oldToken) {
            messaging.getToken()
                .then(token => {
                    window.localStorage.setItem(ConfigSDK.TOKEN_FIREBASE, token);
                    this.funcGlobal.sendPermissionToServer(Notification.permission);
                })
                .catch(error => {
                    window.localStorage.removeItem(ConfigSDK.TOKEN_FIREBASE);
                    this.funcGlobal.sendPermissionToServer(Notification.permission);
                });
        }

        /**
         * - Request permission notification in browser
         * - Listen value permission notification when user change permission notification of browser
         * - Send permission notification to server
         */
        Notification.requestPermission(test => {
        }).then((permission) => {
            
            if ('permissions' in navigator) {
                navigator.permissions.query({ name: 'notifications' })
                    .then(notificationPerm => {
                        if (notificationPerm.state === 'denied') {
                            window.localStorage.removeItem(ConfigSDK.TOKEN_FIREBASE);
                            this.funcGlobal.sendPermissionToServer(notificationPerm.state);
                        }
                        notificationPerm.onchange = async (status) => {
                            try {
                                messaging.getToken()
                                    .then(token => {
                                        window.localStorage.setItem(ConfigSDK.TOKEN_FIREBASE, token);
                                        this.funcGlobal.sendPermissionToServer(notificationPerm.state);
                                    }).catch(error => {
                                        if (error.code === "messaging/permission-blocked" || error.code === "messaging/permission-default") {
                                            console.log("messaging not per");
                                            window.localStorage.removeItem(ConfigSDK.TOKEN_FIREBASE);
                                            this.funcGlobal.sendPermissionToServer(notificationPerm.state);
                                        } else {
                                            console.error("Error Occurred", error);
                                        }
                                    });
                            } catch (error) {
                                console.error('notificationPerm.onchange :', error);
                            }
                        }
                    }).catch(err => {
                        console.log('navigator.permissions.query :', err);
                    });
            }
        }).catch((err) => {
            console.log('Notification.requestPermission() :', err);
        });

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

        messaging.onTokenRefresh(() => {
            messaging.getToken().then((currentToken) => {
                console.log('currentToken :', currentToken);
                //   saveUserToken(currentToken);
            });
        });


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
        } catch (error) {
            console.log('error init:', error); 
        }

    }

    getFirebase() {
        return firebase;
    }



}