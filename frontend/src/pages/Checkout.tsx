import { Link, useNavigate } from "react-router-dom"
import { loadStripe } from "@stripe/stripe-js"
import { useFormik } from "formik"
import * as yup from "yup"
import Container from "../components/Container"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { createOrder } from "../redux/order/actions"
import { STRIPE_KEY } from "../envVariables"
import { useState } from "react"

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  phone: yup.string().required("Phone is Required"),
  name: yup.string().required("Name is Required"),
  address: yup.string().required("Address is Required"),
})

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { cart } = useAppSelector(state => state.cart)
  const { user } = useAppSelector(state => state.auth)

  const [paymentMethod, setPaymentMethod] = useState("paypal")

  const formik = useFormik({
    initialValues: {
      name: `${user?.firstName} ${user?.lastName}`,
      email: String(user?.email),
      phone: String(user?.phone || ""),
      address: "",
    },
    validationSchema: schema,
    onSubmit: values => {
      handleCheckout(values)
    },
  })

  const handleCheckout = async (values: any) => {
    const stripe = await loadStripe(STRIPE_KEY)

    dispatch(
      // @ts-ignore
      createOrder({
        body: {
          shippingInfo: values,
          products: cart?.products,
          paymentMethod,
        },
        navigate,
        stripe,
      }),
    )
    formik.resetForm()
  }

  return (
    <Container customClass="checkout-wrapper home-wrapper-2 py-5">
      <div className="row">
        <div className="col-7">
          <div className="checkout-left-data">
            <h3 className="mb-3">Shipping Infomation</h3>
            <form
              action=""
              onSubmit={formik.handleSubmit}
              className="d-flex gap-15 flex-wrap justify-content-between"
            >
              <div className="w-100">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={formik.handleChange("name")}
                  value={formik.values.name}
                />
                <div className="text-danger">
                  {formik.touched.name && formik.errors.name}
                </div>
              </div>
              <div className="w-100">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={formik.handleChange("email")}
                  value={formik.values.email}
                />
                <div className="text-danger">
                  {formik.touched.email && formik.errors.email}
                </div>
              </div>
              <div className="w-100">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Phone number"
                  name="phone"
                  onChange={formik.handleChange("phone")}
                  value={formik.values.phone}
                />
                <div className="text-danger">
                  {formik.touched.phone && formik.errors.phone}
                </div>
              </div>
              <div className="w-100">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Address"
                  name="address"
                  onChange={formik.handleChange("address")}
                  value={formik.values.address}
                />
                <div className="text-danger">
                  {formik.touched.address && formik.errors.address}
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <p className="mb-0">Payment Method: &nbsp;</p>
                <div
                  className="button"
                  style={
                    paymentMethod === "paypal"
                      ? { backgroundColor: "#febd69" }
                      : {}
                  }
                  onClick={() => setPaymentMethod("paypal")}
                >
                  Paypal
                </div>
                <div
                  className="button"
                  style={
                    paymentMethod === "vnpay"
                      ? { backgroundColor: "#febd69" }
                      : {}
                  }
                  onClick={() => setPaymentMethod("vnpay")}
                >
                  VNPay
                </div>
              </div>
              <div className="w-100">
                <div className="d-flex align-items-center justify-content-between">
                  <div />
                  <button className="button" type="submit">
                    Checkout
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-5">
          <div className="border-bottom py-4">
            {cart?.products?.map(product => (
              <div
                key={product?.productDetails?._id}
                className="d-flex mb-4 gap-10 align-items-center"
              >
                <div className="flex-grow-1 d-flex gap-10">
                  <div className="w-25 position-relative">
                    <span
                      style={{
                        top: "-18px",
                        right: "-10px",
                        width: "20px",
                        height: "20px",
                      }}
                      className="d-flex align-items-center justify-content-center badge bg-secondary text-white rounded-circle p-3 position-absolute"
                    >
                      {product?.quantity}
                    </span>
                    {product?.productDetails?.images?.map(image => (
                      <img
                        key={image?._id}
                        src={image?.url}
                        className="img-fluid"
                        alt=""
                      />
                    ))}
                  </div>
                  <div>
                    <h5 className="title">{product?.productDetails?.title}</h5>
                    <p>{product?.productDetails?.brand}</p>
                  </div>
                </div>
                <h5>${product?.price}</h5>
              </div>
            ))}
          </div>
          <div className="d-flex align-items-center justify-content-between py-4">
            <h4>Total</h4>
            <h3>${cart?.cartTotal!}</h3>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Checkout
