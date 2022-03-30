import { createStore, applyMiddleware, Store, Reducer } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import { RootReducer } from "./reducers";
import rootSagas from "./sagas";
import { api, initAPI } from "./api";

// ===========================================================================================
// PERSIST CONFIG SETUP
// ===========================================================================================

const persistConfig = {
    key: "root",
    whitelist: ["theme", "location"],
    timeout: 0,
    storage: AsyncStorage,
};

// ===========================================================================================
// MIDDLEWARE SETUP
// ===========================================================================================

const sagaMiddleware = createSagaMiddleware({ context: { api } });

const persistedReducer: Reducer = persistReducer(persistConfig, RootReducer);

const middlewares = [sagaMiddleware];

export type RootState = ReturnType<typeof RootReducer>;

export type Payload<T> = [{ payload: T }];

if (__DEV__) {
    const createDebugger = require("redux-flipper").default;
    middlewares.push(createDebugger());
}
// ===========================================================================================
// STORE CREATION
// ===========================================================================================

const store: Store = createStore(persistedReducer, {}, applyMiddleware(...middlewares));

initAPI(store);

sagaMiddleware.run(rootSagas);

export const persistor = persistStore(store);

export default store;