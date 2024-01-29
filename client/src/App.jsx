import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./features/Posts/postSlice";
import { useEffect } from "react";

import Posts from "./features/Posts/Posts";

const App = () => {
  const state = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div>
      {state.status === "loading" && <p>Loading</p>}
      {state.status === "failed" && <p>{state.error.message}</p>}
      {state.status === "succeeded" && <Posts posts={state.data} />}
    </div>
  );
};

export default App;
