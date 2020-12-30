// import { axios } from '../../node_modules/axios';
import axios from 'axios';

export class HttpRequestService {

    constructor() {
        
    }

    get(url: string, config: any) {
        return axios.get(url, config);
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
    }

    post<T>(url: string, data: any): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            axios
                .post(url, data, {})
                .then(response => {
                    resolve(response.data as T)
                })
                .catch (response => {
                    reject(response)
                })
        });
        
    }
}

// export = HttpRequestService;
