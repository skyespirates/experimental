import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./postSlice";
import { useEffect } from "react";

const Posts = () => {
  const state = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div>
      {state.status === "loading" && <p>Loading</p>}
      {state.status === "succeeded" && (
        <ul>
          {state.data.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
      {state.status === "failed" && <p>{state.error.message}</p>}
    </div>
  );
};

export default Posts;
