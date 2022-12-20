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
        return instance.delete<DeleteForgotType>('/auth/login');
    },
    userUpdate(data: UpdateUserType) {
        return instance.put<UpdateUserType, AxiosResponse<ResponseType>>(`/auth/me`, data)
    },
    forgotPass(email: string) {
        return instance.post<DeleteForgotType>(`/auth/forgot`, {
            email,
            form: 'test-front-admin <ai73a@yandex.by>',
            message: `<div style="background-color: limegreen; padding: 15px">password recovery link: <a href="http://localhost:3000/#/new-password/$token$">link</> </div>`,
        })
    },
    setNewPass(payload: NewPasswordType) {
        return instance.post<DeleteForgotType>(`/auth/set-new-password`, payload)
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

export type NewPasswordType = {
    password: string
    resetPasswordToken: string
}
