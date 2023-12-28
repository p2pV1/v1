import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./components/redux/user/userSlice";
import backendUrlReducer from "./components/redux/backendSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    backendUrl: backendUrlReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

console.log(store.getState());

export default store;
