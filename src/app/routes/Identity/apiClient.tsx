import Axios, { AxiosInstance } from 'axios';

let jwtToken: string | null = null;

export const setJwtToken = (token: string | null) => {
    jwtToken = token;
};

export const getAxiosInstance = (): AxiosInstance => {
    const headers: { [key: string]: string } = {
        'Content-Type': 'application/json'
    };
    if (jwtToken) {
        headers['Authorization'] = `Bearer ${jwtToken}`;
    }

    return Axios.create({
        baseURL: "https://alsunjtrafficreport.azurewebsites.net/api/v1/",
        headers
    });
};