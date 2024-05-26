import type { TEntity } from "../types/TEntity";
export class BaseService<TEntity>{
    private endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    async getById(id: string): Promise<TEntity> {
        const url = `${this.endpoint}/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch vehicle violation');
        }
        return await response.json();
    }

    async getAll(): Promise<TEntity[]> {
        const response = await fetch(this.endpoint);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }

    async post(data: TEntity): Promise<void> {
        try {
            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to post violation data');
            }
        } catch (error) {
            throw new Error(`Error posting violation data: `);
        }
    }
}
