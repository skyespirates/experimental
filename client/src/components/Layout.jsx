import { Outlet } from "react-router-dom";
import Nav from "../features/Nav/Nav";

const Layout = () => {
  return (
    <div>
      <Nav />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
