

export const appReducer = (state: null, action: any): null => {
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