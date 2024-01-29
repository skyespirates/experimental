import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux";
import store from "./app/store.js";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Todos from "./features/Todos/Todos.jsx";
import Users from "./features/Users/Users.jsx";
import LayoutComponent from "./components/Layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutComponent />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "todos",
        element: <Todos />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
