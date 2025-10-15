export interface AgendaResource {
    id: number;
    category: null;
    power_by: string;
    title: string;
    highlight: string;
    speakers: string[];
    event_type: string;
    start_end: string;
    card_time: string;
    duration: string;
    moderator: string;
}
export interface AgendaResourceList {
    data: Array<AgendaResource>,
    code: number,
    msg: string
}