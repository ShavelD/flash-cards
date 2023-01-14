import {setAppErrorAC, SetAppErrorActionType, SetAppStatusActionType, setAppStatusAC} from '../redux/app-reducer'
import {ResponseType} from '../api/cards-api'
import {Dispatch} from 'redux'
import {AppRootActionType} from "../redux/store";
import axios, {AxiosError} from "axios";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch<AppRootActionType>) => {
    const err = e as Error | AxiosError
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? (err.response?.data as { error: string }).error : err.message
        dispatch(setAppErrorAC(error))
        console.log(error)
    }
    dispatch((setAppStatusAC('failed')))
}



