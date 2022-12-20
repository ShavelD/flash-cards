import {AppDispatch, AppThunk} from "./store";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {authAPI, ForgotPasswordType} from "../api/auth-api";
import {Dispatch} from "redux";
import {setAppErrorAC, setSuccessAC} from "./app-reducer";


const initialState = {
    isLoggedIn: false,
    isFetching: false,
    email: '',
    sentEmail: false,
}

type InitialStateType = typeof initialState

export type AuthActionType = ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setEmailAC>
    | ReturnType<typeof setIsFetchingAC>
    | ReturnType<typeof setRecoveryStatusAC>


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
        case "auth/SENT-RECOVERY-STATUS":{
            return {...state, sentEmail: action.sentEmail}
        }
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


export const setRecoveryStatusAC = (sentEmail:boolean) => {
  return{
      type:'auth/SENT-RECOVERY-STATUS',
      sentEmail
  }as const
}


// export const loginTC = (email: string, password: string, rememberMe: boolean): AppThunk => {
//     return async (dispatch: AppDispatch) => {
//         try {
//             authAPI.login(email, password, rememberMe).then((res) => {
//                 console.log(res)
//                 if (res.data.error) throw new Error('Error')
//                 dispatch(setIsLoggedInAC(true))
//             })
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }
export const loginTC =
    (email: string, password: string, rememberMe: boolean): AppThunk =>
        async dispatch => {
            try {
                dispatch(setIsFetchingAC(true))
                await authAPI.login(email, password, rememberMe)
                dispatch(setIsLoggedInAC(true))
            } catch (error) {
                // handleServerNetworkError(error as AxiosError | Error, dispatch)
                console.log(error)
            } finally {
                dispatch(setIsFetchingAC(false))
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

export const redirectToEmailTC = (email:string):AppThunk =>async dispatch =>{
    debugger
    try {
        const forgotData = {
            email: 'nya@nya.nya',
            from: 'test-front-admin <angor78@gmail.com>',
            message: `<div style="background-color: whitesmoke;text-align: center ">
                  <h2>Password recovery</h2><div>
                     Please use the following link to reset your password:
                  <a href='http://localhost:3000/#/new-password/$token$'>
                     Password recovery
                  </a>
                  <br/>
                     If you didn't make this request, then you can ignore this email 🙂
                  <br/>
                 </div>
                </div>`
        }
        await authAPI.forgotPassword(forgotData)
            .then((res)=>{
            dispatch(setRecoveryStatusAC(true))
        })

    } catch (error) {
        handleServerNetworkError(error as AxiosError | Error, dispatch)
    }
}


export const createNewPasswordTC = (password: string, resetPasswordToken: string):AppThunk => async dispatch => {
  try {
      const data = {
          password,
          resetPasswordToken
      }
    let res = await authAPI.newPassword(data)
      dispatch(setRecoveryStatusAC(true))
  }
  catch (error) {
     // debugger
      handleServerNetworkError(error as AxiosError | Error, dispatch)
  }
}








