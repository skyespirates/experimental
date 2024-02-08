import { nanoid } from "nanoid";

import config from "../config/config.js";

import { readFile, writeFile } from "../helper/fileSystem.js";
import { isTodoExists } from "../helper/helper.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await readFile(config.FILE_PATH);

    res.status(200).json({ todos });
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};

export const getTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todos = await readFile(config.FILE_PATH);

    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new Error(`there is no todo with id ${id}`);
    }
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
    const todos = await readFile(config.FILE_PATH);
    const newTodos = [...todos, newTodo];
    await writeFile(config.FILE_PATH, newTodos);
    res.status(200).json({ todo: newTodo });
  } catch (error) {
    console.log({ ...error });
    if (error.code === "ENOENT") {
      await writeFile(config.FILE_PATH, [newTodo]);
      res.status(200).json({ todo: newTodo });
      return;
    }
    res.status(422).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;
  try {
    const todos = await readFile(config.FILE_PATH);

    if (!isTodoExists(id, todos)) {
      throw new Error(`there is no todo with id ${id}`);
    }
    const updatedTodos = todos.map((todoItem) =>
      todoItem.id === id ? { ...todoItem, todo } : todoItem
    );

    await writeFile(config.FILE_PATH, updatedTodos);

    res.status(200).json({ id, todo });
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todos = await readFile(config.FILE_PATH);
    if (!isTodoExists(id, todos)) {
      throw new Error(`there is no todo with id ${id}`);
    }
    const deletedTodo = todos.filter((todo) => todo.id !== id);
    await writeFile(config.FILE_PATH, deletedTodo);
    res.status(200).json({ id });
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};
