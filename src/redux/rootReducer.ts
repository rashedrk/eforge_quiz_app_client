import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";
import authReducer from "./features/auth/authSlice";

const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["accessToken", "user"],
};

const rootPersistConfig = {
    key: "root",
    storage,
    blacklist: [baseApi.reducerPath],
};

const rootReducerCombined = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistReducer(authPersistConfig, authReducer),
});

export const reducer = persistReducer(rootPersistConfig, rootReducerCombined);