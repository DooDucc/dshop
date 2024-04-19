import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as yup from "yup"
import { useAppDispatch } from "../redux/store"
import Container from "../components/Container"
import Input from "../components/Input"
import { forgotPasswordToken } from "../redux/auth/actions"

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
})

const ForgotPassword = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: values => {
      // @ts-ignore
      dispatch(forgotPasswordToken(values.email))
    },
  })

  return (
    <Container customClass="home-wrapper-2 forgot-password-wrapper py-5">
      <div className="row">
        <div className="col-12">
          <div className="auth-card">
            <h3 className="text-center mb-0">Reset Your Password</h3>
            <p className="text-center mb-3 mt-1">
              We will send you an email to reset your password
            </p>
            <form
              onSubmit={formik.handleSubmit}
              action=""
              className="d-flex flex-column gap-15"
            >
              <Input
                type="email"
                name="email"
                placeholder="Email"
                onChng={formik.handleChange("email")}
                val={formik.values.email}
              />
              <div className="text-danger">
                {formik.touched.email && formik.errors.email}
              </div>
              <div>
                <div className="d-flex flex-column justify-content-center align-items-center gap-15">
                  <button className="button border-0" type="submit">
                    Submit
                  </button>
                  <Link to="/login">Cancel</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ForgotPassword
