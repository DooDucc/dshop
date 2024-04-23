import React, { useEffect, useState } from "react";
import { Table, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { BiArrowBack } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import ReactQuill from "react-quill";
import { getRating, replyRating } from "../redux/rating/actions";
import "react-quill/dist/quill.snow.css";

const columnsSubRating = [
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

const columnsProduct = [
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Sold",
    dataIndex: "sold",
  },
];

const Rating = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getRatingId = location.pathname.split("/")[2];

  const [subRatingTableData, setSubRatingTableData] = useState([]);
  const [productTableData, setProductTableData] = useState([]);
  const [reply, setReply] = useState("");

  const { currentRating } = useSelector((state) => state.rating);

  useEffect(() => {
    dispatch(getRating(getRatingId));
  }, [getRatingId]);

  useEffect(() => {
    const dataSubRating = [];
    const dataProduct = [
      {
        title: currentRating?.prodId?.title,
        brand: currentRating?.prodId?.brand,
        category: currentRating?.prodId?.category,
        price: `$${currentRating?.prodId?.price}`,
        quantity: `${currentRating?.prodId?.quantity}`,
        sold: `${currentRating?.prodId?.sold}`,
      },
    ];
    currentRating?.subRating?.forEach((subRating, index) => {
      dataSubRating.push({
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
    setSubRatingTableData(dataSubRating);
    setProductTableData(dataProduct);
  }, [currentRating]);

  const handleDeleteSubRating = (subRatingId) => {
    dispatch(deleteSubRating({ id: currentRating?._id, subRatingId }));
  };

  const handleSubmitReply = () => {
    if (reply) {
      dispatch(
        replyRating({
          body: { id: currentRating?._id, comment: reply },
          ratingId: getRatingId,
        })
      );
      setReply("");
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="title">Rating Details</h3>
        <button
          className="bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Go Back
        </button>
      </div>
      <div className="mt-2 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">ID:</h6>
          <p className="mb-0">{currentRating?._id}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Client name:</h6>
          <p className="mb-0">{`${currentRating?.postedby?.firstName} ${currentRating?.postedby?.lastName}`}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Comment:</h6>
          <p className="mb-0">{currentRating?.comment}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Star:</h6>
          <ReactStars
            count={5}
            size={24}
            activeColor="#ffd700"
            value={+currentRating?.star}
            edit={false}
          />
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Date:</h6>
          <p className="mb-0">
            {new Date(currentRating?.createdAt).toLocaleString()}
          </p>
        </div>
        <div>
          <h6 className="mb-2">Replies:</h6>
          <Table
            columns={columnsSubRating}
            dataSource={subRatingTableData}
            pagination={false}
            scroll={{
              y: 240,
            }}
            bordered
          />
        </div>
        <div>
          <h6 className="mb-2">Product:</h6>
          <Table
            columns={columnsProduct}
            dataSource={productTableData}
            pagination={false}
            bordered
          />
        </div>
        <div>
          <h6 className="mb-2">Add Reply:</h6>
          {/* <textarea
            className="w-100 form-control"
            cols={30}
            rows={4}
            placeholder="Type something..."
            onChange={(e) => {
              setReply(e.target.value);
            }}
            value={reply || ""}
          ></textarea> */}
          <ReactQuill theme="snow" onChange={setReply} value={reply || ""} />
          <div className="d-flex align-items-center justify-content-between">
            <div></div>
            <button
              className="btn btn-primary mt-3"
              onClick={handleSubmitReply}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
