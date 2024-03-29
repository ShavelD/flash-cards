import React from "react";
import {AppDispatch, AppThunk} from "./store";
import {
    cardsApi, GetCardType,
    GetPackType
} from "../api/cards-api";
import {setAppStatusAC} from "./app-reducer";
import {getPhotoPacksAC, showIdPacsAC, showNamePacsAC} from "./cards-reducer";
import {handleServerNetworkError} from "../utils/error-utils";


export type CardType = {
    user_id: string
    cardsPack_id: string
    _id: string
    question: string
    answer: string
    grade: number
    shots: number
    created: string
    updated: string
    questionImg: string
    answerImg: string
    type: string
    rating: number
    more_id: string
    __v: number
    answerVideo: string
    questionVideo: string
    comments: string
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
    deckCover: string
}


type initialStateType = {
    packs: Array<PackType>
    cards: Array<CardType>
    cardPacksTotalCount: number,
    queryParams: any,
    deckCover: string
}

const initialState: initialStateType = {
    packs: [] as MainPackType[],
    cards: [] as MainCardsType[],
    cardPacksTotalCount: 800,
    deckCover: '',
    queryParams: {
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 1,
        pageCount: 0,
        sortPacks: '0updated',
    }
}

export type MainPackType = Pick<PackType, '_id' | 'name' | 'user_id' | 'updated' | 'cardsCount' | 'created' | 'user_name' | 'shots' | 'deckCover'>
export type MainCardsType = Pick<CardType, 'user_id' | 'cardsPack_id' | '_id' | 'question' | 'answer' | 'updated'
    | 'grade' | 'shots' | 'created' | 'questionImg' | 'answerImg' | 'type' | 'rating' | 'more_id' | '__v' | 'answerVideo'
    | 'questionVideo' | 'comments'>


export type MainActionType = ReturnType<typeof setPacksAC>
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof changePageAC>
    | ReturnType<typeof changePageCountAC>
    | ReturnType<typeof changeCardsNumberInPackAC>
    | ReturnType<typeof changeSortPacksAC>
    | ReturnType<typeof deleteMyPackAC>


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
                packs: action.packs.map(({
                                             _id,
                                             name,
                                             user_id,
                                             updated,
                                             cardsCount,
                                             created,
                                             user_name,
                                             shots,
                                             deckCover
                                         }) => ({
                        _id,
                        name,
                        cardsCount,
                        updated,
                        user_id,
                        created,
                        user_name,
                        shots,
                        deckCover
                    })
                ),
            }
        }
        case 'main/SET-CARDS': {
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
                                             questionImg,
                                             answerImg,
                                             type,
                                             rating,
                                             more_id,
                                             __v,
                                             answerVideo,
                                             questionVideo,
                                             comments,
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
                    questionImg,
                    answerImg,
                    type,
                    rating,
                    more_id,
                    __v,
                    answerVideo,
                    questionVideo,
                    comments,
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
        case 'main/packs-DELETE-MY-PACK':
            return {...state, packs: state.packs.filter(p => p._id !== action.id)}
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
export const deleteMyPackAC = (id: string) => {
    return {type: 'main/packs-DELETE-MY-PACK', id} as const
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
                packDeckCover: paramsSearch?.packDeckCover || undefined,
            }
            const res = await cardsApi.getPacks(params)
            dispatch(setPacksAC(res.data.cardPacks))
        } catch (error) {
            handleServerNetworkError(error, dispatch)
        }
    }
}



export const getCardsTC = (params: GetCardType): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await cardsApi.getCards(params)
            dispatch(setCardsAC(res.data.cards))
            dispatch(showIdPacsAC(res.data.packUserId))
            dispatch(showNamePacsAC(res.data.packName))
            dispatch(getPhotoPacksAC(res.data.packDeckCover))
        } catch (error) {
            handleServerNetworkError(error, dispatch)
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
            handleServerNetworkError(error, dispatch)
        } finally {
            dispatch(setAppStatusAC('succeeded'))
        }
    }

export const updatePackTC = (name: string, _id: string, deckCover: string): AppThunk =>
    async (dispatch: AppDispatch) => {
        try {
            await cardsApi.updatePack(name, _id, deckCover)
            dispatch(getPacksTC())
        } catch (error) {
            handleServerNetworkError(error, dispatch)
        }
    }

export const deletePackTC = (pack_id: string): AppThunk =>
    async (dispatch: AppDispatch) => {
        try {
            await cardsApi.deletePack(pack_id)
            dispatch(deleteMyPackAC(pack_id))
        } catch (error) {
            handleServerNetworkError(error, dispatch)
        }
    }






