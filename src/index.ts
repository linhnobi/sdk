import { Track } from './common/track';
// import { IPageInfo } from './api/page-info';
import { IHttpResponse } from "./api/http";
import { FireBase } from "./common/firebase";
import { FuncGlobal } from "./common/function";
import { F5 } from "./common/util/f5";
import { ConfigDetailPage } from "./config/detail.page";
import { SERVICE_URL } from "./config/service";
import { HttpRequestService } from "./service/http-request";

export class SDK {
    // timeOnsite = 5;
    private funcGlobal = new FuncGlobal();
    public httpRequest; // = new HttpRequestService();
    public firebase = new FireBase();
    private f5 = new F5();
    public track;
    constructor() {
        this.httpRequest = new HttpRequestService();
        // this.track = new Track(this.httpRequest);
        console.log('constructor');
    }

    async inti() {
        this.f5.addJS();
        const configFireBase = await this.getConfigFireBase();
        this.firebase.init(configFireBase);
    }

    async start(document?: any) {
        console.log('start');
        this.f5.addJS();
        this.funcGlobal.createDraftDevice();
        const isSafari = this.funcGlobal.detectSafariBrowser();
        if (isSafari) {
            return;
        }
        
        
        const configFireBase = await this.getConfigFireBase();
        this.firebase.init(configFireBase);
        // this.funcGlobal.checkNotificationPermission(this.firebase);
        // console.log('configFireBase', configFireBase);
        // console.log('111111111111');
        
        // const data = this.funcGlobal.getValueToHTMLByClass('css-15dagt2');
        // console.log('data', data);
        // console.log('readyState', document.readyState);
        // this.checkTabVisible();
        // this.browserClose();
        // this.checkTabVisible(document);
        // console.log('checkTabVisible :', this.isHidden());
        // this.timeVisit();
        // this.checkNotificationPermission();
        // if (document.readyState) {
        //     this.getPageInfo();
        // }
        // const name = this.funcGlobal.getValueToHTML(ConfigDetailPage.PRODUCT_NAME);
        // console.log('name :', name);

        // const id = this.funcGlobal.getValueToHTML(ConfigDetailPage.PRODUCT_ID);
        // console.log('id :', id);

        // const originalPrice = this.funcGlobal.getValueToHTML(ConfigDetailPage.PRODUCT_ORIGINAL_PRICE);
        // console.log('originalPrice :', originalPrice);

        // const price = this.funcGlobal.getValueToHTML(ConfigDetailPage.PRODUCT_PRICE);
        // console.log('price :', price);

        // const img = this.funcGlobal.getValueToHTML(ConfigDetailPage.PRODUCT_IMG);
        // console.log('img :', img);

        // const brand = this.funcGlobal.getValueToHTML(ConfigDetailPage.PRODUCT_BRAND);
        // console.log('brand :', brand);

        // let pageInfo:  any;
        // pageInfo.url = document.URL;
        // pageInfo.referrer = document.referrer;
        // pageInfo.description = document.title;
        // pageInfo.name = name;
        // pageInfo.originalPrice = originalPrice;
        // pageInfo.price = price;
        // pageInfo.id = id;
        // pageInfo.img = img;
        // pageInfo.brand = brand;
        // const list = document.querySelectorAll('.breadcrumb__item');
        // let cats = []
        // for (var i = 0; i < list.length - 1; i++) {   
        //     cats.push(list[i].textContent?.trim());
        // }
        // console.log('cats :', cats);
        // pageInfo.cats = cats;
        // console.log(JSON.stringify(pageInfo));
        // const url = 'https://api-test1.mobio.vn/digienty/web/api/v1.0/track.json';
        // const data = {
        //     "track": {
        //         "profile_id": null,
        //         "device_id": null,
        //         "customer_id": null,
        //         "type": "checkin",
        //         "info": {
        //             "url": url
        //         },
        //     },
        //     "meta_data": {
        //         "source_type": "browser",
        //         "website": {
        //             "domain": null
        //         },
        //         "app": {
        //             "id": null,
        //             "name": null,
        //             "device_type": null,
        //             "device_name": null
        //         }
        //     }
        // }
        // const result = this.httpRequest.post(url, data);
        // console.log('result :', result);
    }

    async getConfigFireBase() {
        const data = {
                "meta_data": {
                    "source_type": "browser",
                    "website": {
                        "domain": "test25.mobio.vn"
                    },
                    "app": {
                        "id": null,
                        "name": null,
                        "device_type": null,
                        "device_name": null
                    }
                }
        }
        try {
            const result: IHttpResponse = await this.httpRequest.post(SERVICE_URL.CONFIG_FIREBASE, data);
            console.log('result :', result);
            if (result.code !== 200) {
                return;
            }

            const { detail } = result.data.pn;
            return detail;

        } catch(err) {
            console.log('err :', err);
            return;
        } 
    }

    getPageInfo() {
        // let pageInfo: any = {};
        // pageInfo.url = document.URL;
        // pageInfo.referrer = document.referrer;
        // pageInfo.description = document.title;
        // pageInfo.name = this.funcGlobal.getValueToHTML(ConfigDetailPage.PRODUCT_NAME);
        // // pageInfo.originalPrice = this.funcGlobal.getValueToHTML(ConfigDetailPage.PRODUCT_NAME);
        // console.log(JSON.stringify(pageInfo));
    }

