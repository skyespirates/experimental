import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "./userSlice";

const Users = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <div>
      {state.status === "loading" && <p>Loading...</p>}
      {state.status === "succeeded" && (
        <ul>
          {state.data.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
      {state.status === "failed" && <p>{state.error.message}</p>}
    </div>
  );
};

export default Users;
