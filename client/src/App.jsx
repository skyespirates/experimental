// components
import Input from "./components/Input";
import Button from "./components/Button";

import { getTodos, addTodo, deleteTodo } from "./slices/todoSlice";

import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import List from "./components/List";
import ListItem from "./components/ListItem";

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.todo);
  const [inputTodo, setInputTodo] = useState("");

  const handleAddTodo = () => {
    if (inputTodo) {
      dispatch(addTodo(inputTodo));
      setInputTodo("");
    }
  };

  useEffect(() => {
    dispatch(getTodos());
  }, []);
  return (
    <div>
      <div>
        <Input
          placeholder="example: 'jogging to bukittinggi'"
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
        />
      </div>
      <div>
        <Button onClick={handleAddTodo}>add todo</Button>
      </div>
      {state.status === "loading" && <p>Loading...</p>}
      {state.status === "succeeded" && (
        <List>
          {state.data.map(({ id, todo }) => (
            <ListItem key={id}>
              {todo}{" "}
              <Button onClick={() => dispatch(deleteTodo(id))}>remove</Button>
            </ListItem>
          ))}
        </List>
      )}
      {state.status === "failed" && <p>{state.error.message}</p>}
    </div>
  );
};

export default App;
