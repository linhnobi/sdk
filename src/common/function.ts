import { HTML } from "../config/detail.page";

// module SomeModule {
export class FuncGlobal {
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
            getAttribute: (name: string)=> {
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
    includeJsFile(file : any, document: any) { 
        var script  = document.createElement('script'); 
        script.src  = `${file}.js`; 
        script.type = 'text/javascript'; 
        script.defer = true; 
        document.getElementsByTagName('head').item(0).appendChild(script); 
    }

    checkNotificationPermission() {
        if (!window.Notification) {
                console.log('Browser does not support notifications.');
        } else {
            if (Notification.permission === 'granted') {
                this.showNotification();
            } else {
                Notification.requestPermission().then((p) => {
                    if (p === 'granted') {
                        this.showNotification();
                    } else {
                        console.log('User blocked notifications.');
                    }
                }).catch((err) => {
                    console.error(err);
                });
            }
        }
    }

    showNotification() {
        var options = 
        {
            body: 'test',
            // icon: config.icon_notification, // 100*100px and less than 20kb in size.
            // image: productImage,
        }
        // requireInteration: If this is set as true, then the notification remains active until the user dismiss it or opens it.
    
        // silent: To show the notification silently without any sound effect.
    
        //vibrate: To make the device vibrate if it supports vibration.
        
        // Button : support chrome, not support FireFox, Safari
        
        console.log('options :', options);
        var notify = new Notification('Hi there!', options);
            notify.onclick = function(event) {
            event.preventDefault();
            // window.open(url, '_blank');
        }
        // previousXPos = xPos;
        // previousYPos = xPos;
        console.log('showNotification');
        // isClick = false;
    }

}
// }