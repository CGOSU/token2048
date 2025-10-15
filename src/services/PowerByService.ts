import { PowerByResourceList } from "@/@types/powerBy";
import ApiService from "./ApiService";

export const PowerByService = {
    async list(): Promise<PowerByResourceList> {
        const result = await ApiService.fetchData<Record<string, any>, any>(
            {
                url: "/power_by/list",
                method: "GET"
            }
        );
        return result.data
    },
    async create(payload: any): Promise<any> {
        const result = await ApiService.fetchData<any, any>({
            url: "/power_by/add",
            method: "POST",
            data: payload
        });
        return result.data
    },
    async update(payload: any): Promise<any> {
        const result = await ApiService.fetchData<any, any>({
            url: "/power_by/edit",
            method: "POST",
            data: payload
        })
        return result.data
    },
    async delete(payload: any): Promise<any> {
        const result = await ApiService.fetchData<any, any>({
            url: "/power_by/delete",
            method: "POST",
            data: payload
        })
        return result.data
    }
}