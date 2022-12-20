import {AppDispatch, AppThunk} from "./store";
import {authAPI} from "../api/auth-api";
import {forgotPasswordAC, setEmailAC, setIsLoggedInAC} from "./auth-reducer";
import {showEmailAC} from "./profile-reducer";


export type InitialStateType = {
    error: string
    success: string
    isFetching: boolean
}
const initialState: InitialStateType = {
    error: '',
    success: '',
    isFetching: false,
}

export const appReducer = (state: InitialStateType = initialState,action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-ERROR':
            return { ...state, error: action.error }
        case 'APP/SET-SUCCESS':
            return { ...state, success: action.success }
        case 'APP/SET-INITIALIZED':
            return { ...state, isFetching: action.value }
        default:
            return state
    }
}

type ActionsType =
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setSuccessAC>
    | ReturnType<typeof isFetchingAppAC>

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setSuccessAC>
export type SetAppIsInitializeActionType = ReturnType<typeof isFetchingAppAC>

export const setAppErrorAC = (error: string) => ({ type: 'APP/SET-ERROR', error } as const)
export const setSuccessAC = (success: string) => ({ type: 'APP/SET-SUCCESS', success } as const)
export const isFetchingAppAC = (value: boolean) => ({ type: 'APP/SET-INITIALIZED', value } as const)

export const setIsInitializedTC = (): AppThunk => async (dispatch: AppDispatch) => {
    try {
        dispatch(isFetchingAppAC(true))
        const res = await authAPI.me()
        let {email} = res.data
        dispatch(setIsLoggedInAC(true))
        dispatch(showEmailAC(email))
    }
    finally {
        dispatch(isFetchingAppAC(false))
    }
}



