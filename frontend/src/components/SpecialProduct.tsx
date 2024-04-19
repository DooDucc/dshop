import React from "react"
// @ts-ignore
import ReactStars from "react-rating-stars-component"
import { Link } from "react-router-dom"
import { Product } from "../redux/product/slice"

interface SpecialProductProps {
  product: Product
}

const SpecialProduct = ({ product }: SpecialProductProps) => {
  return (
    <div className="col-6 mb-3">
      <div className="special-product-card">
        <div className="d-flex justify-content-between">
          <div>
            <img src={product?.images[0]?.url} alt="" className="img-fluid" />
          </div>
          <div className="special-product-content">
            <h5 className="title">{product?.title} </h5>
            <h6 className="brand">{product?.brand}</h6>
            <ReactStars
              count={5}
              size={24}
              activeColor="#ffd700"
              value={+product?.totalRating}
              edit={false}
            />
            <p className="price">
              <span className="red-p">${product?.price}</span>
              &nbsp;
              {/* @ts-ignore */}
              <strike>$${product?.price + 100}</strike>
            </p>
            <div className="discount-till d-flex align-items-center gap-10">
              <p className="mb-0">
                <b>5</b> days
              </p>
              <div className="d-flex gap-10 align-items-center">
                <span className="badge rounded-circle p-2 bg-danger">1</span>:
                <span className="badge rounded-circle p-2 bg-danger">1</span>:
                <span className="badge rounded-circle p-2 bg-danger">1</span>
              </div>
            </div>
            <div className="prod-count my-3">
              <p className="mb-0">
                Products: {product?.quantity - product?.sold}
              </p>
              {/* @ts-ignore */}
              <div
                className="progress"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow={product?.sold}
                aria-valuemin="0"
                aria-valuemax={product?.quantity}
              >
                <div
                  className="progress-bar"
                  style={{
                    width: `${(product?.sold / product?.quantity) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <Link to={`/products/${product?._id}`} className="button">
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecialProduct
