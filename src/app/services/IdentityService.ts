import type { IJwtResponse } from "../dto/IJwtResponse";
import type { ILoginData } from "../dto/ILoginData";
import type { IRegisterData } from "../dto/IRegisterData";
import { BaseService } from "./BaseService";
import Axios, { AxiosInstance } from 'axios';

export class IdentityService  {
 /*   constructor() {
        super('v1/identity/account/');
    }


    async register(data: IRegisterData): Promise<IJwtResponse | undefined> {
        try {
            const response = await this.axios.post<IJwtResponse>('register', data);

            console.log('register response', response);
            if (response.status === 200) {
                return response.data;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

    async login(data: ILoginData): Promise<IJwtResponse | undefined> {
        try {
            const response = await this.axios.post<IJwtResponse>('login', data);

            console.log('login response', response);
            if (response.status === 200) {
                return response.data;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

    async logout(data: IJwtResponse): Promise<true | undefined> {
        console.log(data);

        try {
            const response = await this.axios.post(
                'logout', 
                data,
                {
                    headers: {
                        'Authorization': 'Bearer ' + data.token
                    }
                }
            );

            console.log('logout response', response);
            if (response.status === 200) {
                return true;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

    async refreshToken(data: IJwtResponse): Promise<IJwtResponse | undefined> {
        console.log(data);
        
        try {
            const response = await this.axios.post<IJwtResponse>(
                'refreshtoken', 
                data
            );

            console.log('refresh token response', response);
            if (response.status === 200) {
                return response.data;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }
*/
}