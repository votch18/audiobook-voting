import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import logger from 'redux-logger';
import thunk from "redux-thunk";
import user from "./user/reducer";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["user"],
};

const usersPersistConfig = {
  key: "user",
  stateReconciler: autoMergeLevel2,
  storage,
};

const reducers = combineReducers({
  user: persistReducer(usersPersistConfig, user),
});

const perReducer = persistReducer(persistConfig, reducers);

export const store = createStore(perReducer, applyMiddleware(thunk, logger));
export const persistor = persistStore(store);
