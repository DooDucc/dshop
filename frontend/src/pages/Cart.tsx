import React, { useEffect } from "react"
import BreadCrumb from "../components/BreadCrumb"
import { MdDelete } from "react-icons/md"
import { Link } from "react-router-dom"
import Container from "../components/Container"
import { useAppDispatch, useAppSelector } from "../redux/store"
import {
  clearCart,
  deleteProductInCart,
  getCart,
  updateProductQuantity,
} from "../redux/cart/actions"
import { ProductsCart } from "../redux/cart/slice"
import empty from "../images/empty.jpg"

const Cart = () => {
  const dispatch = useAppDispatch()

  const { cart } = useAppSelector(state => state.cart)
  const { user } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (user?.token) {
      dispatch(getCart())
    }
  }, [user])

  const handleDeleteProductInCart = (product: ProductsCart) => {
    if (cart?.products?.length! > 1) {
      const productData = {
        productId: product?.productDetails?._id,
        quantity: product?.quantity,
        price: product?.price,
      }
      // @ts-ignore
      dispatch(deleteProductInCart(productData))
    } else {
      dispatch(clearCart())
    }
  }

  const handleUpdateProuductQuantity = (
    newQuantity: number,
    product: ProductsCart,
  ) => {
    const productData = {
      productId: product?.productDetails?._id,
      quantity: newQuantity === 0 ? 1 : newQuantity,
      price: product?.price,
    }
    // @ts-ignore
    dispatch(updateProductQuantity(productData))
  }

  return (
    <div>
      <BreadCrumb title="Cart" />
      <Container customClass="home-wrapper-2 cart-wrapper py-5">
        <div className="row">
          {cart?.products?.length! > 0 ? (
            <>
              <div className="col-12">
                <div className="row">
                  <table id="cart">
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                    {cart?.products?.map((product, index) => (
                      <tr key={index}>
                        <td className="d-flex align-items-center gap-10">
                          <div className="d-flex align-items-center gap-10">
                            <div className="w-25">
                              {product?.productDetails?.images?.map(
                                (image, index) => (
                                  <img
                                    key={index}
                                    src={image?.url}
                                    className="img-fluid"
                                    alt=""
                                  />
                                ),
                              )}
                            </div>
                            <div className="w-75">
                              <p>{product?.productDetails?.title}</p>
                              <p>Brand: {product?.productDetails?.brand}</p>
                              <p>
                                Category: {product?.productDetails?.category}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <h5 className="price">
                            ${product?.productDetails?.price}
                          </h5>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            min={1}
                            max={10}
                            style={{ width: 70, border: "none" }}
                            value={product?.quantity}
                            onChange={e =>
                              handleUpdateProuductQuantity(
                                +e.target.value,
                                product,
                              )
                            }
                          />
                        </td>
                        <td className="d-flex align-items-center">
                          <span className="me-5">
                            ${product?.price * product?.quantity}
                          </span>
                          <MdDelete
                            className="text-danger fs-5"
                            style={{
                              cursor: "pointer",
                              width: "40px",
                              height: "40px ",
                            }}
                            onClick={() => handleDeleteProductInCart(product)}
                          />
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
                {/* <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                  <h4 className="cart-col-1">Product</h4>
                  <h4 className="cart-col-2">Price</h4>
                  <h4 className="cart-col-3">Quantity</h4>
                  <h4 className="cart-col-4">Total</h4>
                </div>
                {cart?.products?.map((product, index) => (
                  <div
                    key={index}
                    className="cart-data py-3 d-flex justify-content-between align-items-center"
                  >
                    <div className="cart-col-1">
                      <div className="d-flex align-items-center gap-10">
                        <div className="w-25">
                          {product?.productDetails?.images?.map(
                            (image, index) => (
                              <img
                                key={index}
                                src={image?.url}
                                className="img-fluid"
                                alt=""
                              />
                            ),
                          )}
                        </div>
                        <div className="w-75">
                          <p>{product?.productDetails?.title}</p>
                          <p>Brand: {product?.productDetails?.brand}</p>
                          <p>Category: {product?.productDetails?.category}</p>
                        </div>
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price">
                        ${product?.productDetails?.price}
                      </h5>
                    </div>
                    <div className="cart-col-3">
                      <div>
                        <input
                          type="number"
                          className="form-control"
                          min={1}
                          max={10}
                          style={{ width: 70 }}
                          value={product?.quantity}
                          onChange={e =>
                            handleUpdateProuductQuantity(
                              +e.target.value,
                              product,
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="cart-col-4 d-flex align-items-center">
                      <span className="me-5">${product?.price}</span>
                      <MdDelete
                        className="text-danger fs-5"
                        style={{
                          cursor: "pointer",
                          width: "40px",
                          height: "40px ",
                        }}
                        onClick={() => handleDeleteProductInCart(product)}
                      />
                    </div>
                  </div>
                ))} */}
              </div>
              <div className="col-12 py-2 mt-2">
                <div className="d-flex justify-content-between align-items-baseline">
                  <Link to="/products" className="button">
                    Continue Shopping
                  </Link>
                  <div className="d-flex align-items-end flex-column">
                    <h4>Subtotal: ${cart?.cartTotal || 0}</h4>
                    <p>
                      Taxes and shipping fee will be calculated when checkout
                    </p>
                    {cart?.products?.length! > 0 && (
                      <Link to="/checkout" className="button">
                        Checkout
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="col-12">
              <h3 className="text-center">
                Your cart is empty. Go to our store and pick some items 😁😁😁
              </h3>
              <div className="d-flex align-items-center justify-content-center">
                <img
                  src={empty}
                  className="image-fluid"
                  style={{ width: 400 }}
                  alt=""
                />
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Cart
