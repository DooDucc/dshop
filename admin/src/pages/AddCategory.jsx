import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { BiArrowBack } from "react-icons/bi";
import { useFormik } from "formik";
import {
  createCategory,
  getCategory,
  updateCategory,
} from "../redux/category/actions";
import { resetState } from "../redux/category/slice";
import CustomInput from "../components/CustomInput";

const schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getCategoryId = location.pathname.split("/")[2];

  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    categoryName,
    updatedCategory,
  } = useSelector((state) => state.category);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCategoryId !== "add") {
        const data = { id: getCategoryId, pCatData: values };
        dispatch(updateCategory(data));
      } else {
        dispatch(createCategory(values));
      }
      formik.resetForm();
      dispatch(resetState());
    },
  });

  useEffect(() => {
    if (getCategoryId !== "add") {
      dispatch(getCategory(getCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getCategoryId]);

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category Added Successfullly!");
      navigate("/categories");
    }
    if (isSuccess && updatedCategory) {
      toast.success("Category Updated Successfullly!");
      navigate("/categories");
    }
    if (isError) {
      toast.error("Add Category Failed!");
      navigate("/categories");
    }
  }, [isSuccess, isError, isLoading]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4  title">
          {getCategoryId !== "add" ? "Edit" : "Add"} Category
        </h3>
        <button
          className="bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Go Back
        </button>
      </div>

      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product Category"
            onChng={formik.handleChange("title")}
            val={formik.values.title}
            id="brand"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getCategoryId !== "add" ? "Edit" : "Add"} Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
