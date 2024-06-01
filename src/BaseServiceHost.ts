import { AxiosInstance } from 'axios';
import {getAxiosInstance} from "@/app/routes/Identity/apiClient";


export abstract class BaseServiceHost {
    protected axios: AxiosInstance;

    constructor(baseUrl: string) {
        this.axios = getAxiosInstance();
        this.axios.defaults.baseURL += baseUrl;
    }
}