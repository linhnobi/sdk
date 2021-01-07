import { ConfigSDK } from "../../config/config";

export class F5 {

    constructor() {}

    /**
     * Add js file by F5
     * Return _imp_di_ls_
     */
    addJS() {
        const id = window.localStorage.getItem(ConfigSDK.F5_DI_A);
        if (id) return;
        var script  = document.createElement('script'); 
        script.src  = ConfigSDK.F5_URL; 
        script.type = 'text/javascript'; 
        script.defer = true;
        script.async = true;
        script.setAttribute('id', ConfigSDK.F5_ID);
        script.setAttribute('_imp_apg_cid_', ConfigSDK.F5_CID);
        script.setAttribute('_imp_apg_api_domain_', ConfigSDK.F5_DOMAIN);
        document.getElementsByTagName('head').item(0).appendChild(script);
    }

    /**
     * Return _imp_di_ls_;
     */
    getF5ID() {
        return window.localStorage.getItem('_imp_di_ls_');
    }

}