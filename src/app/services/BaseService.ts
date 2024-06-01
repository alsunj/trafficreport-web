import { BaseServiceHost } from "@/BaseServiceHost";
import type { AxiosError } from "axios";
import type { IResultObject } from "../types/IResultObject";


export class BaseService<TEntity> extends BaseServiceHost {
    constructor(baseUrl: string) {
        super(baseUrl);
    }

    async getAll(): Promise<TEntity[]> {
        try {
            const response = await this.axios.get<TEntity[]>('', {
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
        let response = await this.axios.get<TEntity>(`/${id}`);
        return response.data as TEntity;
    }

    async add(entity: TEntity): Promise<IResultObject<TEntity>> {
        try {
            let response = await this.axios.post('', entity, {
            });
            return {
                data: response.data
            };
        } catch (error: any) {
            return {
                errors: [JSON.stringify(error)]
            };
        }
    }

        async update(entity: TEntity): Promise<IResultObject<TEntity>> {
            try {
                let response = await this.axios.put(``, entity, {
                });
                return {
                    data: response.data
                };
            } catch (error: any) {
                return {
                    errors: [JSON.stringify(error)]
                };
            }
        }
  /*        async delete(id: string): Promise<void> {
            try {
                await this.axios.delete(`/${id}`, {
                    headers: {
                        Authorization: 'Bearer '
                    }
                });
            } catch (e) {
                let response = (e as AxiosError).response!;
               if (response.status == 401 && this.identityStore.jwt) {
                    let accountService = new AccountService();
                    let refreshResponse = await accountService.refreshIdentity();
                    this.identityStore.jwt = refreshResponse.data?.jwt!;
    
                    if (!this.identityStore.$state.jwt) return;
    
                    await httpCLient.delete(`/${this.path}/${id}`, {
                        headers: {
                            "Authorization": "bearer " + this.identityStore.jwt
                        }
                    });
                }
            }
        }
        */
        async getAllEnums(): Promise<string[]> {
            console.log("getAllEnums");
            try {
                let response = await this.axios.get(`/`, {
                });
                console.log(response);
    
                return response.data as string[];
            } catch (e) {
                let response = (e as AxiosError).response!;
                
                }
                return [];
            }
        }


