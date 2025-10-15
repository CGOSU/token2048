import { SpeakerResourceList, SpeakerResource } from "@/@types/speaker"
import ApiService from "@/services/ApiService";
export const SpeakerService = {
    async list(page: number, page_size: number): Promise<SpeakerResourceList> {
        const url = '/speaker'
        const axiosRes = await ApiService.fetchData<Record<string, any>, any>({
            url: url,
            method: 'GET',
            params: {
                page,
                page_size,
            },
        })
        const resData = axiosRes.data

        // Normalize common backend response shapes
        if (!resData) return { list: [], total: 0 }
        // if API returns { data: { list, total } }
        if (resData.data && Array.isArray(resData.data.list)) {
            return { list: resData.data.list as SpeakerResource[], total: resData.data.total ?? 0 }
        }
        // if API returns { list, total }
        if (Array.isArray(resData.list)) {
            return { list: resData.list as SpeakerResource[], total: resData.total ?? 0 }
        }

        // fallback
        return { list: [], total: 0 }
    },
    async create(payload: any): Promise<any> {
        const axiosRes = await ApiService.fetchData<any, any>({
            url: '/speaker/add',
            method: 'POST',
            data: payload,
        })
        return axiosRes.data
    },
    async update(id: number, payload: any): Promise<any> {
        const axiosRes = await ApiService.fetchData<any, any>({
            url: `/speaker/edit?id=${id}`,
            method: 'POST',
            data: payload,
        })
        return axiosRes.data
    },
    async view(id: number): Promise<SpeakerResource> {
        const axiosRes = await ApiService.fetchData<any, any>({
            url: `/speaker/${id}`,
            method: 'GET'
        })
        return axiosRes.data.data
    },
    async delete(id: number): Promise<any> {
        const axiosRes = await ApiService.fetchData<any, any>({
            url: `/speaker/delete`,
            data: { id },
            method: 'POST',
        })
        return axiosRes.data
    }
}