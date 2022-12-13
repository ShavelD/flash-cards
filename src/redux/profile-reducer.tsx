import React from "react";


export const profileReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

export const registrationAC = () => {
    return {type: '',} as const
}

export type ActionType = ReturnType<typeof registrationAC>


type initialStateType = {
    isLoggedIh: boolean
}

const initialState: initialStateType = {
    isLoggedIh: false
}
