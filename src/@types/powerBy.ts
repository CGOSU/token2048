export interface PowerByResource {
    id: number;
    name: string;
    img: string;
}
export interface PowerByResourceList {
    data: Array<PowerByResource>,
    msg: string,
    code: number
}