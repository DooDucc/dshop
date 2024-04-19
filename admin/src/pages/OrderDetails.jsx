import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrderByUser } from "../redux/order/actions";

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

  return (
    <div>
      <h3 className="mb-4 title">Order Details</h3>
      <div>
        <Table columns={columns} dataSource={tableData} />
      </div>
    </div>
  );
};

export default OrderDetails;
