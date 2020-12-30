// import { SDK } from '.';

// import SDK from ".";
// var SDK2 = new SDK();

import { FireBase } from "./common/firebase";
import { FuncGlobal } from "./common/function";
import { F5 } from "./common/util/f5";
import { SDK } from "./index";

// import SDK = require('./index');
// var dude = new SDK();
// // var SDK = new SDK();
// // dude.start(document);
// // console.log('dude :', dude);

// import SDK = require('.');
// var dude = new SDK();
// console.log("dude:", dude);


let g = new SDK();
g.start();
(window as any).SDK = g

const funcGlobal = new FuncGlobal();
const f5 = new F5();
const firebase = new FireBase();
f5.addJS();
        // funcGlobal.createDraftDevice();
        // const isSafari = funcGlobal.detectSafariBrowser();
        // if (isSafari) {
        //     return;
        // }

        
        // const configFireBase = await this.getConfigFireBase();
        firebase.init();

