import {cardsApi, GetPackResponseType, GetPackType} from "../api/cards-api";
import { AppThunk} from "./store";
import {setPacksAC} from "./main-reducer";

const initialState: GetPackResponseType = {} as GetPackResponseType
export type InitialStateType = typeof initialState


export type PacksActionsType = ReturnType<typeof getPacksAC>

export const packsReducer = (state: InitialStateType = initialState, action: PacksActionsType) :InitialStateType=> {
    switch (action.type) {
        case 'packs/SET_PACKS':
            return {
                ...action.packs,
                cardPacks: action.packs.cardPacks.map(({ _id, name, user_name, updated, cardsCount, user_id, created , shots}) => ({
                    _id,
                    name,
                    cardsCount,
                    updated,
                    user_name,
                    user_id,
                    created,
                    shots
                })),
            }
        default:
            return state
    }

}

const getPacksAC = (packs: GetPackResponseType) => {
    return{
        type:'packs/SET_PACKS',
        packs
    }as const
}

export const getPacksTC = (params: GetPackType): AppThunk =>
    async dispatch => {
        // debugger
        try {
            const res = await cardsApi.getPacks(params)
            dispatch(setPacksAC(res.data.cardPacks))
            //debugger
        } catch (error) {
            console.log(error)
        }
    }