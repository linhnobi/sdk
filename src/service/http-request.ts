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

    post(url: string, data: any) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdmF0YXIiOiJodHRwczovL21ib2RldnN0b3JhZ2UuYmxvYi5jb3JlLndpbmRvd3MubmV0L2ltYWdlcy9hdmF0YXJfN2ZjMGEzM2MtYmFmNS0xMWU3LWE3YzItMDI0MmFjMTgwMDAzPzIwMTkwNzA2MTEwMDQ5IiwibWVyY2hhbnRfaWQiOiIxYjk5YmRjZi1kNTgyLTRmNDktOTcxNS0xYjYxZGZmZjM5MjQiLCJtZXJjaGFudF9uYW1lIjoiUGluZ2NvbVNob3AiLCJpc19tb2JpbyI6MiwicGhvbmVfbnVtYmVyIjoiKzg0OTY1NjY2NjY2IiwibWVyY2hhbnRfY29kZSI6IlBJTkdDT01TSE9QIiwiaXNfYWRtaW4iOjEsImlkIjoiN2ZjMGEzM2MtYmFmNS0xMWU3LWE3YzItMDI0MmFjMTgwMDAzIiwidXNlcm5hbWUiOiJhZG1pbkBwaW5nY29tc2hvcCIsIm1lcmNoYW50X3R5cGUiOjEsImlzX3N1Yl9icmFuZCI6ZmFsc2UsImNhbGxjZW50ZXIiOnsicGJ4X251bWJlciI6IjAyNDczMDI2MDA2IiwiaXBfYWRkcmVzcyI6Im1vYmlsZWNybS5jbWN0ZWxlY29tLnZuIiwiYXV0aF91c2VybmFtZSI6bnVsbCwicGFzc3dvcmQiOm51bGwsImV4dGVuc2lvbiI6IjEwMyIsImV4dGVuc2lvbl9pZCI6ImFjY2QzMGE3OTBkNDQ5YTZhZmJiMWY4YzBjYzNmNTk3IiwicG9ydCI6NzQ0M30sInhwb2ludF9zdGF0dXMiOjMsImlhdCI6MTU2MjU1NDQ2MS4xNzIwMjMsImVtYWlsIjoibmdvYW52dEBtb2Jpby52biIsIm1lcmNoYW50X2F2YXRhciI6Imh0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9tb2Jpby10ZXN0L2ltYWdlcy9uaGFjdW5nY2FwLzFiOTliZGNmLWQ1ODItNGY0OS05NzE1LTFiNjFkZmZmMzkyND8yMDE5MDUyNDA2MzI0MCIsImZ1bGxuYW1lIjoibmdvYW52dCIsInVzZV9jYWxsY2VudGVyIjozfQ.OG3_vs3f_RnwDXz5WxXWKzhQX3PtmGUVXJihUxRWQ-g'
          }
        return axios.post(url, data, {
            headers: headers
        });
    }
}

// export = HttpRequestService;
