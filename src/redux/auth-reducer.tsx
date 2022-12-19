import {AppDispatch, AppThunk} from "./store";
import {handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {authAPI, LoginParamsType, RegisterPopsType} from "../api/auth-api";
import {changeNameProfileAC, showEmailAC} from "./profile-reducer";


const initialState = {
    isLoggedIn: false,
    isFetching: false,
    isMessageSent: false,
    isNewPassword: false,
    registration: false
}

type InitialStateType = typeof initialState

export type AuthActionType =
    ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setEmailAC>
    | ReturnType<typeof setIsRegistrationAC>
    | ReturnType<typeof setNewPassAC>

export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case 'auth/SET-IS-LOGGED-IN': {
            return {...state, isLoggedIn: action.isLoggedIn}
        }
        case 'auth/SET-EMAIL': {
            return {...state, isMessageSent: action.isMessageSent}
        }
        case 'auth/SET-IS-REGISTRATION':
            return {...state, registration: action.value}
        case 'auth/IS-NEW-PASSWORD':
            return {...state, isNewPassword: action.value}
        default:
            return state
    }
}

export const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return {type: 'auth/SET-IS-LOGGED-IN', isLoggedIn} as const
}

export const setEmailAC = (isMessageSent: boolean) => {
    return {type: 'auth/SET-EMAIL', isMessageSent} as const
}

export const setNewPassAC = (value: boolean) => {
    return {type: 'auth/IS-NEW-PASSWORD', value} as const
}

export const setIsRegistrationAC = (value: boolean) => {
    return {type: 'auth/SET-IS-REGISTRATION', value} as const
}


export const loginTC = (data: LoginParamsType): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            // dispatch(setIsFetchingAC(true))
           const res = await authAPI.login(data)
            console.log(res.data)
            dispatch(setIsLoggedInAC(true))
        } catch (error) {
            console.log(error)
        }
    }
}

export const logOutTC = (): AppThunk => async (dispatch: AppDispatch) => {
    try {
       const res = await authAPI.logOut()
        dispatch(setIsLoggedInAC(false))
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}

export const forgoPassTC = (email: string, from: string, message: string): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const res = await authAPI.forgotPass(email, from, message)
        dispatch(setEmailAC(true))
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}

export const setNewPassTC = (password: string, resetPasswordToken: string | undefined): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const res = await authAPI.setNewPass(password, resetPasswordToken)
        dispatch(setNewPassAC(true))
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}

export const registrationTC = (model: RegisterPopsType): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await authAPI.registration(model)
            dispatch(setIsRegistrationAC(true))
            console.log(res.data)
        } catch (e) {
            console.log(e)
        }
    }
}

