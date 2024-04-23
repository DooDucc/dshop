import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { getOrderByUser, updateOrder } from "../redux/order/actions";

const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
];

const OrderDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = location.pathname.split("/")[2];

  const { orderByUser } = useSelector((state) => state.order);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getOrderByUser(userId));
  }, []);

  useEffect(() => {
    const data = [];

    orderByUser?.products?.forEach((product, index) => {
      data.push({
        key: index + 1,
        name: product?.productDetails?.title,
        brand: product?.productDetails?.brand,
        quantity: product?.quantity,
        price: product?.productDetails?.price,
      });
    });

    setTableData(data);
  }, [orderByUser?.products]);

  const handleUpdateOrderStatus = (value, id) => {
    const data = { id, orderData: value };
    dispatch(updateOrder(data));
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">Order Details</h3>
        <button
          className="bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Go Back
        </button>
      </div>
      <div className="mt-2 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div>
          <h6 className="mb-0">Shipping Info:</h6>
          <ul>
            <li>Client name: {orderByUser?.paymentIntent?.name}</li>
            <li>Email: {orderByUser?.paymentIntent?.email}</li>
            <li>Phone: {orderByUser?.paymentIntent?.phone}</li>
            <li>Address: {orderByUser?.paymentIntent?.address}</li>
            <li>
              Payment Method:{" "}
              <span style={{ textTransform: "capitalize" }}>
                {orderByUser?.paymentIntent?.paymentMethod}
              </span>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="mb-0">Products:</h6>
          <Table
            columns={columns}
            dataSource={tableData}
            bordered
            pagination={false}
          />
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Total Price:</h6>
          <p className="mb-0">${orderByUser?.totalPrice}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status:</h6>
          <select
            className="form-control form-select"
            style={{ width: 200 }}
            onChange={(e) =>
              handleUpdateOrderStatus(e.target.value, orderByUser?._id)
            }
          >
            <option
              selected={orderByUser?.orderStatus === "Not Process"}
              value="Not Process"
            >
              Not Process
            </option>
            <option
              selected={orderByUser?.orderStatus === "Processing"}
              value="Processing"
            >
              Processing
            </option>
            <option
              selected={orderByUser?.orderStatus === "Cancelled"}
              value="Cancelled"
            >
              Cancelled
            </option>
            <option
              selected={orderByUser?.orderStatus === "Delivered"}
              value="Delivered"
            >
              Delivered
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
