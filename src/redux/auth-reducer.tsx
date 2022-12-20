import {AppDispatch, AppThunk} from "./store";
import {authAPI, RegisterPopsType} from "../api/auth-api";


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
    | ReturnType<typeof setEmailAC>
    | ReturnType<typeof setIsRegistrationAC>
    | ReturnType<typeof setNewPassAC>
    | ReturnType<typeof forgotPasswordAC>


export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case 'auth/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        case 'auth/SET-EMAIL':
            return {...state, isMessageSent: action.isMessageSent}
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

export const setEmailAC = (isMessageSent: boolean) => {
    return {type: 'auth/SET-EMAIL', isMessageSent} as const
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


export const loginTC = (email: string, password: string, rememberMe: boolean): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
           const res = await authAPI.login(email, password, rememberMe)
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

export const forgoPassTC = (email: string): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const res = await authAPI.forgotPass(email)
        dispatch(forgotPasswordAC(email))
        dispatch(setEmailAC(true))
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}

export const setNewPassTC = (password: string, resetToken: string): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const res = await authAPI.setNewPass({password, resetPasswordToken: resetToken})
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

