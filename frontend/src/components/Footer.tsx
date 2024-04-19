import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { BsYoutube, BsLinkedin, BsGithub, BsInstagram } from "react-icons/bs"
import newsletter from "../images/newsletter.png"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { getCategories } from "../redux/product/actions"

const Footer = () => {
  const dispatch = useAppDispatch()

  const { categories } = useAppSelector(state => state.product)

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src={newsletter} alt="newsletter" />
                <h2 className="mb-0 text-white">Sign Up For Newsletter</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Email address..."
                  aria-label="Email address..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  Subcribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white fs-6">
                  Tay Ho, Ha Noi, Viet Nam
                </address>
                <a
                  href="tel:+84 09021394752"
                  className="mt-4 d-block mb-2 text-white"
                >
                  09021394752
                </a>
                <a
                  href="mailto:dochiduc04092002@gmail.com"
                  className="mt-4 d-block mb-1 text-white"
                >
                  dochiduc04092002@gmail.com
                </a>
                <div className="social-icons d-flex align-items-center gap-15 mt-4">
                  <a className="text-white" href="">
                    <BsLinkedin className=" fs-5" />
                  </a>
                  <a className="text-white" href="">
                    <BsInstagram className=" fs-5" />
                  </a>
                  <a className="text-white" href="">
                    <BsGithub className=" fs-5" />
                  </a>
                  <a className="text-white" href="">
                    <BsYoutube className=" fs-5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Infomation</h4>
              <div className="footer-links d-flex flex-column">
                <Link to="/" className="text-white mb-1 py-2">
                  Prvacy Policy
                </Link>
                <Link to="/" className="text-white mb-1 py-2">
                  Refund Policy
                </Link>
                <Link to="/" className="text-white mb-1 py-2">
                  Shipping Policy
                </Link>
                <Link to="/" className="text-white mb-1 py-2">
                  Terms & Conditions
                </Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Account</h4>
              <div className="footer-links d-flex flex-column">
                <Link to="/" className="text-white mb-1 py-2">
                  About us
                </Link>
                <Link to="/" className="text-white mb-1 py-2">
                  FAQ
                </Link>
                <Link to="/" className="text-white mb-1 py-2">
                  Contact
                </Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="footer-links d-flex flex-column">
                {categories?.map(category => (
                  <Link
                    key={category?._id}
                    to="/products"
                    className="text-white mb-1 py-2"
                  >
                    {category?.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">&copy; Do Chi Duc</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
