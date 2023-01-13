import {CardType} from "./main-reducer";
import {AppDispatch, AppThunk} from "./store";
import {setAppStatusAC} from "./app-reducer";
import {cardsApi, gradeAPI} from "../api/cards-api";
import {getCard} from "../common/utils/getCard";

// types
export type LearnPackInitialStateType = {
    cardList: Array<CardType>
    packName: string
    grade: string
    randomCard: CardType
}
export type LearnPackActionType =
    | ReturnType<typeof setCardListAC>
    | ReturnType<typeof setGradeAC>
    | ReturnType<typeof setCardAC>


const initialState: LearnPackInitialStateType = {
    cardList: [],
    packName: '',
    grade: '1',
    randomCard: {
        _id: 'fake',
        cardsPack_id: '',

        answer: '',
        question: '',
        grade: 0,
        shots: 0,
        type: '',
        rating: 0,
        more_id: '',
        created: '',
        updated: '',
        __v: 0,
        answerImg: '',
        answerVideo: '',
        questionImg: '',
        questionVideo: '',
        user_id: 'fake',
        comments: '',
    },
}

export const learnPackReducer = (state = initialState, action: LearnPackActionType) => {
    switch (action.type) {
        case 'LEARN_PACKS/SET_CARD_LIST':
            return {...state, cardList: action.cardList, packName: action.packName}
        case 'LEARN_PACKS/SET_GRADE':
            return {...state, grade: action.grade}
        case 'LEARN_PACKS/SET_CARD':
            return {...state, randomCard: action.randomCard}
        default:
            return state
    }
}

// actions
const setCardListAC = (cardList: CardType[], packName: string) =>
    ({type: 'LEARN_PACKS/SET_CARD_LIST', cardList, packName} as const)

export const setGradeAC = (grade: string) => ({type: 'LEARN_PACKS/SET_GRADE', grade} as const)

export const setCardAC = (randomCard: CardType) =>
    ({type: 'LEARN_PACKS/SET_CARD', randomCard} as const)

// thunks
export const getRandomCardTC = (packId: string): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const res = await cardsApi.getCards({cardsPack_id: packId, pageCount: 120})
            const RandomCard = getCard(res.data.cards)
            dispatch(setCardListAC(res.data.cards, res.data.packName))
            dispatch(setCardAC(RandomCard))
            dispatch(setAppStatusAC('succeeded'))
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateGradeTC = (packId: string, card_id: string, grade: string): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await gradeAPI.updateGrade(+grade, card_id)
            dispatch(getRandomCardTC(packId))
        } catch (error) {
            console.log(error)
        }
    }
}
