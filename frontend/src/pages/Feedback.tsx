import { FaHome } from "react-icons/fa"
import { IoCall } from "react-icons/io5"
import { IoMdMail } from "react-icons/io"
import { IoIosInformationCircle } from "react-icons/io"
import { useFormik } from "formik"
import * as yup from "yup"
import BreadCrumb from "../components/BreadCrumb"
import Container from "../components/Container"
import { postFeedback } from "../redux/feedback/actions"
import { useAppDispatch, useAppSelector } from "../redux/store"

const schema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  phone: yup.string().required("Phone is Required"),
  comment: yup.string().required("Comment is Required"),
})

const Feedback = () => {
  const dispatch = useAppDispatch()

  const { user } = useAppSelector(state => state.auth)

  const formik = useFormik({
    initialValues: {
      name: `${user?.firstName} ${user?.lastName}` || "",
      email: String(user?.email) || "",
      phone: user?.phone !== undefined ? String(user?.phone) : "",
      comment: "",
    },
    validationSchema: schema,
    onSubmit: values => {
      // @ts-ignore
      dispatch(postFeedback(values))
      formik.resetForm()
    },
  })

  return (
    <div>
      <BreadCrumb title="Feedback" />
      <Container customClass="home-wrapper-2 contact-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.499234056029!2d105.84006427474262!3d21.052713786956406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abb2886d6e09%3A0xe8c36c0eb181a93!2zTmdoLiAzMi8xNSBQLiBBbiBELiwgWcOqbiBQaOG7pSwgVMOieSBI4buTLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1711176235857!5m2!1svi!2s"
              width="600"
              height="450"
              className="border-0 w-100"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="col-12 mt-5">
            <div className="contact-inner-wrapper d-flex justify-content-between">
              <div>
                <h3 className="contact-title mb-4">Send us a feedback</h3>
                <form
                  onSubmit={formik.handleSubmit}
                  action=""
                  className="d-flex flex-column gap-10"
                >
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="name"
                      onChange={formik.handleChange("name")}
                      value={formik.values.name}
                    />
                    <div className="text-danger">
                      {formik.touched.name && formik.errors.name}
                    </div>
                  </div>
                  <div>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      onChange={formik.handleChange("email")}
                      value={formik.values.email}
                    />
                    <div className="text-danger">
                      {formik.touched.email && formik.errors.email}
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
                  <div>
                    <textarea
                      className="w-100 form-control"
                      cols={30}
                      rows={4}
                      placeholder="Comment"
                      name="comment"
                      onChange={formik.handleChange("comment")}
                      value={formik.values.comment}
                    ></textarea>
                    <div className="text-danger">
                      {formik.touched.comment && formik.errors.comment}
                    </div>
                  </div>
                  <div>
                    <button className="button border-0" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div>
                <h3 className="contact-title mb-4">Get in touch with us</h3>
                <div>
                  <ul className="ps-0">
                    <li className="mb-3 d-flex align-items-center gap-15">
                      <FaHome className="fs-5" />
                      <span>An Duong, Tay Ho, Ha Noi, Viet Nam</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center gap-15">
                      <IoCall className="fs-5" />
                      <span>0921394752</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center gap-15">
                      <IoMdMail className="fs-5" />
                      <span>dochiduc04092002@gmail.com</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center gap-15">
                      <IoIosInformationCircle className="fs-5" />
                      <span>Monday - Friday 10AM - 8PM</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Feedback
