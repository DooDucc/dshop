import React, { useEffect, useState } from "react";
import { Table, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders, deleteOrder, updateOrder } from "../redux/order/actions";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Client Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Total Price",
    dataIndex: "price",
  },
  {
    title: "Date",
    dataIndex: "date",
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

const Orders = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.order);

  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  useEffect(() => {
    handleCreateTableData();
  }, [orders]);

  const handleCreateTableData = () => {
    const data = [];
    orders?.forEach((order, index) => {
      data.push({
        key: index + 1,
        name: `${order?.orderby?.firstName} ${order?.orderby?.lastName}`,
        price: order?.totalPrice,
        date: new Date(order?.createdAt).toLocaleString(),
        status: (
          <>
            <select
              className="form-control form-select"
              onChange={(e) =>
                handleUpdateOrderStatus(e.target.value, order?._id)
              }
            >
              <option
                selected={order?.orderStatus === "Not Process"}
                value="Not Process"
              >
                Not Process
              </option>
              <option
                selected={order?.orderStatus === "Processing"}
                value="Processing"
              >
                Processing
              </option>
              <option
                selected={order?.orderStatus === "Cancelled"}
                value="Cancelled"
              >
                Cancelled
              </option>
              <option
                selected={order?.orderStatus === "Delivered"}
                value="Delivered"
              >
                Delivered
              </option>
            </select>
          </>
        ),
        actions: (
          <>
            <Link
              to={`/orders/${order?._id}`}
              className="ms-3 fs-3 text-danger"
            >
              <AiOutlineEye />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(order?._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      });
    });
    setTableData(data);
  };

  const handleSearch = (value) => {
    if (value) {
      const data = [];
      orders?.forEach((order, index) => {
        const clientName = `${order?.orderby?.firstName} ${order?.orderby?.lastName}`;
        if (clientName?.toLowerCase()?.trim()?.includes(value)) {
          data.push({
            key: index + 1,
            name: clientName,
            price: order?.totalPrice,
            date: new Date(order?.createdAt).toLocaleString(),
            status: (
              <>
                <select
                  className="form-control form-select"
                  onChange={(e) =>
                    handleUpdateOrderStatus(e.target.value, order?._id)
                  }
                >
                  <option
                    selected={order?.orderStatus === "Not Process"}
                    value="Not Process"
                  >
                    Not Process
                  </option>
                  <option
                    selected={order?.orderStatus === "Processing"}
                    value="Processing"
                  >
                    Processing
                  </option>
                  <option
                    selected={order?.orderStatus === "Cancelled"}
                    value="Cancelled"
                  >
                    Cancelled
                  </option>
                  <option
                    selected={order?.orderStatus === "Delivered"}
                    value="Delivered"
                  >
                    Delivered
                  </option>
                </select>
              </>
            ),
            actions: (
              <>
                <Link
                  to={`/orders/${order?._id}`}
                  className="ms-3 fs-3 text-danger"
                >
                  <AiOutlineEye />
                </Link>
                <button
                  className="ms-3 fs-3 text-danger bg-transparent border-0"
                  onClick={() => showModal(order?._id)}
                >
                  <AiFillDelete />
                </button>
              </>
            ),
          });
        }
      });
      setTableData(data);
    } else {
      handleCreateTableData();
    }
  };

  const handleDeleteOrder = (id) => {
    dispatch(deleteOrder(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getOrders());
    }, 100);
  };

  const handleUpdateOrderStatus = (value, id) => {
    const data = { id, orderData: value };
    dispatch(updateOrder(data));
  };

  const showModal = (id) => {
    setOpen(true);
    setOrderId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <h3 className="title">Orders</h3>
      <Input.Search
        style={{ margin: "0 0 20px 0", width: 400 }}
        placeholder="Search by client name"
        enterButton
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div>{<Table columns={columns} dataSource={tableData} />}</div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          handleDeleteOrder(orderId);
        }}
        title="Are you sure you want to delete this Order?"
      />
    </div>
  );
};

export default Orders;
