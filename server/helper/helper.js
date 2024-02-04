export const isTodoExists = (todoId, todos) => {
  const isExists = todos.find((todo) => todo.id === todoId);
  if (isExists) {
    return true;
  }
  return false;
};
