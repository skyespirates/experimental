import { configureStore } from "@reduxjs/toolkit";

// reducers
import postReducer from "../features/Posts/postSlice";
import todoReducer from "../features/Todos/todoSlice";
import userReducer from "../features/Users/userSlice";
import todosReducer from "../slices/todoSlice";

const store = configureStore({
  reducer: {
    todo: todosReducer,
    posts: postReducer,
    todos: todoReducer,
    users: userReducer,
  },
});

export default store;
