import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteSubRating } from "../redux/rating/actions";

const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Client Name",
    dataIndex: "name",
  },
  {
    title: "Reply",
    dataIndex: "reply",
  },
  {
    title: "Actions",
    dataIndex: "actions",
  },
];

const SubRatings = ({ rating }) => {
  const dispatch = useDispatch();

  const [tableData, setTableData] = useState([]);

  const handleDeleteSubRating = (subRatingId) => {
    dispatch(deleteSubRating({ id: rating?._id, subRatingId }));
  };

  useEffect(() => {
    const data = [];
    rating?.subRating?.forEach((subRating, index) => {
      data.push({
        key: index + 1,
        name: `${subRating?.user?.firstName} ${subRating?.user?.lastName}`,
        reply: subRating?.comment,
        actions: (
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => handleDeleteSubRating(subRating?._id)}
          >
            <AiFillDelete />
          </button>
        ),
      });
    });
    setTableData(data);
  }, [rating]);

  return <Table columns={columns} dataSource={tableData} pagination={false} />;
};

export default SubRatings;
