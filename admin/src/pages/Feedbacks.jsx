import React, { useEffect, useState } from "react";
import { Table, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  deleteFeedback,
  getFeedbacks,
  updateFeedbackStatus,
} from "../redux/feedback/actions";
import { resetState } from "../redux/feedback/slice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone",
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

const Feedbacks = () => {
  const dispatch = useDispatch();

  const { feedbacks } = useSelector((state) => state.feedback);

  const [open, setOpen] = useState(false);
  const [feedbackId, setFeedbackId] = useState("");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getFeedbacks());
  }, []);

  useEffect(() => {
    handleCreateTableData();
  }, [feedbacks]);

  const handleCreateTableData = () => {
    const data = [];
    feedbacks?.forEach((feedback, index) => {
      data.push({
        key: index + 1,
        name: feedback?.name,
        email: feedback?.email,
        phone: feedback?.phone,
        status: (
          <>
            <select
              className="form-control form-select"
              onChange={(e) => setFeedbackStatus(e.target.value, feedback?._id)}
            >
              <option
                selected={feedback?.status === "In Progress"}
                value="In Progress"
              >
                In Progress
              </option>
              <option selected={feedback?.status === "Replied"} value="Replied">
                Replied
              </option>
            </select>
          </>
        ),
        actions: (
          <>
            <Link
              className="ms-3 fs-3 text-danger"
              to={`/feedbacks/${feedback?._id}`}
            >
              <AiOutlineEye />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(feedback?._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      });
    });
    setTableData(data);
  };

  const setFeedbackStatus = (value, id) => {
    const data = { id, status: value };
    dispatch(updateFeedbackStatus(data));
  };

  const handleDeleteFeedback = (id) => {
    dispatch(deleteFeedback(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getFeedbacks());
    }, 100);
  };

  const handleSearch = (value) => {
    if (value) {
      const data = [];

      feedbacks?.forEach((feedback, index) => {
        if (feedback?.email?.toLowerCase()?.trim()?.includes(value)) {
          data.push({
            key: index + 1,
            name: feedback?.name,
            email: feedback?.email,
            phone: feedback?.phone,
            status: (
              <>
                <select
                  className="form-control form-select"
                  onChange={(e) =>
                    setFeedbackStatus(e.target.value, feedback?._id)
                  }
                >
                  <option
                    selected={feedback?.status === "Submitted"}
                    value="Submitted"
                  >
                    Submitted
                  </option>
                  <option
                    selected={feedback?.status === "Contacted"}
                    value="Contacted"
                  >
                    Contacted
                  </option>
                  <option
                    selected={feedback?.status === "In Progress"}
                    value="In Progress"
                  >
                    In Progress
                  </option>
                  <option
                    selected={feedback?.status === "Resolved"}
                    value="Resolved"
                  >
                    Resolved
                  </option>
                </select>
              </>
            ),
            actions: (
              <>
                <Link
                  className="ms-3 fs-3 text-danger"
                  to={`/feedbacks/${feedback?._id}`}
                >
                  <AiOutlineEye />
                </Link>
                <button
                  className="ms-3 fs-3 text-danger bg-transparent border-0"
                  onClick={() => showModal(feedback?._id)}
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

  const showModal = (e) => {
    setOpen(true);
    setFeedbackId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <h3 className="mb-2 title">Feedbacks</h3>
      <Input.Search
        style={{ margin: "0 0 10px 0", width: 400 }}
        placeholder="Search by client email"
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
          handleDeleteFeedback(feedbackId);
        }}
        title="Are you sure you want to delete this Feedback?"
      />
    </div>
  );
};

export default Feedbacks;
