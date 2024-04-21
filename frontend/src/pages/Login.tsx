import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as yup from "yup"
import { toast } from "react-toastify"
import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import FacebookLogin from "react-facebook-login"
import { FaFacebook } from "react-icons/fa6"
import { useAppDispatch, useAppSelector } from "../redux/store"
import Container from "../components/Container"
import Input from "../components/Input"
import { login } from "../redux/auth/actions"
import { FB_APP_ID } from "../envVariables"

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
})

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: values => {
      // @ts-ignore
      dispatch(login({ body: values, navigate }))
    },
  })

  const handleLoginWithGG = (token: string) => {
    const decode: { email: string; sub: string } = jwtDecode(token)
    dispatch(
      // @ts-ignore
      login({
        body: {
          email: decode?.email,
          password: decode?.sub,
        },
        navigate,
      }),
    )
  }

  const handleLoginWithFacebook = (response: any) => {
    console.log("first")
    dispatch(
      // @ts-ignore
      login({
        body: {
          email: response?.email,
          password: response?.id,
        },
        navigate,
      }),
    )
  }

  return (
    <Container customClass="home-wrapper-2 login-wrapper py-5">
      <div className="row">
        <div className="col-12">
          <div className="auth-card">
            <h3 className="text-center">Login</h3>
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
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChng={formik.handleChange("password")}
                val={formik.values.password}
              />
              <div className="text-danger">
                {formik.touched.password && formik.errors.password}
              </div>
              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <div></div>
                  <Link to="/forgot-password">Forgot Password</Link>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-15 mt-3">
                  <button className="button border-0" type="submit">
                    Login
                  </button>
                  <Link to="/signup" className="button">
                    Signup
                  </Link>
                </div>
              </div>
            </form>
            <div className="d-flex flex-column justify-content-center align-items-center mt-3">
              <FacebookLogin
                appId={FB_APP_ID}
                // onClick={componentClicked}
                fields="name,email,picture"
                callback={handleLoginWithFacebook}
                icon={<FaFacebook className="fs-4 me-2" />}
              />
              <GoogleLogin
                size="large"
                onSuccess={credentialResponse => {
                  handleLoginWithGG(credentialResponse?.credential || "")
                }}
                onError={() => {
                  console.log("Login Failed")
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Login
