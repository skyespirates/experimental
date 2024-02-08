import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/index";

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  const { data } = await api.get("/");
  return data.todos;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const response = await api("/", {
    method: "POST",
    data: {
      todo,
    },
  });
  if (response.status === 200) {
    return response.data.todo;
  } else {
    return null;
  }
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (id, todo) => {
    const response = await api("/", {
      method: "PUT",
      data: {
        params: {
          id,
        },
        todo,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      return 0;
    }
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  const response = await api(`/${id}`, {
    method: "DELETE",
    params: {
      id,
    },
  });
  if (response.status === 200) {
    return response.data;
  } else {
    return null;
  }
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
      .addCase(getTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.messae;
      })
      .addCase(updateTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id, todo } = action.payload;
        const existingTodo = state.data.find((todo) => todo.id === id);
        if (existingTodo) {
          existingTodo.todo = todo;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id } = action.payload;
        state.data = state.data.filter((todo) => todo.id !== id);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default todoSlice.reducer;
