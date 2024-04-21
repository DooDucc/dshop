import { React, useEffect } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { getBrands } from "../redux/brand/actions";
import { getCategories } from "../redux/category/actions";
import {
  createProduct,
  getProduct,
  updateProduct,
} from "../redux/product/actions";
import { resetState as resetProductState } from "../redux/product/slice";
import { resetState as resetUploadState } from "../redux/upload/slice";
import { deleteImg, uploadImg } from "../redux/upload/actions";
import CustomInput from "../components/CustomInput";
import "react-quill/dist/quill.snow.css";

const schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  quantity: yup.number().required("Quantity is Required"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getProductId = location.pathname.split("/")[2];

  const { brands } = useSelector((state) => state.brand);
  const { categories } = useSelector((state) => state.category);
  const { images } = useSelector((state) => state.upload);
  const { productDetail } = useSelector((state) => state.product);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: productDetail?.title || "",
      description: productDetail?.description || "",
      price: productDetail?.price || "",
      brand: productDetail?.brand || "",
      category: productDetail?.category || "",
      tags: productDetail?.tags?.join("") || "",
      quantity: productDetail?.quantity || "",
      images:
        getProductId !== "add"
          ? productDetail?.images?.map((image) => ({
              public_id: image.public_id,
              url: image.url,
            }))
          : images?.map((image) => ({
              public_id: image.public_id,
              url: image.url,
            })),
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getProductId !== "add") {
        const data = {
          id: getProductId,
          ...values,
        };
        dispatch(updateProduct({ body: data, navigate }));
      } else {
        dispatch(createProduct({ body: values, navigate }));
      }
      formik.resetForm();
      dispatch(resetProductState());
      dispatch(resetUploadState());
    },
  });

  useEffect(() => {
    if (getProductId !== "add") {
      dispatch(getProduct(getProductId));
    } else {
      dispatch(resetProductState());
      dispatch(resetUploadState());
    }
  }, [getProductId]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, []);

  // useEffect(() => {
  //   console.log(images);

  //   formik.values.images = images?.map((image) => ({
  //     public_id: image.public_id,
  //     url: image.url,
  //   }));
  // }, [images]);

  const handleDeleteImage = (id) => {
    dispatch(deleteImg(id));
  };

  return (
    <div>
      <h3 className="mb-2 title">
        {getProductId !== "add" ? "Edit" : "Add"} Product
      </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3"
        >
          <div>
            <CustomInput
              type="text"
              label="Enter Product Title"
              name="title"
              onChng={formik.handleChange("title")}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
          </div>
          <div>
            <textarea
              className="form-control"
              placeholder="Enter description"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
              rows={3}
            ></textarea>
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>
          </div>
          <div>
            <CustomInput
              type="number"
              label="Enter Product Price"
              name="price"
              onChng={formik.handleChange("price")}
              val={formik.values.price}
            />
            <div className="error">
              {formik.touched.price && formik.errors.price}
            </div>
          </div>
          <div>
            <select
              name="brand"
              onChange={formik.handleChange("brand")}
              value={formik.values.brand}
              className="form-control py-3"
              id=""
            >
              <option value="">Select Brand</option>
              {brands?.map((i, j) => {
                return (
                  <option key={j} value={i.title}>
                    {i.title}
                  </option>
                );
              })}
            </select>
            <div className="error">
              {formik.touched.brand && formik.errors.brand}
            </div>
          </div>
          <div>
            <select
              name="category"
              onChange={formik.handleChange("category")}
              value={formik.values.category}
              className="form-control py-3"
              id=""
            >
              <option value="">Select Category</option>
              {categories?.map((i, j) => {
                return (
                  <option key={j} value={i.title}>
                    {i.title}
                  </option>
                );
              })}
            </select>
            <div className="error">
              {formik.touched.category && formik.errors.category}
            </div>
          </div>
          <div>
            <select
              name="tags"
              onChange={formik.handleChange("tags")}
              value={formik.values.tags}
              className="form-control py-3"
              id=""
            >
              <option value="" disabled>
                Select Tag
              </option>
              <option value="featured">Featured</option>
              <option value="popular">Popular</option>
              <option value="special">Special</option>
            </select>
            <div className="error">
              {formik.touched.tags && formik.errors.tags}
            </div>
          </div>
          <div>
            <CustomInput
              type="number"
              label="Enter Product Quantity"
              name="quantity"
              onChng={formik.handleChange("quantity")}
              val={formik.values.quantity}
            />
            <div className="error">
              {formik.touched.quantity && formik.errors.quantity}
            </div>
          </div>
          <Dropzone
            onDrop={(acceptedFiles) => {
              dispatch(uploadImg(acceptedFiles));
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div className="bg-white border-1 p-5 text-center">
                <section style={{ cursor: "pointer" }}>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className="m-0">
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              </div>
            )}
          </Dropzone>
          <div className="showimages d-flex flex-wrap gap-3">
            {formik?.values?.images?.map((image, index) => {
              return (
                <div className=" position-relative" key={index}>
                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteImage(image.public_id);
                    }}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={image.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button className="btn btn-success border-0 rounded-3" type="submit">
            {getProductId !== "add" ? "Edit" : "Add"} Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
