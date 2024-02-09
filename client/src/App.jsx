import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ListItem from "./components/custom/ListItem";

import { useToast } from "@/components/ui/use-toast";

import { useState, useEffect } from "react";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);

  const { toast } = useToast();

  const addTodo = () => {
    if (inputText) {
      const newTodo = {
        id: Math.random(),
        title: inputText,
      };
      setTodos((state) => [...state, newTodo]);
      toast({
        title: "Added Todo",
        description: "todo has been added successfully",
      });
      setInputText("");
    }
  };

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    toast({
      variant: "destructive",
      title: "Removed Todo",
      description: "todo has been removed successfully",
    });
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((res) => {
        setLoading(true);
        return res.json();
      })
      .then((data) => setTodos(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      <main>
        <div className="flex justify-center gap-4 max-w-96 mx-auto py-4">
          <Input
            placeholder="add todo"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button onClick={addTodo}>Click me</Button>
        </div>
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>{error.message}</p>}
          {todos && (
            <ul className="flex flex-col items-center w-[320px] mx-auto gap-2">
              {todos.map((todo) => (
                <ListItem key={todo.id} id={todo.id} handleDelete={removeTodo}>
                  {todo.title}
                </ListItem>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Toaster />
    </div>
  );
}
