import {
  HomeOutlined,
  TeamOutlined,
  AliyunOutlined,
  ProfileOutlined,
  ScheduleOutlined,
  FileTextOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ROLES, ROUTE_PATH } from "../../common/constant";

const defaultSections = [
  {
    label: "Home",
    key: ROUTE_PATH.HOME,
    icon: <HomeOutlined />,
  },
  {
    label: "Profile",
    key: ROUTE_PATH.PROFILE,
    icon: <ProfileOutlined />,
  },
];

const adminSections = [
  {
    label: "Account Management",
    key: ROUTE_PATH.ACCOUNT,
    icon: <TeamOutlined />,
  },
  {
    label: "Drug Management",
    key: ROUTE_PATH.DRUG,
    icon: <AliyunOutlined />,
  },
];

const doctorAndCustomerSections = [
  {
    label: "Booking",
    key: ROUTE_PATH.BOOKING,
    icon: <ScheduleOutlined />,
  },
];

const doctorSections = [
  {
    label: "Feedback",
    key: ROUTE_PATH.FEEDBACK,
    icon: <CommentOutlined />,
  },
];

const customerSections = [
  {
    label: "Diagnoses",
    key: ROUTE_PATH.DIAGNOSES,
    icon: <FileTextOutlined />,
  },
];

const SideBar = () => {
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
  if ([ROLES.CUSTOMER, ROLES.DOCTOR].includes(account?.role)) {
    items = [...items, ...doctorAndCustomerSections];
  }
  if (account?.role === ROLES.DOCTOR) {
    items = [...items, ...doctorSections];
  }
  if (account?.role === ROLES.CUSTOMER) {
    items = [...items, ...customerSections];
  }

  useLayoutEffect(() => {
    setSelectedKey([
      Object.values(ROUTE_PATH).find(
        (p) => p !== "/" && location.pathname.includes(p)
      ) ?? location.pathname,
    ]);
  }, [location]);
  return (
    <Menu
      selectedKeys={selectedKeys}
      onClick={handleNavigate}
      style={{ width: 256 }}
      items={items}
    />
  );
};

export default SideBar;
