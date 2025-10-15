import { HighlightSelectList, PowerBySelectList, SpeakerSelectList } from "@/@types/select"
import ApiService from "./ApiService"

export const SelectService = {
    async highlight(): Promise<HighlightSelectList> {
        const result = await ApiService.fetchData<Record<string, any>, any>({
            url: "/highlight/list",
            method: "GET"
        });
        return result.data
    },
    async speaker(): Promise<SpeakerSelectList> {
        const result = await ApiService.fetchData<Record<string, any>, any>({
            url: "/speaker/list",
            method: "GET"
        });
        return result.data;
    },
    async powerBy(): Promise<PowerBySelectList> {
        const result = await ApiService.fetchData<Record<string, any>, any>({
            url: "/power_by/list",
            method: "GET",
        })
        return result.data;
    }
}