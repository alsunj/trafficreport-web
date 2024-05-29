import type { IJwtResponse } from "../dto/IJwtResponse";
import type { ILoginData } from "../dto/ILoginData";
import type { IRegisterData } from "../dto/IRegisterData";


export class IdentityService {

    private endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = 'https://alsunjtrafficreport.azurewebsites.net/api/v1/identity/Account/';
    }

    async register(data: IRegisterData): Promise<IJwtResponse | undefined> {
        try {
            const response = await fetch(this.endpoint + 'Register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.status === 200) {
                console.log(response.body)
                const responseData = await response.json();
                return {
                    token: responseData.jwt,
                    refreshToken: responseData.refreshToken,
                    id: responseData.id,
                };
            }

            if (!response.ok) {
                throw new Error('Failed to post violation data');
            }
        } catch (error) {
            throw new Error(`Error posting violation data: `);
        }
        return undefined;
    }

    async login(data: ILoginData): Promise<IJwtResponse | undefined> {
        try {
            const response = await fetch(this.endpoint + 'Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.status === 200) {
                console.log(response.body)
                const responseData = await response.json();
                return {
                    token: responseData.jwt,
                    refreshToken: responseData.refreshToken,
                    id: responseData.id,
                };
            }

            if (!response.ok) {
                throw new Error('Failed to post violation data');
            }
        } catch (error) {
            throw new Error(`Error posting violation data: `);
        }
        return undefined;
    }


    async logout(data: IJwtResponse): Promise<true | undefined> {
        try {
            const response = await fetch(this.endpoint + 'Logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.status === 200) {
                console.log(response.body)
            }

            if (!response.ok) {
                throw new Error('Failed to post violation data');
            }
        } catch (error) {
            throw new Error(`Error posting violation data: `);
        }
        return undefined;
    }

    async refreshToken(data: IJwtResponse): Promise<IJwtResponse | undefined> {
        try {
            const response = await fetch(this.endpoint + 'RefreshToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.status === 200) {
                console.log(response.body)
            }

            if (!response.ok) {
                throw new Error('Failed to post violation data');
            }
        } catch (error) {
            throw new Error(`Error posting violation data: `);
        }
        return undefined;
    }
}