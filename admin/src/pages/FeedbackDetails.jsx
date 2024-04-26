import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import ReactQuill from "react-quill";
import {
  getFeedback,
  replyFeedback,
  updateFeedbackStatus,
} from "../redux/feedback/actions";
import { resetState } from "../redux/feedback/slice";
import "react-quill/dist/quill.snow.css";

const FeedbackDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFeedbackId = location.pathname.split("/")[2];

  const { currentFeedback } = useSelector((state) => state.feedback);

  const [reply, setReply] = useState("");

  useEffect(() => {
    dispatch(getFeedback(getFeedbackId));
  }, [getFeedbackId]);

  const goBack = () => {
    navigate(-1);
  };

  const setFeedbackStatus = (value, id) => {
    const data = { id, status: value };
    dispatch(updateFeedbackStatus(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getFeedback(getFeedbackId));
    }, 100);
  };

  const handleSubmitReply = () => {
    dispatch(replyFeedback({ body: { id: getFeedbackId, reply }, navigate }));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="title">Feedback Details</h3>
        <button
          className="bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Go Back
        </button>
      </div>
      <div className="mt-2 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Name:</h6>
          <p className="mb-0">{currentFeedback?.name}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Mobile:</h6>
          <p className="mb-0">
            <a href={`tel:+94${currentFeedback?.phone}`}>
              {currentFeedback?.phone}
            </a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Email:</h6>
          <p className="mb-0">
            <a href={`mailto:{currentFeedback?.email}`}>
              {currentFeedback?.email}
            </a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Comment:</h6>
          <p className="mb-0">{currentFeedback?.comment}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status:</h6>
          <div>
            <select
              className="form-control form-select"
              onChange={(e) => setFeedbackStatus(e.target.value, getFeedbackId)}
            >
              <option
                selected={currentFeedback?.status === "In Progress"}
                value="In Progress"
              >
                In Progress
              </option>
              <option
                selected={currentFeedback?.status === "Replied"}
                value="Replied"
              >
                Replied
              </option>
            </select>
          </div>
        </div>
        {currentFeedback?.status === "Replied" && (
          <div className="d-flex gap-3">
            <h6 className="mb-0">Reply:</h6>
            <p
              className="mb-0"
              dangerouslySetInnerHTML={{ __html: currentFeedback?.reply }}
            ></p>
          </div>
        )}
        <div>
          <h6 className="mb-2">Add New Reply:</h6>
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

export default FeedbackDetails;
