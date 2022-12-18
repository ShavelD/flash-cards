import {AppDispatch, AppThunk} from "./store";
import {handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {authAPI} from "../api/auth-api";


const initialState = {
    isLoggedIn: false,
    isFetching: false,
    email: '',

}

type InitialStateType = typeof initialState

export type AuthActionType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setEmailAC> | ReturnType<typeof setIsFetchingAC>

export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case 'auth/SET-IS-LOGGED-IN': {
            return {...state, isLoggedIn: action.isLoggedIn}
        }
        case 'auth/SET-EMAIL': {
            return {...state, email: action.email}
        }
        case 'AUTH/SET-IS-FETCHING':
            return {...state, isFetching: action.value}
        default:
            return {...state}
    }
}

export const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return {
        type: 'auth/SET-IS-LOGGED-IN',
        isLoggedIn
    } as const
}

export const setEmailAC = (email: string) => {
    return {
        type: 'auth/SET-EMAIL',
        email
    } as const
}

export const setIsFetchingAC = (value: boolean) =>
    ({type: 'AUTH/SET-IS-FETCHING', value} as const)


export const loginTC = (email: string, password: string, rememberMe: boolean): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            authAPI.login(email, password, rememberMe).then((res) => {
                console.log(res)
                if (res.data.error) throw new Error('Error')
                dispatch(setIsLoggedInAC(true))
            })
        } catch (error) {
            console.log(error)
        }
    }
}


export const logOutTC = (): AppThunk => async dispatch => {
    try {
        await authAPI.logOut()
        dispatch(setIsLoggedInAC(false))
    } catch (error) {
        handleServerNetworkError(error as AxiosError | Error, dispatch)
    }
}

export const registrationTC = (email: string, password: string): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            await authAPI.registration({email, password}).then((res) => {
                if (res.error) throw new Error('Error')
                dispatch(setEmailAC(email))
            })
        } catch (e) {
            console.log(e)
        }
    }
}

