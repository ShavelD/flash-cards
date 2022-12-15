import React from "react";
import {authAPI, MePropsType, UpdateUserType,} from "../api/auth-api";
import {AppThunk} from "./store";
import {handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {setIsFetchingAC} from "./auth-reducer";


export const profileReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "set/PROFILE":{
            return action.payload.profile
                ? {...state, user:{...action.payload.profile }}
                : {...state, user: action.payload.profile }
        }
        default:
            return state
    }
}

//action

export const registrationAC = () => {
    return {type: '',} as const
}

export const setProfileAC = (profile: MePropsType) => {
    debugger
  return{
      type:'set/PROFILE',
      payload:{profile}
  }as const
}


//thunk
export const updateUserTC = (data: UpdateUserType):AppThunk => async dispatch=>{
   // debugger
    try {
        const res = await authAPI.userUpdate(data)
        dispatch(setProfileAC(res.data.updatedUser))
    }
    catch (error) {
        handleServerNetworkError(error as AxiosError | Error, dispatch)
    } finally {
        dispatch(setIsFetchingAC(false))
    }
}

export type ActionType = ReturnType<typeof registrationAC> | ReturnType<typeof setProfileAC>


type initialStateType = {
   // isLoggedIh: boolean
    user: MePropsType
}

const initialState: initialStateType = {
   // isLoggedIh: false
    //?????????
    user: {name:'', _id:'', avatar:'', email:'', error:'', publicCardPacksCount:0, rememberMe:false }
}
