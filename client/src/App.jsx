import Button from "./components/Button";
import Input from "./components/Input";
import Navbar from "./components/Navbar";
import Skeleton from "./components/Skeleton";

import { useState, useEffect } from "react";

const App = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);
  const handleClick = () => {
    if (text) {
      const newTodo = {
        id: Math.random(),
        title: text,
      };
      setTodos((state) => [...state, newTodo]);
      setText("");
    }
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center gap-2 mb-4">
        <Input value={text} onChange={(e) => setText(e.target.value)} />
        <Button onClick={handleClick} className="bg-violet-500 text-white">
          add todo
        </Button>
      </div>
      <ul className="menu menu-lg bg-base-200 w-80 rounded-box mx-auto">
        {loading && [1, 2, 3].map((todo) => <Skeleton key={todo} />)}
        {todos &&
          todos.map((todo) => (
            <li key={todo.id} onClick={() => handleDelete(todo.id)}>
              <a>{todo.title.substring(0, 30)}</a>
            </li>
          ))}
        {error && <p>{error}</p>}
      </ul>
    </div>
  );
};

export default App;
