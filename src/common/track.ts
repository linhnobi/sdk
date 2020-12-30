import { ConfigSDK } from "../config/config";
import { SERVICE_URL } from "../config/service";
import { HttpRequestService } from "../service/http-request";
import { GetDataPage } from "./util/data-page";

export class Track {

    constructor(private httpRequest: HttpRequestService) {

    }

    async inti(type: string, data: any) {
        console.log('inti track');
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
            console.log('11111');
            const result = await this.httpRequest.post(SERVICE_URL.TRACK, body);
            console.log('result :', result);
        } catch (error) {
            console.log('track error :', error);            
        }
    }
}