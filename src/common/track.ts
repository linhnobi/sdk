import { IHttpResponse } from "../api/http";
import { ConfigSDK } from "../config/config";
import { SERVICE_URL } from "../config/service";
import { HttpRequestService } from "../service/http-request";
import { GetDataPage } from "./util/data-page";

export class Track {

    constructor(private httpRequest: HttpRequestService) {

    }

    async inti(type: string, data: any) {
        console.log('inti track');
        // console.log('httpRequest2 :', httpRequest2);
        const page = new GetDataPage();

        const body = {
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

        try {
            console.log('11111 ? :', this.httpRequest);
            const result: IHttpResponse = await this.httpRequest.post(SERVICE_URL.TRACK, body);
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
}