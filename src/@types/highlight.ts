export interface HighlightResource {
    id: number;
    name: string;
    img: string;
}
export interface HighlightResourceList {
    data: Array<HighlightResource>,
    msg: string,
    code: number
}