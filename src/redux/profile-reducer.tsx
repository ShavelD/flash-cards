import {authAPI, UpdateUserType,} from "../api/auth-api";
import {AppRootStateType, AppThunk} from "./store";
import {setAppStatusAC} from "./app-reducer";


type initialStateType = {
    name: string,
    avatar: string,
    email: string,
    _id: string
}

const initialState: initialStateType = {
    name: '',
    avatar: '',
    email: '',
    _id: '',
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
        case 'profile/MY-ID': {
            return {...state, _id: action._id}
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

export const showMyIdAC = (_id: string) => {
    return {type: 'profile/MY-ID', _id} as const
}


//thunk
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
    | ReturnType<typeof showMyIdAC>



