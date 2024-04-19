import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { getUser, updateUser } from "../redux/user/actions";
import CustomInput from "../components/CustomInput";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is Required"),
  lastName: yup.string().required("Last Name is Required"),
  role: yup.string().required("Role is Required"),
});

const UpdateUser = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getUserId = location.pathname.split("/")[2];

  const { user } = useSelector((state) => state.user);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      role: user?.role || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: getUserId, userData: values };
      dispatch(
        updateUser({
          body: data,
          navigate,
        })
      );
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (getUserId) {
      dispatch(getUser(getUserId));
    }
  }, [getUserId]);

  return (
    <div>
      <h3 className="mb-2 title">Edit User</h3>
      <div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column"
        >
          <div>
            <CustomInput
              type="text"
              id="firstName"
              name="firstName"
              onChng={formik.handleChange("firstName")}
              val={formik.values.firstName}
              label="Enter First Name"
            />
            <div className="error">
              {formik.touched.firstName && formik.errors.firstName}
            </div>
          </div>
          <div>
            <CustomInput
              type="text"
              id="lastName"
              name="lastName"
              onChng={formik.handleChange("lastName")}
              val={formik.values.lastName}
              label="Enter Last Name"
            />
            <div className="error">
              {formik.touched.lastName && formik.errors.lastName}
            </div>
          </div>
          <div>
            <CustomInput label="Email" val={user?.email} disabled={true} />
          </div>
          <div>
            <CustomInput val={user?.phone} label="Phone" disabled={true} />
          </div>
          <div className="mt-3">
            <select
              name="role"
              onChange={formik.handleChange("role")}
              value={formik.values.role}
              className="form-control py-3"
              id="role"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <div className="error">
              {formik.touched.role && formik.errors.role}
            </div>
          </div>
          <button
            className="btn btn-success border-0 rounded-3 mt-3"
            type="submit"
          >
            Edit User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
