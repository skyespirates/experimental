import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUsers, fetchUserById } from "./userSlice";

const Users = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.users);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleFetchUserById = (userId) => {
    dispatch(fetchUserById(userId));
  };

  return (
    <div>
      <div>
        <div>
          <input
            type="text"
            placeholder="user id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <button onClick={() => handleFetchUserById(userId)}>
            search user
          </button>
        </div>
        <div>
          {state.userStatus === "loading" && <p>Loading...</p>}
          {state.userStatus === "succeeded" && (
            <table>
              <tr>
                <td>id</td>
                <td>:</td>
                <td>{state.selectedUser.id}</td>
              </tr>
              <tr>
                <td>name</td>
                <td>:</td>
                <td>{state.selectedUser.name}</td>
              </tr>
              <tr>
                <td>username</td>
                <td>:</td>
                <td>{state.selectedUser.username}</td>
              </tr>
              <tr>
                <td>email</td>
                <td>:</td>
                <td>{state.selectedUser.email}</td>
              </tr>
              <tr>
                <td>phone</td>
                <td>:</td>
                <td>{state.selectedUser.phone}</td>
              </tr>
            </table>
          )}
          {state.userStatus === "failed" && <p>{state.userError.message}</p>}
        </div>
      </div>
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
    </div>
  );
};

export default Users;
