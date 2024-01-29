import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todos/fetchtodos", async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  return data;
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error);
      });
  },
});

export default todoSlice.reducer;
