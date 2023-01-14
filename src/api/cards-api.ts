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

export type DeleteCardType = {
    id: string
}

export type GetPackResponseType = {
    cardPacks: Array<PackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
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

export type UpdatedGradeType = {
    _id: string;
    cardsPack_id: string;
    card_id: string;
    user_id: string;
    grade: number;
    shots: number;
    more_id: string;
    created: string;
    updated: string;
    __v: number;
};

export type UpdatedGradeDataType = {
    grade: number;
    card_id: string;
};

export type UpdateGradeResponseType = {
    updatedGrade: UpdatedGradeType;
} & TokenType;

type TokenType = {
    token: string;
    tokenDeathTime: number;
};

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
        return instance.post('/cards/card', { card: data })
    },
    getCards(params: GetCardType) {
       return instance.get<GetCardResponseType>(`cards/card`,{params})
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

