// import { FuncGlobal } from './common/function';
// import { FuncGlobal } from "./common/function";
// import  HttpRequestService  from "./service/http-request";
// / <reference path="common/function.ts" />
var SDK = /** @class */ (function () {
    // httpRequest = new HttpRequestService();
    function SDK() {
        this.timeOnsite = 5;
        this.funcGlobal = new FuncGlobal();
    }
    SDK.prototype.start = function () {
        // console.log('test', document);
        var _a;
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
        var name = this.funcGlobal.getValueToHTML(ConfigDetailPage.PRODUCT_NAME);
        console.log('name :', name);
        var id = this.funcGlobal.getValueToHTML(ConfigDetailPage.PRODUCT_ID);
        console.log('id :', id);
        var originalPrice = this.funcGlobal.getValueToHTML(ConfigDetailPage.PRODUCT_ORIGINAL_PRICE);
        console.log('originalPrice :', originalPrice);
        var price = this.funcGlobal.getValueToHTML(ConfigDetailPage.PRODUCT_PRICE);
        console.log('price :', price);
        var img = this.funcGlobal.getValueToHTML(ConfigDetailPage.PRODUCT_IMG);
        console.log('img :', img);
        var brand = this.funcGlobal.getValueToHTML(ConfigDetailPage.PRODUCT_BRAND);
        console.log('brand :', brand);
        var pageInfo = {};
        pageInfo.url = document.URL;
        pageInfo.referrer = document.referrer;
        pageInfo.description = document.title;
        pageInfo.name = name;
        pageInfo.originalPrice = originalPrice;
        pageInfo.price = price;
        pageInfo.id = id;
        pageInfo.img = img;
        pageInfo.brand = brand;
        var list = document.querySelectorAll('.breadcrumb__item');
        var cats = [];
        for (var i = 0; i < list.length - 1; i++) {
            cats.push((_a = list[i].textContent) === null || _a === void 0 ? void 0 : _a.trim());
        }
        console.log('cats :', cats);
        pageInfo.cats = cats;
        // pageInfo.originalPrice = this.funcGlobal.getValueToHTML(ConfigDetailPage.PRODUCT_NAME);
        console.log(JSON.stringify(pageInfo));
    };
    SDK.prototype.getPageInfo = function () {
        var pageInfo = {};
        pageInfo.url = document.URL;
        pageInfo.referrer = document.referrer;
        pageInfo.description = document.title;
        pageInfo.name = this.funcGlobal.getValueToHTML(ConfigDetailPage.PRODUCT_NAME);
        // pageInfo.originalPrice = this.funcGlobal.getValueToHTML(ConfigDetailPage.PRODUCT_NAME);
        console.log(JSON.stringify(pageInfo));
    };
    SDK.prototype.listenGTM = function (track) {
        console.log('track :', track);
    };
    /**
     * Function connect mobio sdk
     */
    SDK.prototype.connectSDK = function () {
        // fun
    };
    // include(file : any, document: any) { 
    //     var script  = document.createElement('script'); 
    //     script.src  = 'a.js'; 
    //     script.type = 'text/javascript'; 
    //     script.defer = true; 
    //     document.getElementsByTagName('head').item(0).appendChild(script); 
    // }
    SDK.prototype.timeVisit = function () {
        var timeLeft = 10;
        var downloadTimer = setInterval(function () {
            if (timeLeft <= 0) {
                clearInterval(downloadTimer);
                // document.getElementById("countdown").innerHTML = "Finished";
                console.log('timeLeft :', timeLeft);
                timeLeft = 10;
                // this.timeVisit();
            }
            else {
                // document.getElementById("countdown").innerHTML = timeLeft + " seconds remaining";
                console.log('timeLeft count:', timeLeft);
            }
            timeLeft -= 1;
        }, 1000);
    };
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
    SDK.prototype.checkTabVisible = function () {
        var _this = this;
        var visProp = this.getHiddenProp();
        if (visProp) {
            var eventKey = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
            document.addEventListener(eventKey, function () {
                document.title = _this.isHidden(document) ? 'Not visible' : 'Visible';
            });
        }
    };
    ;
    SDK.prototype.getHiddenProp = function () {
        var prefixes = ['webkit', 'moz', 'ms', 'o'];
        // if 'hidden' is natively supported just return it
        if ('hidden' in document)
            return 'hidden';
        // otherwise loop over all the known prefixes until we find one
        for (var i = 0; i < prefixes.length; i++) {
            if ((prefixes[i] + 'Hidden') in document)
                return prefixes[i] + 'Hidden';
        }
        // otherwise it's not supported
        return null;
    };
    SDK.prototype.isHidden = function (document) {
        var prop = this.getHiddenProp();
        if (!prop)
            return false;
        return document[prop];
    };
    SDK.prototype.browserClose = function () {
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
        var hasUserLeft = false;
        var doSomethingWhenUserStays = function doSomethingWhenUserStays() {
            // Perform the following only if user hasn't left the page
            console.log('hasUserLeft :', hasUserLeft);
            if (!hasUserLeft) {
                alert('user stayed!!!');
            }
        };
        window.addEventListener('beforeunload', function (e) {
            // It won't perform doSomethingWhenUserStays in 500ms right after this is called,
            // but instead, it will perform it in 500ms after you click "Stay" or "Leave".
            // Therefore, there should be some time for `unload` handler to fire and
            // set `hasUserLeft` flag before `doSomethingWhenUserStays` is called.
            console.log('beforeunload :', e);
            setTimeout(doSomethingWhenUserStays, 500);
            // Dialog text doesn't really work in Chrome.
            var dialogText = 'A dialog text when leaving the page';
            e.returnValue = dialogText;
            return dialogText;
        });
        window.addEventListener('unload', function onUnload(e) {
            console.log('unload :', e);
            hasUserLeft = true;
        });
    };
    return SDK;
}());
// var app = new SDK();
// app.start();
var FuncGlobal = /** @class */ (function () {
    function FuncGlobal() {
    }
    FuncGlobal.prototype.selector = function (selector) {
        if (!selector) {
            return;
        }
        var self = {
            selector: selector,
            element: document.querySelector(selector),
            html: function () {
                return self.element;
            },
            getAttribute: function (name) {
                var _a;
                return (_a = self.element) === null || _a === void 0 ? void 0 : _a.getAttribute(name);
            },
            textContent: function () {
                var _a;
                return (_a = self.html()) === null || _a === void 0 ? void 0 : _a.textContent;
            }
        };
        return self;
    };
    FuncGlobal.prototype.addClassToElement = function (selector, classAdd) {
        if (!selector) {
            return;
        }
        var ele = document.querySelector(selector) || null;
        if (ele) {
            ele.className += " " + classAdd;
            return;
        }
    };
    FuncGlobal.prototype.getValueToHTML = function (config) {
        var _a, _b;
        if (config.TYPE === HTML.INNER_TEXT) {
            return (_a = this.selector(config.SELECTOR)) === null || _a === void 0 ? void 0 : _a.textContent();
        }
        if (config.TYPE === HTML.ATTRIBUTE) {
            return (_b = this.selector(config.SELECTOR)) === null || _b === void 0 ? void 0 : _b.getAttribute(config.ATTRIBUTE_NAME);
        }
    };
    FuncGlobal.prototype.getValueToHTMLByClass = function (className) {
        var data = document.getElementsByClassName(className);
        console.log('data ::', data);
        var value = '';
        if (!data || data.length === 0) {
            return value;
        }
        return value = data[0].innerText;
    };
    /**
     * Include .js file into html
     * @param file
     * @param document
     */
    FuncGlobal.prototype.includeJsFile = function (file, document) {
        var script = document.createElement('script');
        script.src = file + ".js";
        script.type = 'text/javascript';
        script.defer = true;
        document.getElementsByTagName('head').item(0).appendChild(script);
    };
    FuncGlobal.prototype.checkNotificationPermission = function () {
        var _this = this;
        if (!window.Notification) {
            console.log('Browser does not support notifications.');
        }
        else {
            if (Notification.permission === 'granted') {
                this.showNotification();
            }
            else {
                Notification.requestPermission().then(function (p) {
                    if (p === 'granted') {
                        _this.showNotification();
                    }
                    else {
                        console.log('User blocked notifications.');
                    }
                })["catch"](function (err) {
                    console.error(err);
                });
            }
        }
    };
    FuncGlobal.prototype.showNotification = function () {
        var options = {
            body: 'test'
        };
        // requireInteration: If this is set as true, then the notification remains active until the user dismiss it or opens it.
        // silent: To show the notification silently without any sound effect.
        //vibrate: To make the device vibrate if it supports vibration.
        // Button : support chrome, not support FireFox, Safari
        console.log('options :', options);
        var notify = new Notification('Hi there!', options);
        notify.onclick = function (event) {
            event.preventDefault();
            // window.open(url, '_blank');
        };
        // previousXPos = xPos;
        // previousYPos = xPos;
        console.log('showNotification');
        // isClick = false;
    };
    return FuncGlobal;
}());
// import io from 'socket.io-client';
// export class Socket {
//     socket: any;
//     constructor() {
//     }
//     configSocket() {
//         this.socket = io();
//     }
// }
var ConfigSDK = /** @class */ (function () {
    function ConfigSDK() {
    }
    ConfigSDK.PRODUCT_NAME_CLASS = '10';
    ConfigSDK.PRODUCT_PRICE_CLASS = 5;
    return ConfigSDK;
}());
var HTML = /** @class */ (function () {
    function HTML() {
    }
    HTML.INNER_TEXT = 'innerText';
    HTML.ATTRIBUTE = 'attribute';
    return HTML;
}());
var ConfigDetailPage = /** @class */ (function () {
    function ConfigDetailPage() {
    }
    ;
    ConfigDetailPage.PRODUCT_NAME = {
        SELECTOR: '#main_container > div.main-column > div.product > div.frame_center > div > div.product_name > h1',
        TYPE: HTML.INNER_TEXT
    };
    ConfigDetailPage.PRODUCT_ID = {
        SELECTOR: '#record_id',
        TYPE: HTML.ATTRIBUTE,
        ATTRIBUTE_NAME: 'value'
    };
    ConfigDetailPage.PRODUCT_ORIGINAL_PRICE = {
        SELECTOR: '#basic_price',
        TYPE: HTML.ATTRIBUTE,
        ATTRIBUTE_NAME: 'value'
    };
    ConfigDetailPage.PRODUCT_PRICE = {
        SELECTOR: '#main_container > div.main-column > div.product > div.frame_center > div > div.wrapper-info-pro.cf > div.right-info.fl > div.bor-retails.mt20 > form > div:nth-child(3) > meta:nth-child(3)',
        TYPE: HTML.ATTRIBUTE,
        ATTRIBUTE_NAME: 'content'
    };
    ConfigDetailPage.PRODUCT_IMG = {
        SELECTOR: '#Zoomer > figure > img',
        TYPE: HTML.ATTRIBUTE,
        ATTRIBUTE_NAME: 'src'
    };
    ConfigDetailPage.PRODUCT_BRAND = {
        SELECTOR: '#main_container > div.main-column > div.product > div.frame_center > div > div.code-manu.mt10.cf > div.stock > span > meta',
        TYPE: HTML.ATTRIBUTE,
        ATTRIBUTE_NAME: 'content'
    };
    ConfigDetailPage.PRODUCT_NAME_CLASS = 'mo-pro-name';
    ConfigDetailPage.PRODUCT_ORIGINAL_PRICE_CLASS = 'mo-pro-original-price';
    ConfigDetailPage.PRODUCT_PRICE_CLASS = 'mo-pro-price';
    ConfigDetailPage.PRODUCT_IMG_CLASS = 'mo-pro-img';
    return ConfigDetailPage;
}());
// import { axios } from '../../node_modules/axios';
// import axios from 'axios';
var HttpRequestService = /** @class */ (function () {
    function HttpRequestService() {
    }
    HttpRequestService.prototype.get = function (url, config) {
        // return axios.get(url, config);
        // axios.get('https://api.github.com/user', {
        //     // headers: {
        //     //     'Authorization': `token ${access_token}`
        //     // }
        // })
        //     .then((res) => {
        //         console.log(res.data)
        //     })
        //     .catch((error) => {
        //         console.error(error)
        //     })
    };
    return HttpRequestService;
}());
// export = HttpRequestService;
