import React from "react"
import BreadCrumb from "../components/BreadCrumb"
import prod from "../images/watch.jpg"
import close from "../images/cross.svg"
import Container from "../components/Container"

const CompareProduct = () => {
  return (
    <div>
      <BreadCrumb title="Compare Products" />
      <Container customClass="home-wrapper-2 compare-wrapper py-5">
        <div className="row">
          <div className="col-3">
            <div className="compare-card position-relative">
              <img
                src={close}
                className="position-absolute cross img-fluid"
                alt=""
              />
              <div className="card-image">
                <img src={prod} alt="" className="img-fluid" />
              </div>
              <div className="card-details">
                <h5 className="title">weqdqw eqweqwdq eqwsxc asdasda </h5>
                <h6 className="price">$200</h6>
              </div>
              <div className="product-detail">
                <h5>Brand: </h5>
                <p>Rolex</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CompareProduct
