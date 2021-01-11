import { IHttpResponse } from "../api/http";
import { ConfigSDK } from "../config/config";
import { HTML } from "../config/detail.page";
import { SERVICE_URL } from "../config/service";
import { HttpRequestService } from "../service/http-request";
import { GetDataPage } from "./util/data-page";

// module SomeModule {
export class FuncGlobal {

    /**
     * Check and return safari browser
     */
    detectSafariBrowser() {
        if ('safari' in window && 'pushNotification' in window['safari']) {
            return true;
        }
        return false;
    }

    /**
     * Return Generate Unique ID
     */
    private generateUniqueID() {
        const strStart = Math.random().toString(36).substr(2, 9);
        const strEnd = Math.random().toString(36).substr(2, 10);
        const now = Date.now();
        return `${strStart}${now}${strEnd}`;
    }

    /**
     * Return draft device ID
     */
    createDraftDevice() {
        const deviceID = window.localStorage.getItem(ConfigSDK.DRAFT_DEVICE_ID);
        if (deviceID) {
            return;
        }

        const draftDeviceID = this.generateUniqueID();
        window.localStorage.setItem(ConfigSDK.DRAFT_DEVICE_ID, draftDeviceID);
    }


    selector(selector: string) {
        if (!selector) {
            return;
        }
        const self = {
            selector: selector,
            element: document.querySelector(selector),
            html: () => {
                return self.element;
            },
            getAttribute: (name: string) => {
                return self.element?.getAttribute(name);
            },
            textContent: () => {
                return self.html()?.textContent;
            }
        };

        return self;
    }

    addClassToElement(selector: string, classAdd: string) {
        if (!selector) {
            return;
        }

        const ele = document.querySelector(selector) || null;
        if (ele) {
            ele.className += ` ${classAdd}`;
            return;
        }

    }

    getValueToHTML(config: any) {
        if (config.TYPE === HTML.INNER_TEXT) {
            return this.selector(config.SELECTOR)?.textContent();
        }

        if (config.TYPE === HTML.ATTRIBUTE) {
            return this.selector(config.SELECTOR)?.getAttribute(config.ATTRIBUTE_NAME);
        }
    }


    getValueToHTMLByClass(className: string) {
        const data: any = document.getElementsByClassName(className);
        console.log('data ::', data);
        var value = '';
        if (!data || data.length === 0) {
            return value;
        }
        return value = data[0].innerText;
    }

    /**
     * Include .js file into html
     * @param file 
     * @param document 
     */
    includeJsFile(file: any, document: any) {
        var script = document.createElement('script');
        script.src = `${file}.js`;
        script.type = 'text/javascript';
        script.defer = true;
        document.getElementsByTagName('head').item(0).appendChild(script);
    }

    /**
     * Note Using
     * @param firebase 
     */
    checkNotificationPermission(firebase) {
        const body = this.setDataHttp('register_notification_permission', {})
        if (!window.Notification) {
            body.track.info.token = null;
            body.track.info.permission = 'not_support';
            this.trackService(body);
            return;
        }

        if (Notification.permission === 'granted') {
            console.log('permission :', Notification.permission);
            body.track.info.token = window.localStorage.getItem(ConfigSDK.TOKEN_FIREBASE);
            body.track.info.permission = 'granted';
            this.trackService(body);
            return;
        }

        // body.track.info.token = null;
        // body.track.info.permission = Notification.permission;
        // this.trackService(body);

        const deviceId = window.localStorage.getItem(ConfigSDK.DEVICE_ID);
        console.log('deviceId :', deviceId);
        if (deviceId === null) return;

        Notification.requestPermission().then((permission) => {
            if ('permissions' in navigator) {
                console.log('navigator :', navigator);
                navigator.permissions.query({ name: 'notifications' })
                    .then(notificationPerm => {
                        
                        console.log('notificationPerm :', notificationPerm);
                        notificationPerm.onchange = async (status) => {
                            // const newState: any = status.target.state;
                            // console.log('notificationPerm state:', notificationPerm.state);
                            // console.log('status:', status);
                            // console.log('status currentTarget:', status.currentTarget);
                            // console.log('permission onchange:', permission);
                            // status.currentTarget.addEventListener('change', e => {
                            //     console.log('currentTarget e:', e);
                            // })
                            console.log('change');
                            try {
                                console.log('change try :', firebase);
                                console.log('change try2 :', firebase.getFirebase());
                                // const firebase = getFirebase()
                                const token = await firebase.messaging().getToken();
                                console.log('notificationPerm.onchange token:', token);
                                window.localStorage.setItem(ConfigSDK.TOKEN_FIREBASE, token);
                            } catch (error) {
                                console.error('notificationPerm.onchange :', error);
                            }
                            body.track.info.token = window.localStorage.getItem(ConfigSDK.TOKEN_FIREBASE);
                            body.track.info.permission = notificationPerm.state
                            console.log('body :', body);
                            this.trackService(body);
                        }
                    });
            }
        }).catch((err) => {
            console.error(err);
        });

    }

