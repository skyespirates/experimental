import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users?_limit=5"
  );
  return data;
});

export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (userId) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    return response.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    selectedUser: null,
    userStatus: "idle",
    userError: null,
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.userStatus = "succeeded";
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.userStatus = "failed";
        state.userError = action.error;
      });
  },
});

export default userSlice.reducer;
