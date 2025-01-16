import { persistReducer } from "redux-persist";
import storageEngine from "@/utils/storage-engine";
import { combineReducers } from "@reduxjs/toolkit";
import passwordReducers from "./slices/passwordSlice";

const persistConfig = {
  key: "root",
  storage: storageEngine,
};

const rootReducer = combineReducers({
  "password-manager": passwordReducers,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
