import {packsAPI, PacksResponseType} from "../api/packs-api";
import {AppThunk} from "../redux/store";

export enum SORT_PACKS {
    NOT_SORT = '',
}

const initialState = {
    cardPacks: [
        {
            _id: '',
            user_name: '',
            user_id: '',
            __v: 0,
            updated: '',
            type: '',
            shots: 0,
            rating: 0,
            private: false,
            path: '',
            name: '',
            more_id: '',
            grade: 0,
            deckCover: '',
            created: '',
            cardsCount: 0,
        },
    ],
    cardPacksTotalCount: 0,
    maxCardsCount: 100,
    minCardsCount: 0,
    page: 1,
    pageCount: 5,
    token: '',
    tokenDeathTime: 0,
    sortPacks: SORT_PACKS.NOT_SORT,
    filterMinCardsCount: 0,
    filterMaxCardsCount: 100,
    filterPackName: '',
    isMy: false,
    currentPackId: '',
    currentPackName: '',
    currentPackCover: ''
}

export const packsReducer = (state: InitialStateType = initialState, action: PacksActionsType): InitialStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS':
            return {...state, ...action.payload}
        default:
            return state
    }
}
//actions
export const setPacksAC = (data: PacksResponseType) =>
    ({type: 'PACKS/SET-PACKS', payload: data} as const)

//thunk
export const fetchPacksTC = (): AppThunk =>
    async (dispatch, getState) => {
        try {
            const isMy = getState().packs.isMy
            const params = {
                packName: getState().packs.filterPackName,
                min: getState().packs.filterMinCardsCount,
                max: getState().packs.filterMaxCardsCount,
                sortPacks: getState().packs.sortPacks,
                page: getState().packs.page,
                pageCount: getState().packs.pageCount,
                user_id: isMy ? getState().profile._id : '',
            }
            const response = await packsAPI.getPacks(params)
            dispatch(setPacksAC(response.data))

        } catch (e) {

        }
    }


export const showItemsPerPageTC = (pageCount: number): AppThunk =>
    async (dispatch, getState) => {
        //debugger
        try {
            const isMy = getState().packs.isMy
            const params = {
                packName: getState().packs.filterPackName,
                min: getState().packs.filterMinCardsCount,
                max: getState().packs.filterMaxCardsCount,
                sortPacks: getState().packs.sortPacks,
                page: getState().packs.page,
                pageCount: pageCount,
                user_id: isMy ? getState().profile._id : '',
            }
            const res = await packsAPI.getPacks(params)
            dispatch(setPacksAC(res.data))

        } catch (e) {

        }
    }

export const getPacksTC =
    (page: number): AppThunk =>
        async (dispatch, getState) => {
            // debugger
            try {
                const isMy = getState().packs.isMy
                const params = {
                    packName: getState().packs.filterPackName,
                    min: getState().packs.filterMinCardsCount,
                    max: getState().packs.filterMaxCardsCount,
                    sortPacks: getState().packs.sortPacks,
                    page: page,
                    pageCount: getState().packs.pageCount,
                    user_id: isMy ? getState().profile._id : '',
                }
                const res = await packsAPI.getPacks(params)
                dispatch(setPacksAC(res.data))
            } catch (error) {

            } finally {

            }
        }

//type
type InitialStateType = typeof initialState
export type PacksActionsType = SetPacksAC
export type SetPacksAC = ReturnType<typeof setPacksAC>