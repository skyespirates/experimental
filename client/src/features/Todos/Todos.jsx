import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "./todoSlice";

const Todos = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div>
      {state.status === "loading" && <p>Loading...</p>}
      {state.status === "succeeded" && (
        <ul>
          {state.data.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      )}
      {state.status === "failed" && <p>{state.error.message}</p>}
    </div>
  );
};

export default Todos;
