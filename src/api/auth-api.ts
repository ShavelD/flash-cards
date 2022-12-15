import axios from 'axios'



export const instance = axios.create({
    //baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    // withCredentials: true,
})

export const authAPI = {
    registration(model: RegisterPopsType) {
        return instance.post('/auth/register', model)
            .then((res)=>{
                return res.data
            })
    },
    me() {
        return instance.post<ProfileType>('/auth/me', {})
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<ProfileType>('/auth/login', {email, password, rememberMe})
    },

}



type RegisterPopsType = {
    email: string,
    password: string
}

export type ProfileType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    rememberMe: boolean;
    error?: string;
}