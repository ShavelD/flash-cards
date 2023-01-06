import axios from 'axios'
import {AxiosResponse} from "axios/index";


export const instance = axios.create({
    //baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})


export const authAPI = {
    registration(model: RegisterPopsType) {
        return instance.post('/auth/register', model)
    },
    me() {
        return instance.post<MePropsType>('/auth/me')
    },
    login(data: LoginParamsType) {
        return instance.post<MePropsType>('/auth/login', data)
    },
    logOut() {
        return instance.delete<DeleteForgotType>('/auth/me');
    },
    userUpdate(data: UpdateUserType) {
        return instance.put<UpdateUserType, AxiosResponse<ResponseType>>(`/auth/me`, data)
    },
    forgotPassword(data: ForgotPasswordType){
        return instance.post<ForgotPasswordType, AxiosResponse<ForgotPasswordResponseType>>('/auth/forgot', data)
    },
    newPassword(data: NewPasswordType){
        return instance.post<NewPasswordType, AxiosResponse<ForgotPasswordResponseType>>('/auth/set-new-password', data)
    }
}


export type LoginParamsType = {
    email?: string, password?: string, rememberMe?: boolean
}

export type RegisterPopsType = {
    email: string,
    password: string
}

export type DeleteForgotType = {
    info: string
    error: string
}

export type UpdateUserType = {
    name: string
    avatar: string
}

type ResponseType = {
    updatedUser: MePropsType
    error?: string
}

export type MePropsType = {
    _id: string
    email: string
    name: string
    avatar: string
    publicCardPacksCount: number
    rememberMe: boolean
    error?: string
}

export type NewPasswordType = {
    password: string
    resetPasswordToken?: string
}

export type ForgotPasswordType={
    email?:string
    from: string
    message:string
}

type ForgotPasswordResponseType = {
    info: string
    error: string;
}


