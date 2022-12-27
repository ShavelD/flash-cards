import React from "react";
import {CardType, getCardsTC, setCardsAC} from "./main-reducer";
import {AppDispatch, AppThunk} from "./store";
import {cardsApi, CreateCardType, GetPackResponseType, UpdateCardType} from "../api/cards-api";

export enum SORT_PACKS {
    NOT_SORT = '',
}

type initialStateType = {
    cardsTotalCount: number,
    maxGrade: number,
    minGrade: number,
    page: number,
    pageCount: number,
    packUserId: string,
    sortCards: string,

    isMy:boolean
    filterPackName:string
    filterMinCardsCount:number
        filterMaxCardsCount:number
    sortPacks:SORT_PACKS.NOT_SORT,
}
const initialState: initialStateType = {
    cardsTotalCount: 0,
    maxGrade: 30,
    minGrade: 5,
    page: 1,
    pageCount: 5,
    packUserId: '',
    sortCards: '0updated',

    isMy:false,
    filterPackName:'',
    filterMinCardsCount:0,
    filterMaxCardsCount:110,
    sortPacks:SORT_PACKS.NOT_SORT,
}


export type CardsActionsType =
    | ReturnType<typeof changeCardsPageCountAC>
    | ReturnType<typeof changeCardsPageAC>
    | ReturnType<typeof changeSortCardsAC>
    | ReturnType<typeof setPacksAC>


export const cardsReducer = (state: initialStateType = initialState, action: CardsActionsType): initialStateType => {
    switch (action.type) {
        case 'cards/CHANGE-PAGE-COUNT':
            return {...state, pageCount: action.pageCount}
        case 'cards/CHANGE-PAGE':
            return {...state, page: action.page}
        case 'cards/CHANGE-SORT':
            return {...state, sortCards: action.sortCards}
        case "SET_PACKS":
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const changeCardsPageCountAC = (pageCount: number) => {
    return {type: 'cards/CHANGE-PAGE-COUNT', pageCount} as const
}
export const changeCardsPageAC = (page: number) => {
    return {type: 'cards/CHANGE-PAGE', page} as const
}
export const changeSortCardsAC = (sortCards: string) => {
    return {type: 'cards/CHANGE-SORT', sortCards} as const
}
const setPacksAC = (packs: GetPackResponseType) =>
    ({type: 'SET_PACKS', payload: {...packs}} as const)

export const addCardTC = (data: CreateCardType): AppThunk =>
    async (dispatch: AppDispatch) => {
        try {
            await cardsApi.createCard(data)
            dispatch(getCardsTC({cardsPack_id: data.cardsPack_id}))
        } catch (error) {
            console.log(error)
        }
    }

export const deleteCardTC =
    (cardsPack_id: string, cardId: string): AppThunk =>
        async (dispatch: AppDispatch) => {
            try {
                await cardsApi.deleteCard(cardId)
                dispatch(getCardsTC({cardsPack_id: cardsPack_id}))
            } catch (error) {
                console.log(error)
            }
        }

export const updateCardTC = (cardsPack_id: string, data: UpdateCardType): AppThunk =>
    async (dispatch: AppDispatch) => {
        try {
            await cardsApi.updateCard(data)
            dispatch(getCardsTC({ cardsPack_id: cardsPack_id }))
        } catch (error) {
            console.log(error)
        }
    }

    export const currentPageTC = (page: number): AppThunk =>async (dispatch, getState) => {
        try {
            const isMy = getState().cars.isMy
            const params = {
                packName: getState().cars.filterPackName,
                min: getState().cars.filterMinCardsCount,
                max: getState().cars.filterMaxCardsCount,
                sortPacks: getState().cars.sortPacks,
                page: page,
                pageCount: getState().cars.pageCount,
                user_id: isMy ? getState().profile._id : '',
            }

            const res = await cardsApi.getPacks(params)
            dispatch(setPacksAC(res.data))
        }catch (e) {

        }
    }