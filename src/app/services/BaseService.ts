import { BaseServiceHost } from "@/BaseServiceHost";
import type { AxiosError } from "axios";
import type { IResultObject } from "../types/IResultObject";
import api from "@/app/routes/Identity/apiClient";

export class BaseService<TEntity> extends BaseServiceHost {
    constructor(baseUrl: string) {
        super(baseUrl);
    }

    async getAll(token?: string): Promise<TEntity[]> {
        try {
            const headers: { [key: string]: string } = {};
            if (token !== undefined) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await this.axios.get<TEntity[]>('', {
                headers
            });

            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return [];
        }
    }

    async get(id: string): Promise<TEntity> {
        try {
            const response = await this.axios.get<TEntity>(`/${id}`);
            return response.data as TEntity;
        } catch (error) {
            console.log('error: ', (error as Error).message);
            throw error;
        }
    }

    async add(entity: TEntity): Promise<IResultObject<TEntity>> {
        try {
            const response = await this.axios.post('', entity);
            return {
                data: response.data
            };
        } catch (error: any) {
            if (error.response && error.response.status === 409) {
                return {
                    errors: ['409']
                };
            }

            return {
                errors: [JSON.stringify(error)]
            };
        }
    }

    async update(entity: TEntity): Promise<IResultObject<TEntity>> {
        try {
            const response = await this.axios.put('', entity);
            return {
                data: response.data
            };
        } catch (error: any) {
            return {
                errors: [JSON.stringify(error)]
            };
        }
    }

    async getAllEnums(): Promise<string[]> {
        try {
            const response = await this.axios.get<string[]>('/');
            return response.data;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return [];
        }
    }
}
