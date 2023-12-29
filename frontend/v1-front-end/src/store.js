import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import userReducer from "./components/redux/user/userSlice";
import backendUrlReducer from "./components/redux/backendSlice";

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  backendUrl: backendUrlReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Persist the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create a persistor
export const persistor = persistStore(store);

export default store;
