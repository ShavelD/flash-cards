import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {ProfileActionType, profileReducer} from "./profile-reducer";
import {MainActionType, mainReducer} from "./main-reducer";
import {AuthActionType, authReducer} from "./auth-reducer";
import {AppActionsType, appReducer} from "./app-reducer";
import {CardsActionsType, cardsReducer} from "./cards-reducer";
import {LearnPackActionType, learnPackReducer} from "./learnPack-reducer";



const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    main: mainReducer,
    cars: cardsReducer,
    learnPack: learnPackReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

export type AppRootActionType = AppActionsType
| AuthActionType
|ProfileActionType
|MainActionType
|CardsActionsType
|LearnPackActionType






export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AnyAction>

// @ts-ignore
window.store = store;

export type DispatchType = ReturnType<typeof createStore>['dispatch']
