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
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<MePropsType>('/auth/login', {email, password, rememberMe})
    },
    logOut() {
        return instance.delete<DeleteForgotType>('/auth/me');
    },
    userUpdate(data: UpdateUserType) {
        return instance.put<UpdateUserType, AxiosResponse<ResponseType>>(`auth/me`, data)
    },
    forgotPass(email: string, from: string, message: string) {
        return instance.post<DeleteForgotType>(`auth/forgot`, {email, from, message})
    },
    setNewPass(password: string, resetPasswordToken: string | undefined) {
        return instance.post<DeleteForgotType>(`auth//set-new-password`, {password, resetPasswordToken})
    },

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
