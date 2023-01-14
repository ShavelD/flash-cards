import {AppDispatch, AppThunk} from "./store";
import {authAPI} from "../api/auth-api";
import {setIsLoggedInAC} from "./auth-reducer";
import {changeNameProfileAC, showEmailAC, showMyIdAC} from "./profile-reducer";
import axios, {AxiosError} from "axios";
import {handleServerNetworkError} from "../utils/error-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


export type InitialStateType = {
    error: null | string
    status: RequestStatusType
    isInitialized: boolean
}

const initialState: InitialStateType = {
    error: null as null | string,
    status: 'idle',
    isInitialized: false,
}


export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-SUCCESS':
            return {...state, status: action.status}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export type AppActionsType =
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setIsInitializedAC>

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>


export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-SUCCESS', status} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-INITIALIZED', isInitialized} as const)


export const setIsInitializedTC = (): AppThunk => async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsInitializedAC(false))
        const res = await authAPI.me()
        dispatch(setIsLoggedInAC(true))
        dispatch(changeNameProfileAC({name: res.data.name, avatar: ''}))
        dispatch(showEmailAC(res.data.email))
        dispatch(showMyIdAC(res.data._id))
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally {
       dispatch(setIsInitializedAC(true))
    }
}



