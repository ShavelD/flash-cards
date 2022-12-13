import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {profileReducer} from "./profile-reducer";
import {mainReducer} from "./main-reducer";
import {testReducer} from "./test-reducer";
import {authReducer} from "./auth-reducer";
import {appReducer} from "./app-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    profilePage: profileReducer,
    // app: appReducer,
    // auth: authReducer,
    // main: mainReducer,
    // test: testReducer
})

// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент


export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AnyAction>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
