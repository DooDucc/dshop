import React, { useEffect, useState } from "react";
import { Table, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import ReactStars from "react-rating-stars-component";
import CustomModal from "../components/CustomModal";
import { deleteRating, getRatings } from "../redux/rating/actions";
import SubRatings from "../components/SubRatings";

const columns = [
  {
    title: "No",
    dataIndex: "key",
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: "Client Name",
    dataIndex: "name",
  },
  {
    title: "Product ID",
    dataIndex: "id",
  },
  {
    title: "Comment",
    dataIndex: "comment",
  },
  {
    title: "Rating",
    dataIndex: "rating",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Actions",
    dataIndex: "actions",
  },
];

const Ratings = () => {
  const dispatch = useDispatch();

  const { ratings } = useSelector((state) => state.rating);

  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [ratingId, setRatingId] = useState("");

  useEffect(() => {
    dispatch(getRatings());
  }, []);

  useEffect(() => {
    handleCreateTableData();
  }, [ratings]);

  const handleCreateTableData = () => {
    const data = [];
    ratings?.forEach((rating, index) => {
      data.push({
        key: index + 1,
        name: `${rating?.postedby?.firstName} ${rating?.postedby?.lastName}`,
        id: rating?.prodId?._id,
        comment: rating?.comment,
        rating: (
          <ReactStars
            count={5}
            size={24}
            activeColor="#ffd700"
            value={+rating?.star}
            edit={false}
          />
        ),
        date: new Date(rating?.createdAt).toLocaleString(),
        actions: (
          <>
            <Link
              to={`/ratings/${rating?._id}`}
              className="ms-3 fs-3 text-danger"
            >
              <AiOutlineEye />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(rating?._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      });
    });
    setTableData(data);
  };

  const expandedRowRender = (rating) => {
    return <SubRatings rating={ratings[rating?.key - 1]} />;
  };

  const handleSearch = (value) => {
    if (value) {
      const data = [];
      ratings?.forEach((rating, index) => {
        const productId = rating?.prodId?._id;
        if (productId?.trim().includes(value)) {
          data.push({
            key: index + 1,
            name: `${rating?.postedby?.firstName} ${rating?.postedby?.lastName}`,
            id: rating?.prodId?._id,
            comment: rating?.comment,
            rating: (
              <ReactStars
                count={5}
                size={24}
                activeColor="#ffd700"
                value={+rating?.star}
                edit={false}
              />
            ),
            date: new Date(rating?.createdAt).toLocaleString(),
            actions: (
              <>
                <Link
                  to={`/ratings/${rating?._id}`}
                  className="ms-3 fs-3 text-danger"
                >
                  <AiOutlineEye />
                </Link>
                <button
                  className="ms-3 fs-3 text-danger bg-transparent border-0"
                  onClick={() => showModal(rating?._id)}
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

  const handleDeleteRating = (id) => {
    dispatch(deleteRating(id));
    setOpen(false);
  };

  const showModal = (id) => {
    setOpen(true);
    setRatingId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <h3 className="title">Ratings</h3>
      <Input.Search
        style={{ margin: "0 0 20px 0", width: 400 }}
        placeholder="Search by Product ID"
        enterButton
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ["0"],
        }}
        dataSource={tableData}
      />
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          handleDeleteRating(ratingId);
        }}
        title="Are you sure you want to delete this Rating?"
      />
    </div>
  );
};

export default Ratings;
