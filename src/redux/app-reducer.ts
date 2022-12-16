import {AppDispatch, AppThunk} from "./store";
import {authAPI} from "../api/auth-api";
import {handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {setEmailAC, setIsFetchingAC} from "./auth-reducer";


export const appReducer = (state: any, action: any): any => {
    switch (action.type) {
        default:
            return state
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-INITIALIZED', isInitialized} as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppIsInitializeActionType = ReturnType<typeof setIsInitializedAC>


export const setIsInitializedTC = (): AppThunk => async dispatch => {
        try {
            const res = await authAPI.me()
            console.log(res)
            let { name, avatar, email, _id } = res.data
            dispatch(setIsFetchingAC(true))
        }
       finally {
            dispatch(setIsFetchingAC(false))
        }
    }



