import axios from 'axios'
import {CardType, PackType} from "../redux/main-reducer";


export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export enum Result_Code {
    OK = 0,
    ERROR = 1,
    CAPCHA = 10,
}

export type CreatePackType = {
    cardsPack: {
        name: string,
        private?: boolean
    }
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
    deckCover?: string
    private: boolean
}


export type UpdatePackType = {
    cardsPack: {
        _id: string
        name?: string
    }
}

export type DeletePackType = {
    id: string
}

export type CreateCardType = {
    cardsPack_id: any
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
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
}

export type UpdateCardType = {
    card: {
        _id: string
        question?: string
    }
}
export type DeleteCardType = {
    id: string
}

type GetPackResponseType = {
    cardPacks: Array<PackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
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
      return  instance.get<GetPackResponseType>('cards/pack', {params: params})
    },
    updatePack(name: string, _id: string) {
        return instance.put('cards/pack', {cardsPack: {name, _id}})
    },
    deletePack(id: string) {
        return instance.delete('cards/pack', {params: {id}})
    },
    createCard(data: CreateCardType) {
        return instance.post('cards/card', data)
    },
    getCards(data: GetCardType) {
       return instance.get<GetCardResponseType>(`cards/card`,{params: data})
    },
    updateCard(payload: UpdateCardType) {
        return instance.put('cards/card', {card: payload})
    },
    deleteCard(cardId: string) {
        return instance.delete(`/cards/card?id=${cardId}`)
    }

}

