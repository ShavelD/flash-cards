import axios from "axios"


export type PacksParamsType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}
export type PacksResponseType = {
    cardPacks: CardsPacksType[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
}
export type CardsPacksType = {
    _id: string
    user_id: string
    user_name: string
    private: false
    name: string
    path: string
    grade: number
    shots: number
    deckCover: string
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
}
export const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const packsAPI = {
    getPacks: (params: PacksParamsType) => {
        return instance.get<PacksResponseType>('cards/pack', { params })
    },
}