import { useFormik } from "formik"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import FacebookLogin from "react-facebook-login"
import { FaFacebook } from "react-icons/fa6"
import { useAppDispatch } from "../redux/store"
import Container from "../components/Container"
import Input from "../components/Input"
import { register } from "../redux/auth/actions"
import { FB_APP_ID } from "../envVariables"

const schema = yup.object().shape({
  firstName: yup.string().required("First name is Required"),
  lastName: yup.string().required("Last name is Required"),
  phone: yup.string().required("Phone is Required"),
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
})

const Signup = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: values => {
      // @ts-ignore
      dispatch(register({ body: values, navigate }))
    },
  })

  const handleSigninWithGG = (token: string) => {
    const decode: {
      family_name: string
      given_name: string
      email: string
      sub: string
    } = jwtDecode(token)
    dispatch(
      // @ts-ignore
      register({
        body: {
          firstName: decode?.family_name,
          lastName: decode?.given_name,
          email: decode?.email,
          password: decode?.sub,
        },
        navigate,
      }),
    )
  }

  const handleSigninWithFacebook = (response: any) => {
    const splitName = response?.name.split(/(?<=^\S+)\s/)
    dispatch(
      // @ts-ignore
      register({
        body: {
          firstName: splitName[0],
          lastName: splitName[1],
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
            <h3 className="text-center">Sign Up</h3>
            <form
              onSubmit={formik.handleSubmit}
              action=""
              className="d-flex flex-column gap-15"
            >
              <Input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChng={formik.handleChange("firstName")}
                onBlr={formik.handleBlur("firstName")}
                val={formik.values.firstName}
              />
              <div className="text-danger">
                {formik.touched.firstName && formik.errors.firstName}
              </div>
              <Input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChng={formik.handleChange("lastName")}
                onBlr={formik.handleBlur("lastName")}
                val={formik.values.lastName}
              />
              <div className="text-danger">
                {formik.touched.lastName && formik.errors.lastName}
              </div>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                onChng={formik.handleChange("email")}
                onBlr={formik.handleBlur("email")}
                val={formik.values.email}
              />
              <div className="text-danger">
                {formik.touched.email && formik.errors.email}
              </div>
              <Input
                type="tel"
                name="phone"
                placeholder="Phone number"
                onChng={formik.handleChange("phone")}
                onBlr={formik.handleBlur("phone")}
                val={formik.values.phone}
              />
              <div className="text-danger">
                {formik.touched.phone && formik.errors.phone}
              </div>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChng={formik.handleChange("password")}
                onBlr={formik.handleBlur("password")}
                val={formik.values.password}
              />
              <div className="text-danger">
                {formik.touched.password && formik.errors.password}
              </div>
              <div>
                <div className="d-flex justify-content-center align-items-center gap-15">
                  <button className="button border-0" type="submit">
                    Signup
                  </button>
                </div>
              </div>
            </form>
            <div className="d-flex flex-column justify-content-center align-items-center mt-3">
              <FacebookLogin
                appId={FB_APP_ID}
                autoLoad={true}
                fields="name,email,picture"
                callback={handleSigninWithFacebook}
                icon={<FaFacebook className="fs-4 me-2" />}
              />
              <GoogleLogin
                size="large"
                onSuccess={credentialResponse => {
                  handleSigninWithGG(credentialResponse?.credential || "")
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

export default Signup
