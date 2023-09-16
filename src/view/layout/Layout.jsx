import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ROLES, ROUTE_PATH } from "../../common/constant";
import HeaderLayoutBar from "./HeaderLayoutBar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const defaultSections = [
  {
    label: "Home",
    key: ROUTE_PATH.HOME,
    icon: <HomeOutlined />,
  },
];

const adminSections = [
  {
    label: "Account Management",
    key: ROUTE_PATH.ACCOUNT,
    icon: <UserOutlined />,
  },
];

const Layout = () => {
  const account = useSelector((state) => state.authentication.account);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKey] = useState([]);

  const handleNavigate = (e) => {
    navigate(e.key);
  };

  let items = [...defaultSections];
  if (account?.role === ROLES.ADMIN) {
    items = [...items, ...adminSections];
  }

  useEffect(() => {
    setSelectedKey([location.pathname]);
  }, [location]);

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
        <Menu
          selectedKeys={selectedKeys}
          onClick={handleNavigate}
          style={{ width: 256 }}
          items={items}
        />
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
