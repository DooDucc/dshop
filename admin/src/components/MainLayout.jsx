import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { GiTechnoHeart } from "react-icons/gi";
import { Outlet } from "react-router-dom";
import { GrContact } from "react-icons/gr";
import { FaClipboardList } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineWhereToVote } from "react-icons/md";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">
              <GiTechnoHeart className="fs-4" />
            </span>
            <div className="lg-logo-wrap">
              <GiTechnoHeart className="fs-4 me-2" />
              <span className="lg-logo">Tech Store</span>
            </div>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "users",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Users",
            },
            {
              key: "products",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Products",
            },
            {
              key: "brands",
              icon: <SiBrandfolder className="fs-4" />,
              label: "Brands ",
            },
            {
              key: "categories",
              icon: <BiCategoryAlt className="fs-4" />,
              label: "Categories",
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Orders",
            },
            {
              key: "feedbacks",
              icon: <GrContact className="fs-4" />,
              label: "Feedbacks",
            },
            {
              key: "ratings",
              icon: <MdOutlineWhereToVote className="fs-4" />,
              label: "Ratings",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <Menu
              onClick={onClick}
              style={{
                minWidth: 256,
              }}
              items={[
                getItem(
                  `Welcome ${user?.firstName} ${user?.lastName}`,
                  "",
                  <Avatar icon={<UserOutlined />} />,
                  [getItem("Signout", "signout")]
                ),
              ]}
              mode="horizontal"
            />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
