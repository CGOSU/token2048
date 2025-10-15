
export interface SpeakerResource {
    id: undefined | number,
    name: undefined | string
    job_title: undefined | string
    company: undefined | string
    x: undefined | string
    linkedin: undefined | string
    avatar: undefined | string
}
export interface SpeakerResourceList {
    list: Array<SpeakerResource>
    total: number
}