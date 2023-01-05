import {AppDispatch, AppThunk} from "./store";
import {authAPI, LoginParamsType, RegisterPopsType} from "../api/auth-api";
import {changeNameProfileAC, showEmailAC} from "./profile-reducer";
import {setAppStatusAC, setIsInitializedTC} from "./app-reducer";
import {handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {FormikErrorType} from "../features/pass-recovery/PassRecovery";


const initialState = {
    isLoggedIn: false,
    isFetching: false,
    isMessageSent: false,
    isNewPassword: false,
    registration: false,
    email: '',
}

type InitialStateType = typeof initialState

export type AuthActionType =
    ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsRegistrationAC>
    | ReturnType<typeof setNewPassAC>
    | ReturnType<typeof forgotPasswordAC>


export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case 'auth/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        case 'auth/SET-IS-REGISTRATION':
            return {...state, registration: action.value}
        case 'auth/IS-NEW-PASSWORD':
            return {...state, isNewPassword: action.value}
        case 'auth/FORGOT-PASSWORD':
            return {...state, email: action.email}
        default:
            return state
    }
}

export const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return {type: 'auth/SET-IS-LOGGED-IN', isLoggedIn} as const
}

export const setNewPassAC = (value: boolean) => {
    return {type: 'auth/IS-NEW-PASSWORD', value} as const
}

export const setIsRegistrationAC = (value: boolean) => {
    return {type: 'auth/SET-IS-REGISTRATION', value} as const
}

export const forgotPasswordAC = (email: string) => {
    return {type: 'auth/FORGOT-PASSWORD', email} as const
}

// добавила
export const setRecoveryStatusAC = (sentEmail: boolean) => {
    return {type: 'auth/SENT-RECOVERY-STATUS', sentEmail} as const
}

export const registrationTC = (model: RegisterPopsType): AppThunk => {
    return async (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await authAPI.registration(model)
            dispatch(setIsRegistrationAC(true))
            dispatch(setAppStatusAC('succeeded'))
            console.log(res.data)
        } catch (e) {
            console.log(e)
        }
    }
}

export const loginTC = (data: LoginParamsType): AppThunk => {
    return async (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await authAPI.login(data)
            // console.log(res.data.email)
            // dispatch(setIsLoggedInAC(true))
            // dispatch(changeNameProfileAC({name: res.data.name, avatar: ''}))
            // dispatch(showEmailAC(res.data.email))
            dispatch(setIsInitializedTC())
            dispatch(setAppStatusAC('succeeded'))
        } catch (error) {
            console.log(error)
            dispatch(setAppStatusAC('failed'))
        }
    }
}

export const logOutTC = (): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.logOut()
        dispatch(setIsLoggedInAC(false))
        dispatch(setAppStatusAC('succeeded'))
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}

export const setForgotPassTC = (email: FormikErrorType): AppThunk => async dispatch => {
    try {
        const forgotData = {...email, // кому восстанавливать пароль
            from: 'cards-nya <neko.nyakus.cafe@gmail.com>',
            // можно указать разработчика фронта)
            message: `<div style="background-color: lime; padding: 15px">
            password recovery link:
            <a href='https://sssromaz.github.io/fridayProject/#/set-new-password/$token$'>link</a>
           </div>`, // хтмп-письмо, вместо $token$ бэк вставит токен
        }
        await authAPI.forgotPassword(forgotData)
        dispatch(forgotPasswordAC(''))
    } catch (error) {
        handleServerNetworkError(error as AxiosError | Error, dispatch)
    }
}

export const createNewPasswordTC = (password: string, resetPasswordToken: string): AppThunk => async dispatch => {
    try {
        const data = {
            password,
            resetPasswordToken
        }
        let res = await authAPI.newPassword(data)
        dispatch(setRecoveryStatusAC(true))
    } catch (error) {
        handleServerNetworkError(error as AxiosError | Error, dispatch)
    }
}


