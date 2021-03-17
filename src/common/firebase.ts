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

        // console.log('messaging' ,messaging);

        // console.log('isSupported :', firebase.messaging.isSupported());


        messaging.deleteToken()
            .then(result => {
                console.log('result :', result);
            }).catch(error => {
                console.error('error :', error);
            });

        /**
         * - Register firebase service worker
         * - Get token in Firebase
         * - Send permission notification to server
         */
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('firebase-messaging-sw.js')
                    .then(registration => {
                        messaging.getToken()
                            .then(token => {
                                window.localStorage.setItem(ConfigSDK.TOKEN_FIREBASE, token);
                                this.funcGlobal.sendPermissionToServer(Notification.permission);
                            })
                            .catch(error => {
                                window.localStorage.setItem(ConfigSDK.TOKEN_FIREBASE, null);
                                this.funcGlobal.sendPermissionToServer(Notification.permission);
                            });
                    })
                    .catch(error => {
                        console.log('registration service worker:', error);
                    });
            })
        }

        const deviceId = window.localStorage.getItem(ConfigSDK.DEVICE_ID);
        // console.log('deviceId :', deviceId);
        // if (deviceId === null) {
        //     console.log('null');
        // } else {
        //     console.log('not null');
        // }


        /**
         * - Request permission notification in browser
         * - Listen value permission notification when user change permission notification of browser
         * - Send permission notification to server
         */
        console.log('requestPermission 222');
        Notification.requestPermission(test => {
            console.log('requestPermission');
        }).then((permission) => {
            
            if ('permissions' in navigator) {
                navigator.permissions.query({ name: 'notifications' })
                    .then(notificationPerm => {
                        notificationPerm.onchange = async (status) => {
                            try {
                                messaging.getToken()
                                    .then(token => {
                                        window.localStorage.setItem(ConfigSDK.TOKEN_FIREBASE, token);
                                        this.funcGlobal.sendPermissionToServer(notificationPerm.state);
                                    }).catch(error => {
                                        if (error.code === "messaging/permission-blocked" || error.code === "messaging/permission-default") {
                                            console.log("messaging not per");
                                            window.localStorage.setItem(ConfigSDK.TOKEN_FIREBASE, null);
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