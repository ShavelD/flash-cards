import axios, { AxiosResponse } from 'axios'
//
// const instance = axios.create({
//     baseURL: '',
//     withCredentials: true,
//     headers: {
//         ''
//     }
// })


// export type AuthMeResponseType = {
//     id: number,
//     email: string,
//     Login: string
// }

// export type LoginParamsType = {
//     email?: string,
//     password?: string,
//     rememberMe?: boolean,
//     captcha?: boolean
// }

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export enum Result_Code {
    OK = 0,
    ERROR = 1,
    CAPCHA = 10,
}