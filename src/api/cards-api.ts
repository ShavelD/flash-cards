import axios, { AxiosResponse } from 'axios'
// //
// // const instance = axios.create({
// //     baseURL: '',
// //     withCredentials: true,
// //     headers: {
// //         ''
// //     }
// // })
//
//
// // export type AuthMeResponseType = {
// //     id: number,
// //     email: string,
// //     Login: string
// // }
//
// // export type LoginParamsType = {
// //     email?: string,
// //     password?: string,
// //     rememberMe?: boolean,
// //     captcha?: boolean
// // }
//
// export type ResponseType<D = {}> = {
//     resultCode: number
//     messages: Array<string>
//     fieldsErrors: Array<string>
//     data: D
// }
//
// export enum Result_Code {
//     OK = 0,
//     ERROR = 1,
//     CAPCHA = 10,
// }
//
//
// export const instance = axios.create({
//     //baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
//     baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
//     // withCredentials: true,
// })
//
// export const authAPI = {
//     me() {
//         return instance.post<ProfileType>('/auth/me', {})
//     },
//     login(data: LoginParamsType) {
//         return instance.post<LoginParamsType,AxiosResponse<ResponseType<{userId: string}>>>('/auth/login', data);
//     },
//     logOut() {
//         return instance.delete<ResponseType>('/auth/login');
//     },
//     register() {
//         return instance.post<ProfileType>('/auth/register', {
//             email: "nya-admin@nya.nya",
//             password: "1qazxcvBG"
//         })
//     },
// }
//
//
//
// export type ProfileType = {
//     _id: string;
//     email: string;
//     name: string;
//     avatar?: string;
//     publicCardPacksCount: number; // количество колод
//     created: Date;
//     rememberMe: boolean;
//     error?: string;
// }