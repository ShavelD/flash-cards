import { AxiosError } from 'axios'
import { AppThunk } from './store'
import {packsAPI, PacksParamsType, PacksResponseType} from "../api/packs-api";


const initialState: PacksResponseType = {
    cardPacks: [],
    page: 1, // Текущая страница
    pageCount: 0, // Колод на странице
    cardPacksTotalCount: 0, // количество колод
    minCardsCount: 0, // фильтрация
    maxCardsCount: 0, // фильтрация
}

export const packsReducer = (
    state: PacksResponseType = initialState,
    action: PacksActionsType
): PacksResponseType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS':
            return { ...state, ...action.payload }
        default:
            return state
    }
}
//ACTIONS
export const setPacksAC = (data: PacksResponseType) =>
    ({ type: 'PACKS/SET-PACKS', payload: data } as const)

//THUNKS
export const getPacksTC =
    (params: PacksParamsType): AppThunk =>
        async (dispatch) => {

            try {
                const res = await packsAPI.getPacks(params)
                dispatch(setPacksAC(res.data))
            } catch (error) {

            } finally {

            }
        }

//TYPES
export type PacksActionsType = SetPacksAC

export type SetPacksAC = ReturnType<typeof setPacksAC>