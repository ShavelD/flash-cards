import axios from 'axios'
import {CardType, PackType} from "../redux/main-reducer";


export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type GetPackType = {
    packName: string
    min: number
    max: number
    page: number
    pageCount: number
    user_id: string
    sortPacks: string
}

type AddPackModelType = {
    cardsPack: CardsPackType
}

type CardsPackType = {
    name: string
    deckCover: string
    private: boolean
}

export type CreateCardType = {
    cardsPack_id: string
    question: string
    answer: string
    grade?: number
    shots?: number
    questionImg?: string
    questionVideo?: string
    answerImg?: string
    answerVideo?: string

}

export type GetCardType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
    name?: string
}

export type UpdateCardType = Pick<CardType, '_id' | 'question' | 'answer'>

export type GetPackResponseType = {
    cardPacks: Array<PackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    deckCover: string
    token: string
    tokenDeathTime: number
}

type GetCardResponseType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
    sortCards: string
    packName: string
    _id: string
}

export const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const cardsApi = {
    addPack(postModel: AddPackModelType) {
        return instance.post('/cards/pack', postModel)
    },
    getPacks(params?: Partial<GetPackType>) {
        return instance.get<GetPackResponseType>('cards/pack', {params: params})
    },
    updatePack(name: string, _id: string) {
        return instance.put('cards/pack', {cardsPack: {name, _id}})
    },
    deletePack(id: string) {
        return instance.delete('cards/pack', {params: {id}})
    },
    createCard(data: CreateCardType) {
        return instance.post('/cards/card', {card: data})
    },
    getCards(params: GetCardType) {
        return instance.get<GetCardResponseType>(`cards/card`, {params})
    },
    updateCard(payload: UpdateCardType) {
        return instance.put('cards/card', {card: payload})
    },
    deleteCard(cardId: string) {
        return instance.delete(`/cards/card?id=${cardId}`)
    }

}

export const gradeAPI = {
    updateGrade(grade: number, card_id: string) {
        return instance.put('cards/grade', {
            grade,
            card_id
        });
    },
};

