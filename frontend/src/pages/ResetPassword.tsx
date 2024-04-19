import React from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { useAppDispatch } from "../redux/store"
import Container from "../components/Container"
import Input from "../components/Input"
import { useLocation, useNavigate } from "react-router-dom"
import { resetPassword } from "../redux/auth/actions"

const schema = yup.object().shape({
  password: yup.string().required("New Password is Required"),
  cfpassword: yup
    .string()
    .required("Confirm password is Required")
    .oneOf(
      [yup.ref("password"), ""],
      "Confirm password must match with new password",
    ),
})

const ResetPassword = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const getToken = location.pathname.split("/")[2]

  const formik = useFormik({
    initialValues: {
      password: "",
      cfpassword: "",
    },
    validationSchema: schema,
    onSubmit: values => {
      dispatch(
        // @ts-ignore
        resetPassword({
          body: {
            token: getToken,
            password: values.password,
          },
          navigate,
        }),
      )
    },
  })

  return (
    <Container customClass="home-wrapper-2 login-wrapper py-5">
      <div className="row">
        <div className="col-12">
          <div className="auth-card">
            <h3 className="text-center">Reset Password</h3>
            <form
              onSubmit={formik.handleSubmit}
              action=""
              className="d-flex flex-column gap-15"
            >
              <Input
                type="password"
                name="password"
                placeholder="New Password"
                onChng={formik.handleChange("password")}
                val={formik.values.password}
              />
              <div className="text-danger">
                {formik.touched.password && formik.errors.password}
              </div>
              <Input
                type="password"
                name="cfpassword"
                placeholder="Confirm Password"
                onChng={formik.handleChange("cfpassword")}
                val={formik.values.cfpassword}
              />
              <div className="text-danger">
                {formik.touched.cfpassword && formik.errors.cfpassword}
              </div>
              <div>
                <div className="d-flex justify-content-center align-items-center gap-15">
                  <button className="button border-0" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ResetPassword
