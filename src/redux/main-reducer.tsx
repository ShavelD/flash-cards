import React from "react";
import {AppDispatch, AppThunk} from "./store";
import {
    cardsApi, CreatePackType, DeletePackType, GetCardType,
    GetPackType, UpdatePackType
} from "../api/cards-api";


export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots?: number
    user_id?: string
    created?: string
    updated: string
    _id: string
}

export type PackType = {
    _id: string
    name: string
    user_id: string
    updated: string
    cardsCount: number
    created: string
}


type initialStateType = {
    packs: Array<PackType>
    cards: Array<CardType>
    cardPacksTotalCount: number,
    maxCardsCount: number,
    minCardsCount: number,
    page: number,
    pageCount: number,
    sortPacks: string,
}
const initialState: initialStateType = {
    packs: [] as MainPackType[],
    cards: [] as MainCardsType[],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 0,
    sortPacks: '0updated',
}

export type MainPackType = Pick<PackType, '_id' | 'name' | 'user_id' | 'updated' | 'cardsCount' | 'created'>
export type MainCardsType = Pick<CardType,  'user_id' | 'cardsPack_id' | '_id' | 'question' | 'answer' | 'updated' | 'grade'>


type MainActionType = ReturnType<typeof setPacksAC>
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof changePageAC>
    | ReturnType<typeof changePageCountAC>
    | ReturnType<typeof changeCardsNumberInPackAC>
    | ReturnType<typeof changeSortPacksAC>


export const mainReducer = (state: initialStateType = initialState, action: MainActionType): initialStateType => {
    switch (action.type) {
        case 'main/SET-PACKS': {
            return {
                ...state,
                maxCardsCount: state.maxCardsCount,
                minCardsCount: state.minCardsCount,
                packs: action.packs.map(({_id, name, user_id, updated, cardsCount, created}) => ({
                        _id,
                        name,
                        cardsCount,
                        updated,
                        user_id,
                        created
                    })
                ),
            }
        }
        case 'main/SET-CARDS': {
            return {
                ...state,
                cards: action.cards.map(({user_id, cardsPack_id, _id, updated, question, answer, grade}) => ({
                    user_id,
                    cardsPack_id,
                    _id,
                    answer,
                    question,
                    grade,
                    updated,
                })),
            }
        }
        case 'main/CHANGE-PAGE':
            return {...state, page: action.page}
        case 'main/CHANGE-PAGE-COUNT':
            return {...state, pageCount: action.pageCount}
        case 'main/packs-CHANGE-CARDS-NUMBER-IN-PACK':
            return {...state, minCardsCount: action.min, maxCardsCount: action.max}
        case 'main/packs-CHANGE-SORT-PACKS':
            return {...state, sortPacks: action.sortPacks}
        default:
            return state
    }
}

export const setPacksAC = (packs: Array<PackType>) => {
    return {type: 'main/SET-PACKS', packs} as const
}
export const setCardsAC = (cards: Array<CardType>) => {
    return {type: 'main/SET-CARDS', cards} as const
}
export const changePageAC = (page: number) => {
    return {type: 'main/CHANGE-PAGE', page} as const
}
export const changePageCountAC = (pageCount: number) => {
    return {type: 'main/CHANGE-PAGE-COUNT', pageCount} as const
}
export const changeCardsNumberInPackAC = (min: number, max: number) => {
    return {type: 'main/packs-CHANGE-CARDS-NUMBER-IN-PACK', min, max} as const
}

export const changeSortPacksAC = (sortPacks: string) => {
    return {type: 'main/packs-CHANGE-SORT-PACKS', sortPacks} as const
}


export const getPacksTC = (paramsSearch?: Partial<GetPackType>): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            let params = {
                packName: paramsSearch?.packName || undefined,
                min: Number(paramsSearch?.min) || undefined,
                max: Number(paramsSearch?.max) || undefined,
                page: Number(paramsSearch?.page) || undefined,
                pageCount: Number(paramsSearch?.pageCount) || undefined,
                user_id: paramsSearch?.user_id || undefined,
                sortPacks: paramsSearch?.sortPacks || undefined,
            }
            const res = await cardsApi.getPacks(params)
            dispatch(setPacksAC(res.data.cardPacks))
        } catch (error) {
            console.log(error)
        }
    }
}

export const createPackTC = (name: string, privateCheckbox: boolean): AppThunk =>
    async (dispatch: AppDispatch) => {
        try {
            await cardsApi.createPack(name, privateCheckbox)
            dispatch(getPacksTC())
        } catch (error) {
            console.log(error)
        }
    }

export const updatePackTC = (name: string, _id: string): AppThunk =>
    async (dispatch: AppDispatch) => {
        try {
            await cardsApi.updatePack(name, _id)
            dispatch(getPacksTC())
        } catch (error) {
            console.log(error)
        }
    }

export const deletePackTC = (id: string): AppThunk =>
    async (dispatch: AppDispatch) => {
        try {
            await cardsApi.deletePack(id)
            dispatch(getPacksTC())
        } catch (error) {
            console.log(error)
        }
    }

export const getCardsTC = (params: GetCardType): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await cardsApi.getCards({cardsPack_id: params.cardsPack_id})
            dispatch(setCardsAC(res.data.cards))
        } catch (error) {
            console.log(error)
        }
    }
}




