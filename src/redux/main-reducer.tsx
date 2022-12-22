import React from "react";
import {AppDispatch, AppThunk} from "./store";
import {
    cardsApi,
    GetCardType,
    GetPackType
} from "../api/cards-api";

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}

export type PackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
}


type initialStateType = {
    packs: Array<PackType>
    cards: Array<CardType>
}
const initialState = {
    packs: [],
    cards: []
}

type MainActionType = ReturnType<typeof setPacksAC> | ReturnType<typeof setCardsAC>


export const mainReducer = (state: any = initialState, action: MainActionType): initialStateType => {
    switch (action.type) {
        case 'main/SET-PACKS': {
            return {...state, packs: action.payload}
        }
        case 'main/SET-CARDS': {
            return {...state, cards: action.payload}
        }
        default:
            return state
    }
}

export const getPacksTC = (data: GetPackType): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            console.log('1')
            const res = await cardsApi.getPacks(data)
            dispatch(setPacksAC(res.data.cardPacks))
        } catch (error) {
            console.log(error)
        }
    }
}




export const getCardsTC = (data: GetCardType): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await cardsApi.getCards(data)
            dispatch(setCardsAC(res.data.cards))
        } catch (error) {
            console.log(error)
        }
    }
}
export const setPacksAC = (packs: Array<PackType>) => {
    return {type: 'main/SET-PACKS', payload: packs} as const
}
export const setCardsAC = (cards: Array<CardType>) => {
    return {type: 'main/SET-CARDS', payload: cards} as const
}



