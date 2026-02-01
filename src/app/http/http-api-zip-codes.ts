import type {HttpAxios} from "../../common/http/http-axios.ts";
import urlJoin from "url-join";
import {headerApplicationJson} from "../../common/http/headers/header-application-json.ts";

export class HttpApiZipCodes implements HttpAxios {
    constructor() {
        const apiZipCodes = import.meta.env.VITE_BASE_URL_API_ZIP_CODE;
        super({
            baseUrl: urlJoin(apiZipCodes, 'us'),
            headers: {
                ...headerApplicationJson
            }
        })
    }
}

export const httpApiZipCodes = new HttpApiZipCodes();