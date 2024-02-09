import { TrashIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

function ButtonIcon({ id, removeTodo }) {
  return (
    <Button onClick={() => removeTodo(id)} variant="outline" size="icon">
      <TrashIcon className="h-4 w-4" />
    </Button>
  );
}

const ListItem = ({ id, children, handleDelete }) => {
  return (
    <li className="border rounded-md px-2 py-1 w-full flex items-center justify-between">
      {" "}
      <span className="">{children.substring(0, 20)}</span>{" "}
      <ButtonIcon id={id} removeTodo={handleDelete} />{" "}
    </li>
  );
};

export default ListItem;
