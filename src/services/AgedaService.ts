import ApiService from "./ApiService"
import { AgendaResourceList } from "@/@types/agenda";
export const AgendaService = {
    async list(): Promise<AgendaResourceList> {
        const result = await ApiService.fetchData<Record<string, any>, any>({
            url: "/agenda/list"
        });
        return result.data;
    }
}