export interface UserResource {
    id: number,
    username: string,
    name: string,
    password?: string

}
export interface UserResourceList {
    data: Array<UserResource>,
    code: number,
    msg: string,
}
export interface UserFormResource {
    username: string,
    name: string,
    password: string
}