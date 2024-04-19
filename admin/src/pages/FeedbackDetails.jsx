import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { getFeedback, updateFeedback } from "../redux/feedback/actions";
import { resetState } from "../redux/feedback/slice";

const FeedbackDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFeedbackId = location.pathname.split("/")[2];

  const { currentFeedback } = useSelector((state) => state.feedback);

  useEffect(() => {
    dispatch(getFeedback(getFeedbackId));
  }, [getFeedbackId]);

  const goBack = () => {
    navigate(-1);
  };

  const setFeedbackStatus = (value, id) => {
    const data = { id, feedbackData: value };
    dispatch(updateFeedback(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getFeedback(getFeedbackId));
    }, 100);
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
                selected={currentFeedback?.status === "Submitted"}
                value="Submitted"
              >
                Submitted
              </option>
              <option
                selected={currentFeedback?.status === "Contacted"}
                value="Contacted"
              >
                Contacted
              </option>
              <option
                selected={currentFeedback?.status === "In Progress"}
                value="In Progress"
              >
                In Progress
              </option>
              <option
                selected={currentFeedback?.status === "Resolved"}
                value="Resolved"
              >
                Resolved
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetails;
