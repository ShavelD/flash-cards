import axios from 'axios'
import {AxiosResponse} from "axios/index";


export const instance = axios.create({
    //baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    baseURL: window.location.href.includes('http://localhost') ? 'http://localhost:7542/2.0/' : process.env.REACT_APP_BACK_URL,
    withCredentials: true,
})

export const authAPI = {
    registration(model: RegisterPopsType) {
        return instance.post('/auth/register', model)
            .then((res) => {
                return res.data
            })
    },
    me() {
        return instance.post<MePropsType>('/auth/me')
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<MePropsType>('/auth/login', {email, password, rememberMe})
    },
    logOut() {
        return instance.delete<{info: string, error: string}>('/auth/login');
    },
    userUpdate(data: UpdateUserType) {
        return instance.put<UpdateUserType, AxiosResponse<ResponseType>>(`auth/me`, data)
    },

    forgotPassword(data:ForgotPasswordType){
        return instance.post<ForgotPasswordType, AxiosResponse<ForgotPasswordResponseType>>('/auth/forgot', data)
    },
    newPassword(data:NewPasswordType){
        return instance.post<NewPasswordType, AxiosResponse<ForgotPasswordResponseType>>('/auth/set-new-password', data)
    }
}



type RegisterPopsType = {
    email: string,
    password: string
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

export type ForgotPasswordType={
    email:string
    from: string
    message:string
}

type ForgotPasswordResponseType = {
    info: string
    error: string;
}

type NewPasswordType={
    password:string
    resetPasswordToken:string
}
