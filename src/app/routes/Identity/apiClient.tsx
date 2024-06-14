import axios, { AxiosInstance } from 'axios';
import {IdentityService} from "@/app/services/IdentityService";

let jwtToken: string | null = null;

export const setJwtToken = (token: string | null) => {
    jwtToken = token;
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
};

export const getAxiosInstance = (): AxiosInstance => {
    const axiosInstance = axios.create({
        baseURL: 'https://alsunjtrafficreport.azurewebsites.net/api/v1/',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            const token = jwtToken || localStorage.getItem('token');
            if (token) {
                config.headers!.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {

                originalRequest._retry = true;
                let refreshToken = localStorage.getItem('refreshToken');
                try {
                    if (!refreshToken) {
                        throw new Error('No refresh token available');
                    }

                    const response = await IdentityService.refreshToken({id: 'abc', token: jwtToken!, refreshToken: refreshToken! });

                    setJwtToken(response?.token!);
                    localStorage.setItem('token', response?.token!);
                    localStorage.setItem('refreshToken', response?.refreshToken!);

                    originalRequest.headers.Authorization = `Bearer ${response?.token!}`;

                    return axios(originalRequest);
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                }
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default getAxiosInstance();
