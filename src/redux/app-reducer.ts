import {AppDispatch, AppThunk} from "./store";
import {authAPI} from "../api/auth-api";
import {handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {setIsFetchingAC} from "./auth-reducer";


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

// export const setIsInitializedTC = (): AppThunk => async dispatch => {
//         try {
//             dispatch(setIsFetchingAC(true))
//             await authAPI.me()
//             let {email, login, avatar, _id} = res.data
//         }
//        finally {
//             dispatch(setIsFetchingAC(false))
//         }
//     }
// }