    async listenGTM(track: string, dataTrack: any) {
        console.log('track :', track);
        // if (track !== 'view') {
        //     return;
        // }
        try {
            const data = {
                url: window.document.URL,
                direction: dataTrack?.direction,
                value: dataTrack?.value?.toString(),
                unit: dataTrack?.unit,
                // page_id: dataTrack?.page_id
            };
            let httpRequest = new HttpRequestService();
            let trackClass = new Track(httpRequest);
            await trackClass.inti(track, data);
        } catch (error) {
            console.log('track error',error);
        }
    }

    /**
     * Function connect mobio sdk
     */

    connectSDK() {
        // fun
    }

    // include(file : any, document: any) { 
    //     var script  = document.createElement('script'); 
    //     script.src  = 'a.js'; 
    //     script.type = 'text/javascript'; 
    //     script.defer = true; 
    //     document.getElementsByTagName('head').item(0).appendChild(script); 
    // }

    timeVisit() {
        let timeLeft = 10;
        var downloadTimer = setInterval(() =>  {
            if (timeLeft <= 0) {
                clearInterval(downloadTimer);
                // document.getElementById("countdown").innerHTML = "Finished";
                console.log('timeLeft :', timeLeft);
                timeLeft = 10;
                // this.timeVisit();
            } else {
                // document.getElementById("countdown").innerHTML = timeLeft + " seconds remaining";
                console.log('timeLeft count:', timeLeft);
            }
            timeLeft -= 1;
        }, 1000);
    }

    // checkNotificationPermission() {
    //     if (!window.Notification) {
    //             console.log('Browser does not support notifications.');
    //     } else {
    //         if (Notification.permission === 'granted') {
    //             this.showNotification();
    //         } else {
    //             Notification.requestPermission().then((p) => {
    //                 if (p === 'granted') {
    //                     this.showNotification();
    //                 } else {
    //                     console.log('User blocked notifications.');
    //                 }
    //             }).catch((err) => {
    //                 console.error(err);
    //             });
    //         }
    //     }
    // }

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


    checkTabVisible() {
        const visProp = this.getHiddenProp();
        if (visProp) {
            const eventKey = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
            document.addEventListener(eventKey, () => {
                document.title = this.isHidden(document) ? 'Not visible' : 'Visible';
            });
        }
    };
    

    getHiddenProp(){
        const prefixes = ['webkit','moz','ms','o'];
        
        // if 'hidden' is natively supported just return it
        if ('hidden' in document) return 'hidden';
        
        // otherwise loop over all the known prefixes until we find one
        for (let i = 0; i < prefixes.length; i++){
            if ((prefixes[i] + 'Hidden') in document) 
                return prefixes[i] + 'Hidden';
        }
    
        // otherwise it's not supported
        return null;
    }

    isHidden(document: any) {
        const prop = this.getHiddenProp();
        if (!prop) return false;
        return document[prop];
    }

    browserClose() {
        // window.addEventListener('beforeunload', (e) => { 
        //     console.log('eeee :', e);
        //     e.preventDefault(); 
        //     e.returnValue = '111111111111111111111111111111'; 
        //     // // this.result = '1111111111';
        //     // // this.alertMess();
        //     // return e.returnValue;
        //     // if (data_needs_saving()) {
        //     //     return "Do you really want to leave our brilliant application?";
        //     // } else {
        //     //    return;
        //     // }
        //     window.addEventListener('confirm', e => {
        //         console.log('eeee 2 :', e);
        //     });
        // }); 
        let hasUserLeft = false;

        const doSomethingWhenUserStays = function doSomethingWhenUserStays() {
        // Perform the following only if user hasn't left the page
        console.log('hasUserLeft :', hasUserLeft);
        if (!hasUserLeft) {
            alert('user stayed!!!');
        }
        }


        window.addEventListener('beforeunload', (e) => {
        // It won't perform doSomethingWhenUserStays in 500ms right after this is called,
        // but instead, it will perform it in 500ms after you click "Stay" or "Leave".
        // Therefore, there should be some time for `unload` handler to fire and
        // set `hasUserLeft` flag before `doSomethingWhenUserStays` is called.
        console.log('beforeunload :', e);
        setTimeout(doSomethingWhenUserStays, 500);
        
        // Dialog text doesn't really work in Chrome.
        const dialogText = 'A dialog text when leaving the page';
        e.returnValue = dialogText;
        return dialogText;
        });


        window.addEventListener('unload', function onUnload(e) {
            console.log('unload :', e);
            hasUserLeft = true;
        });
    }


    
}

let g = new SDK();
// g.inti();
g.start();
(window as any).SDK = g;

// async function listenGTM(track: string) {
//     console.log('track :', track);
//     // if (track !== 'view') {
//     //     return;
//     // }
//     const data = {
//         url: window.document.URL
//     };
//     await this.track.inti(track, data);
// }

 (window as any).listenGTM = g.listenGTM;
