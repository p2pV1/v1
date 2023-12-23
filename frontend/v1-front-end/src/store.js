import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./components/redux/user/userSlice";
import roomReducer from "./components/redux/rooms/roomSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
