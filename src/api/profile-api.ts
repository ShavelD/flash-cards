import axios, {AxiosResponse} from "axios";
import {ProfileType} from "./auth-api";

export const instance = axios.create({
    //baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    // withCredentials: true,
})

export const profileApi = {
    userUpdate(data:UpdateUserType) {
        return instance.put<UpdateUserType, AxiosResponse<ResponseType>>(`auth/me`, data)
    },

}

//type

export type UpdateUserType={
    name:string
    avatar:string
}

type ResponseType={
    updatedUser:ProfileType
    error?:string
}