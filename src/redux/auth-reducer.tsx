import {AppDispatch, AppThunk} from "./store";
import {handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {authAPI} from "../api/auth-api";


type InitialStateType = {
    isLoggedIh: boolean
    email: string
}

const initialState: InitialStateType = {
    isLoggedIh: false,
    email: ""
}

export type AuthActionType = ReturnType<typeof setIsFetchingAC> | ReturnType<typeof setEmailAC>

export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case 'auth/SET-IS-LOGGED-IN': {
            return {...state, isLoggedIh: action.isLoggedIh}
        }
        case 'auth/SET-EMAIL': {
            return {...state, email: action.email}
        }
        default:
            return {...state}
    }
}


//action
export const setIsFetchingAC = (isLoggedIh: boolean) => {
    return {
        type: 'auth/SET-IS-LOGGED-IN',
        isLoggedIh
    } as const
}
export const setEmailAC = (email: string) => {
    return {
        type: 'auth/SET-EMAIL',
        email
    } as const
}

//thunk
// export const loginTC = (model: ResponseType): AppRootStateType => {
//     return async (dispatch: AppDispatch) => {
//         try {
//             dispatch(setIsFetchingAC(true))
//             await authAPI.login({email, password, data})
//             // dispatch(setSuccessAC('Registration successfully completed'))
//         } catch (error) {
//             handleServerNetworkError(error as AxiosError | Error, dispatch)
//         } finally {
//             dispatch(setIsFetchingAC(false))
//         }
//     }
// }

export const loginTC = (email: string, password: string, rememberMe: boolean): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            authAPI.login(email, password, rememberMe).then((res) => {
                console.log(res)
                if(res.data.error) throw new Error('Error')
                dispatch(setIsFetchingAC(true))
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const registrationTC = (email: string, password: string): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            await authAPI.registration({email, password}).then((res)=>{
                if(res.error) throw new Error('Error')
                dispatch(setEmailAC(email))
            })
        } catch (e){
            console.log(e)
        }
    }
}

