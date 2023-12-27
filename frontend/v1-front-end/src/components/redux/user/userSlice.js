// userSlice.js inside your features/user directory
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const backendUrl = useSelector((state) => state.backendUrl);

const initialState = {
  userEmail: null,
  isLoading: false,
  error: null,
};

// Thunk for handling user login
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password, backendUrl }, { rejectWithValue }) => {
    console.log("backendUrl user slice", backendUrl);
    try {
      const response = await fetch(`${backendUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password: password }),
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not log in");
      return {
        token: data.data.token, // Adjust based on your API response
        email: email, // Email from the component
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Reducers for other user actions can be added here
    signOut: (state) => {
      state.userEmail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Payload received:", action.payload);
        state.userEmail = action.payload.email;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

// Export actions and reducer
export const { signOut } = userSlice.actions;
export default userSlice.reducer;
