import { UserResourceList } from "@/@types/users";
import ApiService from "./ApiService";
export const UserService = {
    async list(): Promise<UserResourceList> {
        const result = await ApiService.fetchData<Record<string, any>, any>({
            url: "/user/list",
            method: "post",
        });
        return result.data
    },
    async create(payload: any): Promise<any> {
        const result = await ApiService.fetchData<any, any>({
            url: "/user/add",
            method: "POST",
            data: payload
        });
        return result.data
    },
    async update(payload: any): Promise<any> {
        const result = await ApiService.fetchData<any, any>({
            url: "/user/edit",
            method: "POST",
            data: payload
        })
        return result.data
    },
    async delete(payload: any): Promise<any> {
        const result = await ApiService.fetchData<any, any>({
            url: "/user/delete",
            method: "POST",
            data: payload
        })
        return result.data
    }
}