import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {profileReducer} from "./profile-reducer";
import {mainReducer} from "./main-reducer";
import {authReducer} from "./auth-reducer";
import {appReducer} from "./app-reducer";
import {cardsReducer} from "./cards-reducer";
import {learnPackReducer} from "./learnPack-reducer";



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



export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AnyAction>

// @ts-ignore
window.store = store;

export type DispatchType = ReturnType<typeof createStore>['dispatch']
