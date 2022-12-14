import {authAPI} from "../api/cards-api";
import {AppDispatch} from "./store";


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

//thunk

export const authMeTC = () => async (dispatch: AppDispatch) => {
    // debugger
    try {
        const res = await authAPI.me()
        dispatch(setIsLoggedInAC(true))
    }catch (err){

    }
}



//type

export type AuthActionType = ReturnType<typeof setIsLoggedInAC>