import { Outlet } from "react-router-dom";
import HeaderLayoutBar from "./HeaderLayoutBar";
import SideBar from "./SideBar";

const Layout = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeaderLayoutBar />
      <div style={{ display: "flex", flexGrow: 1 }}>
        <SideBar />
        <div
          style={{
            flexGrow: 1,
            height: "calc(100vh - 48px)",
            overflow: "auto",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
