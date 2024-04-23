import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BiArrowBack } from "react-icons/bi";
import * as yup from "yup";
import { useFormik } from "formik";
import { createBrand, getBrand, updateBrand } from "../redux/brand/actions";
import { resetState } from "../redux/brand/slice";
import CustomInput from "../components/CustomInput";

const schema = yup.object().shape({
  title: yup.string().required("Brand Name is Required"),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getBrandId = location.pathname.split("/")[2];

  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    updatedBrand,
  } = useSelector((state) => state.brand);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBrandId !== "add") {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateBrand(data));
        formik.resetForm();
      } else {
        dispatch(createBrand(values));
        formik.resetForm();
      }
    },
  });

  useEffect(() => {
    if (getBrandId !== "add") {
      dispatch(getBrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfullly!");
      navigate("/brands");
    }
    if (isSuccess && updatedBrand) {
      toast.success("Brand Updated Successfullly!");
      navigate("/brands");
    }
    if (isError) {
      toast.error("Add Brand Failed!");
      navigate("/brands");
    }
  }, [isSuccess, isError, isLoading]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">
          {getBrandId !== "add" ? "Edit" : "Add"} Brand
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
            name="title"
            onChng={formik.handleChange("title")}
            val={formik.values.title}
            label="Enter Brand"
            id="brand"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 mt-3"
            type="submit"
          >
            {getBrandId !== "add" ? "Edit" : "Add"} Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