    /**
     * Not Using
     */
    requestPermission() {
        const deviceId = window.localStorage.getItem(ConfigSDK.DEVICE_ID);
        if (deviceId === null) return;

        const body = this.setDataHttp('register_notification_permission', {})
        body.track.info.token = window.localStorage.getItem(ConfigSDK.TOKEN_FIREBASE);
        Notification.requestPermission().then((permission) => {
            if ('permissions' in navigator) {
                navigator.permissions.query({ name: 'notifications' })
                    .then(notificationPerm => {
                        
                        console.log('notificationPerm :', notificationPerm);
                        notificationPerm.onchange = (status) => {
                            body.track.info.permission = notificationPerm.state
                            console.log('body :', body);
                            this.trackService(body);
                        }
                    });
            }
        }).catch((err) => {
            console.error(err);
        });
    }

    /**
     * Return data body API
     * @param type 
     * @param data 
     */
    setDataHttp(type: string, data: any) {
        const page = new GetDataPage();
        return {
            track: {
                profile_id: window.localStorage.getItem(ConfigSDK.PROFILE_ID),
                device_id: window.localStorage.getItem(ConfigSDK.DEVICE_ID),
                customer_id: data?.customer_id,
                draft_id: window.localStorage.getItem(ConfigSDK.DRAFT_DEVICE_ID),
                u_id: window.localStorage.getItem(ConfigSDK.U_ID),
                type: type,
                info: data,
            },
            meta_data: {
                source_type: 'browser',
                website: {
                    domain: page.getDomain()
                },
                app: {
                    id: null,
                    name: null,
                    device_type: null,
                    device_name: null
                }
            }
        }
    }

    /**
     * Send data track to server
     * @param body 
     */
    async trackService(body) {
        try {
            let http = new HttpRequestService();
            const result: IHttpResponse = await http.post(SERVICE_URL.TRACK, body);
            if (result.code !== 200) {
                return;
            }

            const data = result.data;
            // window.localStorage.setItem(ConfigSDK.CUSTOMER_ID, data.customer_id);
            window.localStorage.setItem(ConfigSDK.PROFILE_ID, data.profile_id);
            window.localStorage.setItem(ConfigSDK.DEVICE_ID, data.device_id);
            return;
        } catch (error) {
            console.log('track error :', error);
        }
    }

    /**
     * Send value permission notification when user visit website or user change permission notification on browser
     * @param permission 
     */
    sendPermissionToServer(permission: string) {
        const body = this.setDataHttp('register_notification_permission', {})
        body.track.info.permission = permission;
        body.track.info.token = window.localStorage.getItem(ConfigSDK.TOKEN_FIREBASE);
        this.trackService(body);
    }

    // showNotification() {
    //     var options = 
    //     {
    //         body: 'test',
    //         // icon: config.icon_notification, // 100*100px and less than 20kb in size.
    //         // image: productImage,
    //     }
    //     // requireInteration: If this is set as true, then the notification remains active until the user dismiss it or opens it.

    //     // silent: To show the notification silently without any sound effect.

    //     //vibrate: To make the device vibrate if it supports vibration.

    //     // Button : support chrome, not support FireFox, Safari

    //     console.log('options :', options);
    //     var notify = new Notification('Hi there!', options);
    //         notify.onclick = function(event) {
    //         event.preventDefault();
    //         // window.open(url, '_blank');
    //     }
    //     // previousXPos = xPos;
    //     // previousYPos = xPos;
    //     console.log('showNotification');
    //     // isClick = false;
    // }

}
// }