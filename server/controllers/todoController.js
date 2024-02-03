import fs from "fs/promises";
import { nanoid } from "nanoid";

export const getTodos = async (req, res) => {
  try {
    const todos = await fs.readFile("data.txt", "utf-8");
    res.status(200).json({ todos });
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};

export const getTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todos = await fs.readFile("data.txt", "utf-8");
    const todo = JSON.parse(todos).find((todo) => todo.id === id);
    res.status(200).json({ todo });
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};

export const addTodo = async (req, res) => {
  const { todo } = req.body;
  const newTodo = {
    id: nanoid(),
    todo,
    completed: false,
  };
  try {
    const todos = await fs.readFile("data.txt", "utf-8");
    const Todos = JSON.parse(todos);
    const newTodos = [...Todos, newTodo];
    await fs.writeFile("data.txt", JSON.stringify(newTodos), "utf-8");
    res.status(200).json({ message: "todo added successfully" });
  } catch (error) {
    if (error.code === "ENOENT") {
      const temp = [].push(newTodo);
      const todo = JSON.stringify([newTodo]);
      await fs.writeFile("data.txt", todo, "utf-8");
      res.status(200).json({ message: "todo created successfully" });
      return;
    }
    res.status(422).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;
  try {
    const todos = await fs.readFile("data.txt", "utf-8");
    const Todos = JSON.parse(todos);
    const updateTodos = Todos.map((todoItem) =>
      todo === id ? { ...todoItem, todo } : todoItem
    );
    const UpdateTodos = JSON.stringify(updateTodos);

    await fs.writeFile("data.txt", UpdateTodos, "utf-8");

    res.status(200).json({ message: "todo updated successfully" });
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todos = await fs.readFile("data.txt", "utf-8");
    const Todos = JSON.parse(todos);
    const deleteTodo = Todos.filter((todo) => todo.id !== id);
    const DeletedTodo = JSON.stringify(deleteTodo);
    await fs.writeFile("data.txt", DeletedTodo, "utf-8");
    res.status(200).json({ message: "todo deleted successfully" });
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};
