import React, { useEffect, useState } from "react";
import { Table, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { deleteUser, getUsers } from "../redux/user/actions";
import { blockUser, unblockUser } from "../redux/auth/actions";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone number",
    dataIndex: "phone",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Actions",
    dataIndex: "actions",
  },
];

const Users = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.user);

  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    handleCreateTableData();
  }, [users]);

  const handleBlockCustomer = (value, id) => {
    if (value === "block") {
      dispatch(blockUser(id));
    } else {
      dispatch(unblockUser(id));
    }
  };

  const handleCreateTableData = () => {
    const data = [];
    users?.forEach((user, index) => {
      if (user?.role !== "admin") {
        data.push({
          key: index + 1,
          name: user?.firstName + " " + user?.lastName,
          email: user?.email,
          phone: user?.phone,
          status: (
            <>
              <select
                className="form-control form-select"
                onChange={(e) => handleBlockCustomer(e.target.value, user?._id)}
              >
                <option selected={user?.isBlocked} value="block">
                  Block
                </option>
                <option selected={!user?.isBlocked} value="unblock">
                  Active
                </option>
              </select>
            </>
          ),
          actions: (
            <>
              <Link to={`/users/${user?._id}`} className=" fs-3 text-danger">
                <BiEdit />
              </Link>
              <button
                className="ms-3 fs-3 text-danger bg-transparent border-0"
                onClick={() => showModal(user?._id)}
              >
                <AiFillDelete />
              </button>
            </>
          ),
        });
      }
    });
    setTableData(data);
  };

  const handleSearch = (value) => {
    if (value) {
      const data = [];
      users?.forEach((user, index) => {
        if (user?.role !== "admin") {
          const userName = user?.firstName + " " + user?.lastName;
          if (userName?.toLowerCase()?.trim()?.includes(value)) {
            data.push({
              key: index + 1,
              name: userName,
              email: user?.email,
              phone: user?.phone,
            });
          }
        }
      });
      setTableData(data);
    } else {
      handleCreateTableData();
    }
  };

  const showModal = (e) => {
    setOpen(true);
    setUserId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));

    setOpen(false);
    setTimeout(() => {
      dispatch(getUsers());
    }, 100);
  };

  return (
    <div>
      <h3 className="title">Users</h3>
      <Input.Search
        style={{ margin: "0 0 20px 0", width: 400 }}
        placeholder="Search by user name"
        enterButton
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div>
        <Table columns={columns} dataSource={tableData} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          handleDeleteUser(userId);
        }}
        title="Are you sure you want to delete this User?"
      />
    </div>
  );
};

export default Users;
