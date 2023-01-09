import React from "react";
import {AppDispatch, AppThunk} from "./store";
import {
    cardsApi, CreatePackType, DeletePackType, GetCardType,
    GetPackType, UpdatePackType
} from "../api/cards-api";
import {setAppStatusAC} from "./app-reducer";


export type CardType = {
    user_id: string
    cardsPack_id: string
    _id: string
    question: string
    answer: string
    grade: number
    shots: number
    created: Date
    updated: Date
}

export type PackType = {
    _id: string
    name: string
    user_id: string
    updated: string
    cardsCount: number
    created: string
    user_name: string
    shots: number
}


type initialStateType = {
    packs: Array<PackType>
    cards: Array<CardType>
    cardPacksTotalCount: number,
    queryParams: any
}

const initialState: initialStateType = {
    packs: [] as MainPackType[],
    cards: [] as MainCardsType[],
    cardPacksTotalCount: 0,
    queryParams: {
        // packName: null,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 1,
        pageCount: 0,
        sortPacks: '0updated',
        // user_id: '',
    }
}

export type MainPackType = Pick<PackType, '_id' | 'name' | 'user_id' | 'updated' | 'cardsCount' | 'created' | 'user_name' | 'shots'>
export type MainCardsType = Pick<CardType, 'user_id' | 'cardsPack_id' | '_id' | 'question' | 'answer' | 'updated' | 'grade' | 'shots' | 'created'>


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
                queryParams: {
                    ...state,
                    maxCardsCount: state.queryParams.maxCardsCount,
                    minCardsCount: state.queryParams.minCardsCount
                },
                packs: action.packs.map(({_id, name, user_id, updated, cardsCount, created, user_name, shots}) => ({
                        _id,
                        name,
                        cardsCount,
                        updated,
                        user_id,
                        created,
                        user_name,
                        shots
                    })
                ),
            }
        }
        case 'main/SET-CARDS':
            // return {...state, cards: action.cards}
        {
            return {
                ...state,
                cards: action.cards.map(({
                                             user_id,
                                             cardsPack_id,
                                             _id,
                                             updated,
                                             question,
                                             answer,
                                             grade,
                                             shots,
                                             created,
                                         }) => ({
                    user_id,
                    cardsPack_id,
                    _id,
                    answer,
                    question,
                    grade,
                    updated,
                    shots,
                    created,
                })),
            }
        }
        case 'main/CHANGE-PAGE':
            return {...state, queryParams: {...state.queryParams, page: action.page}}
        case 'main/CHANGE-PAGE-COUNT':
            return {...state, queryParams: {...state.queryParams, pageCount: action.pageCount}}
        case 'main/packs-CHANGE-CARDS-NUMBER-IN-PACK':
            return {...state, queryParams: {...state.queryParams, minCardsCount: action.min, maxCardsCount: action.max}}
        case 'main/packs-CHANGE-SORT-PACKS':
            return {...state, queryParams: {...state.queryParams, sortPacks: action.sortPacks}}
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

export const getCardsTC = (params: GetCardType): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await cardsApi.getCards(params)
            dispatch(setCardsAC(res.data.cards))
        } catch (error) {
            console.log(error)
        }
    }
}

export const addPackTC = (newPacks: any): AppThunk =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setAppStatusAC('loading'))
            await cardsApi.addPack(newPacks)
            dispatch(getPacksTC())
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(setAppStatusAC('succeeded'))
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

export const deletePackTC = (pack_id: string): AppThunk =>
    async (dispatch: AppDispatch) => {
        try {
            await cardsApi.deletePack(pack_id)
            dispatch(getPacksTC())
        } catch (error) {
            console.log(error)
        }
    }






