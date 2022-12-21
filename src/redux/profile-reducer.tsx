import {authAPI, MePropsType, UpdateUserType,} from "../api/auth-api";
import {AppRootStateType, AppThunk} from "./store";
import {setAppStatusAC} from "./app-reducer";


type initialStateType = {
    name: string,
    avatar: string,
    email: string
}

const initialState: initialStateType = {
    name: '',
    avatar: '',
    email: ''
}

type ChangeProfileType = {
    name?: string
    avatar?: string
}


export const profileReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'profile/CHANGE-NAME': {
            return {...state, ...action.data}
        }
        case 'profile/SHOW-PROFILE-EMAIL': {
            return {...state, email: action.email}
        }
        default:
            return state
    }
}

//action
export const changeNameProfileAC = (data: ChangeProfileType) => {
    return {type: 'profile/CHANGE-NAME', data} as const
}

export const showEmailAC = (email: string) => {
    return {type: 'profile/SHOW-PROFILE-EMAIL', email} as const
}


//thunk
// export const updateUserTC = (data: UpdateUserType): AppThunk => async dispatch => {
//     try {
//         const res = await authAPI.userUpdate(data)
//         dispatch(setProfileAC(res.data.updatedUser))
//     } catch (error) {
//         handleServerNetworkError(error as AxiosError | Error, dispatch)
//     } finally {
//         dispatch(setIsLoggedInAC(false))
//     }
// }

export const changeProfileTC = (model: ChangeProfileType): AppThunk => {
    return async (dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        const ProfileState = getState().profile
        const ApiModel: UpdateUserType = {
            name: ProfileState.name,
            avatar: ProfileState.avatar,
            ...model,
        }
        try {
            const res =  await authAPI.userUpdate(ApiModel)
            dispatch(changeNameProfileAC(res.data.updatedUser))
            dispatch(setAppStatusAC('succeeded'))

        } catch (e) {
            console.log(e)
        }
    }
}

export type ActionType = ReturnType<typeof changeNameProfileAC>
    | ReturnType<typeof showEmailAC>


