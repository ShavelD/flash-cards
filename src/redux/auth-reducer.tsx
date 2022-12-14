import {AppThunk} from "./store";
import {handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {authAPI} from "../api/auth-api";


type InitialStateType = {
    isLoggedIn: boolean
}

const initialState: InitialStateType = {
    isLoggedIn: false,
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case 'auth/SET-IS-LOGGED-IN': {
            return {...state, isLoggedIn: action.isLoggedIn}
        }
        default:
            return {...state}
    }
}


//action
export const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return {
        type: 'auth/SET-IS-LOGGED-IN',
         isLoggedIn
    } as const
}

export const setIsFetchingAC = (isLoggedIn: boolean) => {
    return {
        type: 'auth/SET-IS-LOGGED-IN',
         isLoggedIn
    } as const
}

//thunk
export const registrationTC =
    (email: string, password: string): AppThunk =>
        async dispatch => {
            try {
                dispatch(setIsFetchingAC(true))
                await authAPI.registration({ email, password })
                // dispatch(setSuccessAC('Registration successfully completed'))
            } catch (error) {
                handleServerNetworkError(error as AxiosError | Error, dispatch)
            } finally {
                dispatch(setIsFetchingAC(false))
            }
        }




//type

export type AuthActionType = ReturnType<typeof setIsLoggedInAC>