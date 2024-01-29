import { configureStore } from "@reduxjs/toolkit";

// reducers
import postReducer from "../features/Posts/postSlice";
import todoReducer from "../features/Todos/todoSlice";
import userReducer from "../features/Users/userSlice";

const store = configureStore({
  reducer: {
    posts: postReducer,
    todos: todoReducer,
    users: userReducer,
  },
});

export default store;
