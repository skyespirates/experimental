import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="/"
        >
          home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="/posts"
        >
          posts
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="/todos"
        >
          todos
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="/users"
        >
          users
        </NavLink>
      </ul>
    </nav>
  );
};

export default Nav;
