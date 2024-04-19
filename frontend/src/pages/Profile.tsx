import React from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import BreadCrumb from "../components/BreadCrumb"
import Container from "../components/Container"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { updateProfile } from "../redux/auth/actions"
import { useNavigate } from "react-router-dom"

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is Required"),
  lastName: yup.string().required("Last Name is Required"),

  phone: yup.string().required("Phone is Required"),
})

const Profile = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { user } = useAppSelector(state => state.auth)
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: String(user?.firstName),
      lastName: String(user?.lastName),
      phone: String(user?.phone || ""),
    },
    validationSchema: schema,
    onSubmit: values => {
      dispatch(
        // @ts-ignore
        updateProfile({
          body: values,
          navigate,
        }),
      )
      formik.resetForm()
    },
  })

  return (
    <div>
      <BreadCrumb title="Profile" />
      <Container customClass="home-wrapper-2 order-wrapper pb-5 pt-2">
        <div className="row">
          <div className="col-12">
            <h3 className="text-center">Update Profile</h3>
          </div>
          <div className="col-12">
            <form
              onSubmit={formik.handleSubmit}
              action=""
              className="d-flex flex-column gap-10"
            >
              <div>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={user?.email}
                  disabled
                />
              </div>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  name="firstName"
                  onChange={formik.handleChange("firstName")}
                  value={formik.values.firstName}
                />
                <div className="text-danger">
                  {formik.touched.firstName && formik.errors.firstName}
                </div>
              </div>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={formik.handleChange("lastName")}
                  value={formik.values.lastName}
                />
                <div className="text-danger">
                  {formik.touched.lastName && formik.errors.lastName}
                </div>
              </div>
              <div>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Phone number"
                  name="phone"
                  onChange={formik.handleChange("phone")}
                  value={formik.values.phone}
                />
                <div className="text-danger">
                  {formik.touched.phone && formik.errors.phone}
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <div></div>
                <button
                  className="button border-0"
                  style={{ width: "200px" }}
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Profile
