import { HighlightResourceList } from "@/@types/highlight";
import ApiService from "./ApiService";

export const HighlightService = {
    async list(): Promise<HighlightResourceList> {
        const result = await ApiService.fetchData<Record<string, any>, any>(
            {
                url: "/highlight/list",
                method: "GET"
            }
        );
        return result.data
    },
    async create(payload: any): Promise<any> {
        const result = await ApiService.fetchData<any, any>({
            url: "/highlight/add",
            method: "POST",
            data: payload
        });
        return result.data
    },
    async update(payload: any): Promise<any> {
        const result = await ApiService.fetchData<any, any>({
            url: "/highlight/edit",
            method: "POST",
            data: payload
        })
        return result.data
    },
    async delete(payload: any): Promise<any> {
        const result = await ApiService.fetchData<any, any>({
            url: "/highlight/delete",
            method: "POST",
            data: payload
        })
        return result.data
    }
}