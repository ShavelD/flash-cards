import React from "react";
import {getCardsTC} from "./main-reducer";
import {AppDispatch, AppThunk} from "./store";
import {cardsApi, CreateCardType, UpdateCardType} from "../api/cards-api";


type initialStateType = {
    cardsTotalCount: number,
    maxGrade: number,
    minGrade: number,
    page: number,
    pageCount: number,
    packUserId: string,
    sortCards: string,
    packName: string;
}
const initialState: initialStateType = {
    cardsTotalCount: 0,
    maxGrade: 30,
    minGrade: 5,
    page: 1,
    pageCount: 5,
    packUserId: '',
    sortCards: '0updated',
    packName: '',
}


export type CardsActionsType =
    | ReturnType<typeof changeCardsPageCountAC>
    | ReturnType<typeof changeCardsPageAC>
    | ReturnType<typeof changeSortCardsAC>
    | ReturnType<typeof showNamePacsAC>
    | ReturnType<typeof showIdPacsAC>


export const cardsReducer = (state: initialStateType = initialState, action: CardsActionsType): initialStateType => {
    switch (action.type) {
        case 'cards/CHANGE-PAGE-COUNT':
            return {...state, pageCount: action.pageCount}
        case 'cards/CHANGE-PAGE':
            return {...state, page: action.page}
        case 'cards/CHANGE-SORT':
            return {...state, sortCards: action.sortCards}
        case 'cards/SHOW-NAME-PACS':
            return {...state, packName: action.packName}
        case 'cards/SHOW-ID-PACS':
            return {...state, packUserId: action.packUserId}
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
export const showNamePacsAC = (packName: string) => {
    return {type: 'cards/SHOW-NAME-PACS', packName} as const
}
export const showIdPacsAC = (packUserId: string) => {
    return {type: 'cards/SHOW-ID-PACS', packUserId} as const
}


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
            dispatch(getCardsTC({cardsPack_id}))
        } catch (error) {
            console.log(error)
        }
    }









