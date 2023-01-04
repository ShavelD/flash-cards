import axios from "axios"
import {SORT_PACKS} from "../redux/packs-reducer";


export type PacksParamsType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: SORT_PACKS
    page?: number
    pageCount?: number
    user_id?: string
}
export type PacksResponseType = {
    cardPacks: CardsPacksType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
export type CardsPacksType = {
    _id: string
    user_name: string
    user_id: string
    __v: number
    updated: string
    type: string
    shots: number
    rating: number
    private: boolean
    path: string
    name: string
    more_id: string
    grade: number
    deckCover: string
    created: string
    cardsCount: number
}
export const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const packsAPI = {

    getPacks: (params: PacksParamsType) => {
        return instance
            .get<PacksResponseType>('/cards/pack', {params})
    },
}